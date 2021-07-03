"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var twit_1 = __importDefault(require("twit"));
var nspell_1 = __importDefault(require("nspell"));
var washyourmouthoutwithsoap_1 = __importDefault(require("washyourmouthoutwithsoap"));
var spam_filter_1 = __importDefault(require("./spam-filter"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var emoji_strip_1 = __importDefault(require("emoji-strip"));
var enDictionaryBase = require.resolve('dictionary-en-us');
var frDictionaryBase = require.resolve('dictionary-fr');
var esDictionaryBase = require.resolve('dictionary-es');
var dictionaries = {
    en: {
        aff: fs_1.default.readFileSync(path_1.default.join(enDictionaryBase, '..', 'index.aff'), 'utf-8'),
        dic: fs_1.default.readFileSync(path_1.default.join(enDictionaryBase, '..', 'index.dic'), 'utf-8')
    },
    fr: {
        aff: fs_1.default.readFileSync(path_1.default.join(frDictionaryBase, '..', 'index.aff'), 'utf-8'),
        dic: fs_1.default.readFileSync(path_1.default.join(frDictionaryBase, '..', 'index.dic'), 'utf-8')
    },
    es: {
        aff: fs_1.default.readFileSync(path_1.default.join(esDictionaryBase, '..', 'index.aff'), 'utf-8'),
        dic: fs_1.default.readFileSync(path_1.default.join(esDictionaryBase, '..', 'index.dic'), 'utf-8')
    }
};
var spellingCheckers = {
    en: new nspell_1.default(dictionaries.en.aff, dictionaries.en.dic),
    es: new nspell_1.default(dictionaries.es.aff, dictionaries.es.dic),
    fr: new nspell_1.default(dictionaries.fr.aff, dictionaries.fr.dic),
};
function responseToTwitterUser(response) {
    return {
        name: response.name,
        verified: response.verified,
        yearJoined: response.created_at.split(' ').pop(),
        followersCount: response.followers_count,
        friendsCount: response.friends_count
    };
}
function responseToTweet(response) {
    return {
        text: {
            text: response.full_text,
            lang: Object.keys(spellingCheckers).includes(response.lang) ? response.lang : 'en',
        },
        user: responseToTwitterUser(response.user)
    };
}
function buildTwitClient() {
    return new twit_1.default({
        consumer_key: config_1.default.TWITTER_CONSUMER_KEY,
        consumer_secret: config_1.default.TWITTER_CONSUMER_SECRET,
        app_only_auth: true
    });
}
function getCleanedWords(text) {
    return text.replace(/ \s+/g, ' ').split(' ');
}
function isBadWord(word) {
    return Object.keys(spellingCheckers).some(function (lang) { return washyourmouthoutwithsoap_1.default.check(lang, word); });
}
function getBadWords(words) {
    return words.filter(isBadWord);
}
function removeURL(text) {
    return text.replace(/(https?:\/\/[^\s]+)/g, '');
}
function removeMention(text) {
    return text.replace(/\B@[a-z0-9_-]+\s/gi, '');
}
function removePunctuation(text) {
    return text.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, '');
}
function removeHashtag(text) {
    return text.split(' ')
        .filter(function (word) { return !(/^#/.test(word) || /#$/.test(word)); }).join(' ');
}
exports.removeHashtag = removeHashtag;
function removeEmoji(text) {
    return emoji_strip_1.default(text);
}
function cleanText(text) {
    return removePunctuation(removeEmoji(removeHashtag(removeMention(removeURL((text))))));
}
function badWordsCriteria(text) {
    var cleanedText = cleanText(text);
    var wordsInText = getCleanedWords(cleanedText);
    var badWordsInText = getBadWords(wordsInText);
    return 100 - (100 * badWordsInText.length / wordsInText.length);
}
function spamCriteria(text) {
    var spamParams = {
        minWords: 5,
        maxPercentCaps: 30,
        maxNumSwearWords: 2,
        lang: text.lang
    };
    var spamFilter = new spam_filter_1.default(spamParams);
    var cleanedText = cleanText(text.text);
    return spamFilter.isSpam(cleanedText)
        ? 0
        : 100;
}
function missSpellingCriteria(text) {
    return __awaiter(this, void 0, void 0, function () {
        var cleanedText, wordsInText, spellingChecker, numOfMissSpells;
        return __generator(this, function (_a) {
            cleanedText = cleanText(text.text);
            wordsInText = getCleanedWords(cleanedText);
            spellingChecker = spellingCheckers[text.lang];
            numOfMissSpells = wordsInText
                .filter(function (word) { return isNaN(+word); })
                .reduce(function (acc, curr) {
                return spellingChecker.correct(curr)
                    ? acc
                    : acc + 1;
            }, 0);
            return [2 /*return*/, 100 - (100 * numOfMissSpells / wordsInText.length)];
        });
    });
}
function calculateTextCredibility(text, params) {
    return __awaiter(this, void 0, void 0, function () {
        var badWordsCalculation, spamCalculation, missSpellingCalculation, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    badWordsCalculation = params.weightBadWords * badWordsCriteria(text.text);
                    spamCalculation = params.weightSpam * spamCriteria(text);
                    _a = params.weightMisspelling;
                    return [4 /*yield*/, missSpellingCriteria(text)];
                case 1:
                    missSpellingCalculation = _a * (_b.sent());
                    return [2 /*return*/, {
                            credibility: badWordsCalculation + spamCalculation + missSpellingCalculation
                        }];
            }
        });
    });
}
exports.calculateTextCredibility = calculateTextCredibility;
function getUserInfo(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = buildTwitClient();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.get('users/show', { user_id: userId })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, responseToTwitterUser(response.data)];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getTweetInfo(tweetId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, response, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = buildTwitClient();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.get('statuses/show', { id: tweetId, tweet_mode: 'extended' })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, responseToTweet(response.data)];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2);
                    throw e_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function calculateUserCredibility(user) {
    return getVerifWeight(user.verified) + getCreationWeight(user.yearJoined);
}
function calculateSocialCredibility(user, maxFollowers) {
    var followersImpactCalc = followersImpact(user.followersCount, maxFollowers);
    var ffProportionCalc = ffProportion(user.followersCount, user.friendsCount);
    return Math.min(100, followersImpactCalc + ffProportionCalc);
}
function twitterUserCredibility(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, getUserInfo(userId)
                    .then(function (response) {
                    return {
                        credibility: calculateUserCredibility(response)
                    };
                })];
        });
    });
}
exports.twitterUserCredibility = twitterUserCredibility;
function scrapperTwitterUserCredibility(verified, accountCreationYear) {
    var user = {
        name: '',
        verified: verified,
        yearJoined: accountCreationYear,
        followersCount: 0,
        friendsCount: 0,
    };
    return {
        credibility: calculateUserCredibility(user)
    };
}
exports.scrapperTwitterUserCredibility = scrapperTwitterUserCredibility;
function calculateTweetCredibility(tweetId, params, maxFollowers) {
    return __awaiter(this, void 0, void 0, function () {
        var tweet, user, userCredibility, textCredibility, socialCredibility_1, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getTweetInfo(tweetId)];
                case 1:
                    tweet = _a.sent();
                    user = tweet.user;
                    userCredibility = calculateUserCredibility(user) * params.weightUser;
                    return [4 /*yield*/, calculateTextCredibility(tweet.text, params)];
                case 2:
                    textCredibility = (_a.sent()).credibility * params.weightText;
                    socialCredibility_1 = calculateSocialCredibility(user, maxFollowers) * params.weightSocial;
                    return [2 /*return*/, {
                            credibility: userCredibility + textCredibility + socialCredibility_1
                        }];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    throw e_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.calculateTweetCredibility = calculateTweetCredibility;
function getVerifWeight(isUserVerified) {
    if (isUserVerified) {
        return 50;
    }
    else {
        return 0;
    }
}
function getCreationWeight(yearJoined) {
    var currentYear = new Date().getFullYear();
    var twitterCreationYear = 2006;
    var maxAccountAge = currentYear - twitterCreationYear;
    var accountAge = currentYear - yearJoined;
    return 50 * (accountAge / maxAccountAge);
}
function followersImpact(userFollowers, maxFollowers) {
    if (maxFollowers === 0) {
        return 0;
    }
    else {
        return (userFollowers / maxFollowers) * 50;
    }
}
function ffProportion(userFollowers, userFollowing) {
    if (userFollowers === 0 && userFollowing === 0) {
        return 0;
    }
    else {
        return (userFollowers / (userFollowers + userFollowing)) * 50;
    }
}
function socialCredibility(userID, maxFollowers) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserInfo(userID)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, {
                            credibility: calculateSocialCredibility(response, maxFollowers)
                        }];
            }
        });
    });
}
exports.socialCredibility = socialCredibility;
function scrapedtweetCredibility(tweetText, tweetCredibilityWeights, twitterUser, maxFollowers) {
    return __awaiter(this, void 0, void 0, function () {
        var userCredibility, textCredibility, socialCredibility;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userCredibility = calculateUserCredibility(twitterUser) * tweetCredibilityWeights.weightUser;
                    return [4 /*yield*/, calculateTextCredibility(tweetText, tweetCredibilityWeights)];
                case 1:
                    textCredibility = (_a.sent()).credibility * tweetCredibilityWeights.weightText;
                    socialCredibility = calculateSocialCredibility(twitterUser, maxFollowers) * tweetCredibilityWeights.weightSocial;
                    return [2 /*return*/, {
                            credibility: userCredibility + textCredibility + socialCredibility
                        }];
            }
        });
    });
}
exports.scrapedtweetCredibility = scrapedtweetCredibility;
function scrapedSocialCredibility(followersCount, friendsCount, maxFollowers) {
    var user = {
        name: '',
        verified: false,
        yearJoined: 2018,
        followersCount: followersCount,
        friendsCount: friendsCount
    };
    return {
        credibility: calculateSocialCredibility(user, maxFollowers)
    };
}
exports.scrapedSocialCredibility = scrapedSocialCredibility;
