import {
  TextCredibilityWeights, Credibility, TwitterUser,
  TweetCredibilityWeights, Tweet, Text
} from './models'
import config from '../config'
import Twit from 'twit'
import NSpell from 'nspell'
import wash from 'washyourmouthoutwithsoap'
import SimpleSpamFilter, { SimpleSpamFilterParams } from './spam-filter'
import fs from 'fs'
import path from 'path'
import emojiStrip from 'emoji-strip'
import { semanticScore, predictUser } from './python_script'

const enDictionaryBase = require.resolve('dictionary-en-us')
const frDictionaryBase = require.resolve('dictionary-fr')
const esDictionaryBase = require.resolve('dictionary-es')


const dictionaries = {
  en: {
    aff: fs.readFileSync(path.join(enDictionaryBase, '..', 'index.aff'), 'utf-8'),
    dic: fs.readFileSync(path.join(enDictionaryBase, '..', 'index.dic'), 'utf-8')
  },
  fr: {
    aff: fs.readFileSync(path.join(frDictionaryBase, '..', 'index.aff'), 'utf-8'),
    dic: fs.readFileSync(path.join(frDictionaryBase, '..', 'index.dic'), 'utf-8')
  },
  es: {
    aff: fs.readFileSync(path.join(esDictionaryBase, '..', 'index.aff'), 'utf-8'),
    dic: fs.readFileSync(path.join(esDictionaryBase, '..', 'index.dic'), 'utf-8')
  }
}

const spellingCheckers = {
  en: new NSpell(dictionaries.en.aff, dictionaries.en.dic),
  es: new NSpell(dictionaries.es.aff, dictionaries.es.dic),
  fr: new NSpell(dictionaries.fr.aff, dictionaries.fr.dic),
}

function responseToTwitterUser(response: any) : TwitterUser {
  return {
    name: response.name,
    verified: response.verified,
    yearJoined: response.created_at.split(' ').pop(),
    followersCount: response.followers_count,
    friendsCount: response.friends_count,
    username: response.screen_name
  }
}

function responseToTweet(response: any) : Tweet {
  return {
    text: {
      text: response.full_text,
      lang: Object.keys(spellingCheckers).includes(response.lang) ? response.lang : 'en',
    },
    user: responseToTwitterUser(response.user)
  }
}

function buildTwitClient() : Twit {
  return new Twit({
    consumer_key: config.TWITTER_CONSUMER_KEY,
    consumer_secret: config.TWITTER_CONSUMER_SECRET,
    app_only_auth: true
  })
}

function getCleanedWords(text: string) : string[] {
  return text.replace(/ \s+/g, ' ').split(' ')
}

function isBadWord(word: string) : boolean {
  return Object.keys(spellingCheckers).some(lang => wash.check(lang, word))
}

function getBadWords(words: string[]) : string[] {
  return words.filter(isBadWord)
}

function removeURL(text: string) {
  return text.replace(/(https?:\/\/[^\s]+)/g,'')
}

function removeMention(text: string) {
  return text.replace(/\B@[a-z0-9_-]+\s/gi,'')
}

function removePunctuation(text: string) : string{
  return text.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,'')
}

function removeHashtag(text: string) {
  return text.split(' ')
    .filter(word => !(/^#/.test(word) || /#$/.test(word))).join(' ')
}

function removeEmoji(text: string) {
  return emojiStrip(text)
}

function cleanText(text: string) : string {
  return removePunctuation(removeEmoji(removeHashtag(removeMention(removeURL((text))))))
}

function badWordsCriteria(text: string) : number {
  const cleanedText = cleanText(text)
  const wordsInText = getCleanedWords(cleanedText)
  const badWordsInText = getBadWords(wordsInText)
  return 100 - (100 * badWordsInText.length / wordsInText.length)
}

function spamCriteria(text: Text) : number {
  const spamParams : SimpleSpamFilterParams = {
    minWords: 5,
    maxPercentCaps: 30,
    maxNumSwearWords: 2,
    lang: text.lang
  }
  const spamFilter : SimpleSpamFilter = new SimpleSpamFilter(spamParams)
  const cleanedText = cleanText(text.text)
  return spamFilter.isSpam(cleanedText)
    ? 0
    : 100
}

async function missSpellingCriteria(text: Text) : Promise<number> {
  const cleanedText = cleanText(text.text)
  const wordsInText = getCleanedWords(cleanedText)
  const spellingChecker = spellingCheckers[text.lang]
  const numOfMissSpells : number = wordsInText
    .filter(word => isNaN(+word))
    .reduce((acc, curr) =>
      spellingChecker.correct(curr)
        ? acc
        : acc + 1, 0)
  return 100 - (100 * numOfMissSpells / wordsInText.length)
}

async function calculateTextCredibility(text: Text, params: TextCredibilityWeights) : Promise<Credibility> {
  const badWordsCalculation = params.weightBadWords * badWordsCriteria(text.text)
  const spamCalculation = params.weightSpam * spamCriteria(text)
  const missSpellingCalculation = params.weightMisspelling * (await missSpellingCriteria(text))
  const semanticCalculation = params.weightSemantic * (await semanticScore(text.text))
  return {
    credibility: badWordsCalculation + spamCalculation + missSpellingCalculation + semanticCalculation
  }
}

async function getUserInfo(userId: string) : Promise<TwitterUser> {
  const client = buildTwitClient()
  try {
    const response = await client.get('users/show', { user_id: userId })
    return responseToTwitterUser(response.data)
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function getTweetInfo(tweetId: string) : Promise<Tweet> {
  const client = buildTwitClient()
  try {
    const response = await client.get('statuses/show', { id: tweetId, tweet_mode: 'extended' })
    return responseToTweet(response.data)
  } catch (e) {
    console.log(e)
    throw e
  }
}

function calculateUserCredibility(user: TwitterUser) : number {
  return getVerifWeight(user.verified) + getCreationWeight(user.yearJoined) + weightChooser(user.username)
}

function weightChooser(user: String):number{
  var predict = predictUser(user)
  if (predict == 'human'){
    return 33.33
  } else if (predict == 'bot'){
    return 0
  } else {
    return 16.66
  }
}

function calculateSocialCredibility(user: TwitterUser, maxFollowers: number) : number {
  const followersImpactCalc = followersImpact(user.followersCount, maxFollowers)
  const ffProportionCalc = ffProportion(user.followersCount, user.friendsCount)
  return Math.min(100, followersImpactCalc + ffProportionCalc)
}

async function twitterUserCredibility(userId: string) {
  return getUserInfo(userId)
    .then(response => {
      return  {
        credibility: calculateUserCredibility(response)
      }
    })
}

function scrapperTwitterUserCredibility(verified: boolean, accountCreationYear: number) : Credibility{
  const user:  TwitterUser = {
    name: '',
    verified: verified,
    yearJoined: accountCreationYear,
    followersCount: 0,
    friendsCount: 0,
    username: ''
  }
  return {
    credibility: calculateUserCredibility(user)
  }
}

async function calculateTweetCredibility(tweetId: string,
  params: TweetCredibilityWeights, maxFollowers: number) : Promise<Credibility> {
  try {
    const tweet: Tweet = await getTweetInfo(tweetId)
    const user: TwitterUser = tweet.user
    const userCredibility: number = calculateUserCredibility(user) * params.weightUser
    const textCredibility: number = (await calculateTextCredibility(tweet.text, params)).credibility * params.weightText
    const socialCredibility: number = calculateSocialCredibility(user, maxFollowers) * params.weightSocial
    return {
      credibility: userCredibility + textCredibility + socialCredibility
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

function getVerifWeight(isUserVerified : boolean) : number {
  if (isUserVerified) {
    return 33.33
  } else {
    return 0
  }
}

function getCreationWeight(yearJoined : number) : number {
  const currentYear = new Date().getFullYear()
  const twitterCreationYear = 2006
  const maxAccountAge = currentYear - twitterCreationYear
  const accountAge = currentYear - yearJoined
  return 33.34 * (accountAge / maxAccountAge)
}

function followersImpact(userFollowers: number, maxFollowers: number) : number {
  if (maxFollowers === 0) {
    return 0
  } else {
    return (userFollowers / maxFollowers) * 50
  } 
}

function ffProportion(userFollowers: number, userFollowing: number) : number {
  if (userFollowers === 0 && userFollowing === 0) {
    return 0
  } else {
    return (userFollowers / (userFollowers + userFollowing)) * 50
  }
}

async function socialCredibility(userID: string, maxFollowers: number) {
  const response: TwitterUser = await getUserInfo(userID)
  return {
    credibility: calculateSocialCredibility(response, maxFollowers)
  }
}

async function scrapedtweetCredibility(tweetText: Text, tweetCredibilityWeights: TweetCredibilityWeights, twitterUser: TwitterUser, maxFollowers: number){
  const userCredibility: number = calculateUserCredibility(twitterUser) * tweetCredibilityWeights.weightUser
  const textCredibility: number = (await calculateTextCredibility(tweetText, tweetCredibilityWeights)).credibility * tweetCredibilityWeights.weightText
  const socialCredibility: number = calculateSocialCredibility(twitterUser, maxFollowers) * tweetCredibilityWeights.weightSocial
  return {
    credibility: userCredibility + textCredibility + socialCredibility
  }
}

function scrapedSocialCredibility(followersCount: number, friendsCount: number, maxFollowers: number){
  const user : TwitterUser = {
    name: '',
    verified: false,
    yearJoined: 2018,
    followersCount: followersCount,
    friendsCount: friendsCount,
    username: ''
  }
  return {
    credibility: calculateSocialCredibility(user, maxFollowers)
  }
}

export {
  calculateTextCredibility,
  twitterUserCredibility,
  calculateTweetCredibility,
  socialCredibility,
  scrapperTwitterUserCredibility,
  scrapedSocialCredibility,
  scrapedtweetCredibility,
  removeHashtag
}
