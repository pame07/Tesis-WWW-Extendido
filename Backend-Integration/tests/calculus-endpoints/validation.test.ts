import request from 'supertest'
import app from '../../src/app'

describe('Input Validation', () => {
  
  describe('/GET /calculate/plain-text', () => {
    function testPlainTextCredibility(
      expectedReturn : any, params: any) {
      return request(app)
        .get('/calculate/plain-text')
        .query(params)
        .expect(expectedReturn)
    }

    it('text.REQUIRED', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'text',
            errorMessage: 'text.REQUIRED',
            userErrorMessage: 'text.REQUIRED',
            validationCode: 'text.REQUIRED' },
          { field: 'text',
            errorMessage: 'text.NOT_EMPTY',
            userErrorMessage: 'text.NOT_EMPTY',
            validationCode: 'text.NOT_EMPTY' },
          { field: 'text',
            errorMessage: 'text.STRING',
            userErrorMessage: 'text.STRING',
            validationCode: 'text.STRING' }]
      }, { weightSpam: 1, weightBadWords: 0, weightMisspelling: 0 })
    })

    it('text.NOT_EMPTY', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [{
          field: 'text',
          errorMessage: 'text.NOT_EMPTY',
          userErrorMessage: 'text.NOT_EMPTY',
          validationCode: 'text.NOT_EMPTY'
        }]
      }, { text: '', weightSpam: 1, weightBadWords: 0, weightMisspelling: 0 })
    })

    it('weightSpam.REQUIRED', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightSpam',
            errorMessage: 'weightSpam.REQUIRED',
            userErrorMessage: 'weightSpam.REQUIRED',
            validationCode: 'weightSpam.REQUIRED' },
          { field: 'weightSpam',
            errorMessage: 'weightSpam.NUMBER',
            userErrorMessage: 'weightSpam.NUMBER',
            validationCode: 'weightSpam.NUMBER' },
          { field: 'weightSpam',
            errorMessage: 'weightSpam.NOT_IN_RANGE',
            userErrorMessage: 'weightSpam.NOT_IN_RANGE',
            validationCode: 'weightSpam.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { text: 'test', weightBadWords: 0, weightMisspelling: 0 })
    })

    it('weightSpam.NUMBER', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightSpam',
            errorMessage: 'weightSpam.NUMBER',
            userErrorMessage: 'weightSpam.NUMBER',
            validationCode: 'weightSpam.NUMBER' },
          { field: 'weightSpam',
            errorMessage: 'weightSpam.NOT_IN_RANGE',
            userErrorMessage: 'weightSpam.NOT_IN_RANGE',
            validationCode: 'weightSpam.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { text: 'test', weightSpam: 'test', weightBadWords: 0, weightMisspelling: 0 })
    })

    it('weightSpam.NOT_IN_RANGE', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightSpam',
            errorMessage: 'weightSpam.NOT_IN_RANGE',
            userErrorMessage: 'weightSpam.NOT_IN_RANGE',
            validationCode: 'weightSpam.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { text: 'test', weightSpam: 101, weightBadWords: 0, weightMisspelling: 0 })
    })

    it('weightBadWords.REQUIRED', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          {field: 'weightBadWords',
            errorMessage: 'weightBadWords.REQUIRED',
            userErrorMessage: 'weightBadWords.REQUIRED',
            validationCode: 'weightBadWords.REQUIRED' },
          { field: 'weightBadWords',
            errorMessage: 'weightBadWords.NUMBER',
            userErrorMessage: 'weightBadWords.NUMBER',
            validationCode: 'weightBadWords.NUMBER' },
          { field: 'weightBadWords',
            errorMessage: 'weightBadWords.NOT_IN_RANGE',
            userErrorMessage: 'weightBadWords.NOT_IN_RANGE',
            validationCode: 'weightBadWords.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { text: 'test', weightSpam: 0, weightMisspelling: 0 })
    })

    it('weightBadWords.NUMBER', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightBadWords',
            errorMessage: 'weightBadWords.NUMBER',
            userErrorMessage: 'weightBadWords.NUMBER',
            validationCode: 'weightBadWords.NUMBER' },
          { field: 'weightBadWords',
            errorMessage: 'weightBadWords.NOT_IN_RANGE',
            userErrorMessage: 'weightBadWords.NOT_IN_RANGE',
            validationCode: 'weightBadWords.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { text: 'test', weightSpam: 0, weightBadWords: 'test', weightMisspelling: 0 })
    })

    it('weightBadWords.NOT_IN_RANGE', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightBadWords',
            errorMessage: 'weightBadWords.NOT_IN_RANGE',
            userErrorMessage: 'weightBadWords.NOT_IN_RANGE',
            validationCode: 'weightBadWords.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { text: 'test', weightSpam: 0, weightBadWords: -1, weightMisspelling: 0 })
    })

    it('weightMisspelling.REQUIRED', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.REQUIRED',
            userErrorMessage: 'weightMisspelling.REQUIRED',
            validationCode: 'weightMisspelling.REQUIRED' },
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.NUMBER',
            userErrorMessage: 'weightMisspelling.NUMBER',
            validationCode: 'weightMisspelling.NUMBER' },
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.NOT_IN_RANGE',
            userErrorMessage: 'weightMisspelling.NOT_IN_RANGE',
            validationCode: 'weightMisspelling.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { text: 'test', weightSpam: 0, weightBadWords: 0 })
    })

    it('weightMisspelling.NUMBER', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.NUMBER',
            userErrorMessage: 'weightMisspelling.NUMBER',
            validationCode: 'weightMisspelling.NUMBER' },
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.NOT_IN_RANGE',
            userErrorMessage: 'weightMisspelling.NOT_IN_RANGE',
            validationCode: 'weightMisspelling.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { text: 'test', weightSpam: 0, weightBadWords: 3.3, weightMisspelling: 'test' })
    })

    it('weightMisspelling.NOT_IN_RANGE', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.NOT_IN_RANGE',
            userErrorMessage: 'weightMisspelling.NOT_IN_RANGE',
            validationCode: 'weightMisspelling.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { text: 'test', weightSpam: 0, weightBadWords: 1, weightMisspelling: -10 })
    })

    it('customValidation.WEIGHT_TEXT_CRED_SUM_NOT_1', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [{
          field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
          errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
          userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
          validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
        }]
      }, { text: 'test', weightSpam: 0, weightBadWords: 0.4, weightMisspelling: 0.4 })
    })
  })

  describe('/GET /calculate/twitter/user/:id', () => {

    it('id.NUMBER', () => {
      return request(app)
        .get('/calculate/twitter/user/a')
        .expect({
          status: 400,
          title: 'Bad Request',
          message: 'A validation failed',
          userMessage: 'An error has ocurred',
          errors: [{
            field: 'id',
            errorMessage: 'userId.NUMBER',
            userErrorMessage: 'userId.NUMBER',
            validationCode: 'userId.NUMBER'
          }]
        })
    })
  })

  describe('/GET /calculate/user/scrape', () => {
    function testScrapperTwitterUserCredibility(
      expectedReturn : any, params: any) {
      return request(app)
        .get('/calculate/user/scrape')
        .query(params)
        .expect(expectedReturn)
    } 
    
    it('verified.REQUIRED', () => {
      return testScrapperTwitterUserCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'verified',
            errorMessage: 'verified.REQUIRED',
            userErrorMessage: 'verified.REQUIRED',
            validationCode: 'verified.REQUIRED' },
          { field: 'verified',
            errorMessage: 'verified.BOOLEAN',
            userErrorMessage: 'verified.BOOLEAN',
            validationCode: 'verified.BOOLEAN' }]
      }, { yearJoined: 2009 })
    })

    it('verified.BOOLEAN', () => {
      return testScrapperTwitterUserCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'verified',
            errorMessage: 'verified.BOOLEAN',
            userErrorMessage: 'verified.BOOLEAN',
            validationCode: 'verified.BOOLEAN' }]
      }, {  verified: 'test', yearJoined: 2009 })
    })

    it('yearJoined.REQUIRED', () => {
      return testScrapperTwitterUserCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'yearJoined',
            errorMessage: 'yearJoined.REQUIRED',
            userErrorMessage: 'yearJoined.REQUIRED',
            validationCode: 'yearJoined.REQUIRED' },
          { field: 'yearJoined',
            errorMessage: 'yearJoined.NUMBER',
            userErrorMessage: 'yearJoined.NUMBER',
            validationCode: 'yearJoined.NUMBER' },
          { field: 'yearJoined',
            errorMessage: 'yearJoined.NOT_IN_RANGE',
            userErrorMessage: 'yearJoined.NOT_IN_RANGE',
            validationCode: 'yearJoined.NOT_IN_RANGE' }]
      }, { verified: false })
    })

    it('yearJoined.NUMBER', () => {
      return testScrapperTwitterUserCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'yearJoined',
            errorMessage: 'yearJoined.NUMBER',
            userErrorMessage: 'yearJoined.NUMBER',
            validationCode: 'yearJoined.NUMBER' },
          { field: 'yearJoined',
            errorMessage: 'yearJoined.NOT_IN_RANGE',
            userErrorMessage: 'yearJoined.NOT_IN_RANGE',
            validationCode: 'yearJoined.NOT_IN_RANGE' } ]
      }, { verified: true, yearJoined: 'test' })
    })

    it('yearJoined.NOT_IN_RANGE', () => {
      return testScrapperTwitterUserCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [{
          field: 'yearJoined',
          errorMessage: 'yearJoined.NOT_IN_RANGE',
          userErrorMessage: 'yearJoined.NOT_IN_RANGE',
          validationCode: 'yearJoined.NOT_IN_RANGE'
        }]
      }, { verified: true, yearJoined: 2020 })
    })
  })
  describe('/GET /calculate/twitter/tweets', () => {
    function testTweetCredibility(
      expectedReturn : any, params: any) {
      return request(app)
        .get('/calculate/twitter/tweets')
        .query(params)
        .expect(expectedReturn)
    }

    it('weightBadWords.NOT_IN_RANGE', () => {
      return testTweetCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightBadWords',
            errorMessage: 'weightBadWords.NOT_IN_RANGE',
            userErrorMessage: 'weightBadWords.NOT_IN_RANGE',
            validationCode: 'weightBadWords.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { tweetId: 867412932409282560, maxFollowers: 2000, weightSpam: 0, weightBadWords: -1, weightMisspelling: 0, weightText: 0, weightUser: 0.5, weightSocial: 0.5})
    })
    it('weightMisspelling.NOT_IN_RANGE', () => {
      return testTweetCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.NOT_IN_RANGE',
            userErrorMessage: 'weightMisspelling.NOT_IN_RANGE',
            validationCode: 'weightMisspelling.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { tweetId: 867412932409282560, maxFollowers: 2000, weightSpam: 0, weightBadWords: 1, weightMisspelling: 1000, weightText: 0.2, weightUser: 0.3, weightSocial: 0.5})
    })
    it('weightSpam.NOT_IN_RANGE', () => {
      return testTweetCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightSpam',
            errorMessage: 'weightSpam.NOT_IN_RANGE',
            userErrorMessage: 'weightSpam.NOT_IN_RANGE',
            validationCode: 'weightSpam.NOT_IN_RANGE' },
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { tweetId: 867412932409282560, maxFollowers: 2000, weightSpam: -10, weightBadWords: 1, weightMisspelling: 0, weightText: 0.9, weightUser: 0.1, weightSocial: 0})
    })
    it('maxFollowers.POSITIVE', () => {
      return testTweetCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'maxFollowers',
            errorMessage: 'maxFollowers.POSITIVE',
            userErrorMessage: 'maxFollowers.POSITIVE',
            validationCode: 'maxFollowers.POSITIVE' } ]
      }, { tweetId: 867412932409282560, maxFollowers: -1, weightSpam: 0, weightBadWords: 1, weightMisspelling: 0, weightText: 0, weightUser: 1, weightSocial: 0})
    })
    it('weightUser.NOT_IN_RANGE', () => {
      return testTweetCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightUser',
            errorMessage: 'weightUser.NOT_IN_RANGE',
            userErrorMessage: 'weightUser.NOT_IN_RANGE',
            validationCode: 'weightUser.NOT_IN_RANGE' },
          { field: 'WEIGHT_TWEET_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1' } ]
      }, { tweetId: 867412932409282560, maxFollowers: 2000, weightSpam: 0, weightBadWords: 1, weightMisspelling: 0, weightText: 0, weightUser: -10, weightSocial: 0})
    })
    it('customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1', () => {
      return testTweetCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { tweetId: 867412932409282560, maxFollowers: 2000, weightSpam: 0.3, weightBadWords: 0.3, weightMisspelling: 0.3, weightText: 0, weightUser: 1, weightSocial: 0})
    })
    it('customValidation.WEIGHT_TWEET_CRED_SUM_NOT_1', () => {
      return testTweetCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'WEIGHT_TWEET_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1' } ]
      }, { tweetId: 867412932409282560, maxFollowers: 2000, weightSpam: 0.3, weightBadWords: 0.3, weightMisspelling: 0.4, weightText: 1, weightUser: 1, weightSocial: 0})
    })
  })
  describe('/GET /calculate/tweets/scraped', () => {
    function testScrapedtweetCredibility(
      expectedReturn : any, params: any) {
      return request(app)
        .get('/calculate/tweets/scraped')
        .query(params)
        .expect(expectedReturn)
    }
    it('customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1', () => {
      return testScrapedtweetCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'WEIGHT_TEXT_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1' } ]
      }, { tweetText: 'test', followersCount: 2000, friendsCount: 100, verified: false, yearJoined: 2006, maxFollower: 10000, weightSpam: 0.3, weightBadWords: 0.3, weightMisspelling: 0.3, weightText: 0, weightUser: 1, weightSocial: 0})
    })
    it('customValidation.WEIGHT_TWEET_CRED_SUM_NOT_1', () => {
      return testScrapedtweetCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'WEIGHT_TWEET_CRED_SUM_NOT_1',
            errorMessage: 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1',
            userErrorMessage: 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1',
            validationCode: 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1' } ]
      }, { tweetText: 'test', followersCount: 2000, friendsCount: 100, verified: false, yearJoined: 2006, maxFollower: 10000, weightSpam: 0.3, weightBadWords: 0.3, weightMisspelling: 0.4, weightText: 1, weightUser: 1, weightSocial: 0})
    })
  })
})