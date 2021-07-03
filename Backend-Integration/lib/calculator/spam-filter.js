"use strict";
/*
 * Module dependencies.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var washyourmouthoutwithsoap_1 = __importDefault(require("washyourmouthoutwithsoap"));
/*
 * Checks if a given tweet is spam.
 * @param {number} minWords - the minimum number of words for the tweet
 * @param {number} maxPercentCaps - the percentage of characters that can be
 *                                  capitalized
 * @param {number} maxNumSwearWords - the maximum number of swear words in the
 *                                    tweet
 * @returns {boolean}
 * @api public
 */
var SimpleSpamFilter = /** @class */ (function () {
    function SimpleSpamFilter(opts) {
        this.minWords = opts.minWords;
        this.maxPercentCaps = opts.maxPercentCaps;
        this.maxNumSwearWords = opts.maxNumSwearWords;
        this.lang = opts.lang;
    }
    SimpleSpamFilter.prototype.isSpam = function (tweet) {
        if (this.minWords !== undefined &&
            tweet.split(' ').length < this.minWords) {
            return true;
        }
        if (this.maxPercentCaps !== undefined &&
            percentCaps(tweet) > this.maxPercentCaps) {
            return true;
        }
        if (this.maxNumSwearWords !== undefined &&
            numSwearWords(tweet, this.lang) > this.maxNumSwearWords) {
            return true;
        }
        return false;
    };
    return SimpleSpamFilter;
}());
/*
 * Returns the percentage of the tweet that consists of capitalized characters.
 * @param tweet - the tweet to analyze
 * @returns {number}
 * @api private
 */
function percentCaps(tweet) {
    var capCount = 0;
    var chars = tweet.split('');
    chars.forEach(function (char) {
        if (char === char.toUpperCase()) {
            capCount++;
        }
    });
    return (capCount / tweet.length) * 100;
}
/*
 * Returns the number of swear words in the tweet.
 * @param tweet - the tweet to analyze
 * @returns {number}
 * @api private
 */
function numSwearWords(tweet, lang) {
    function getCleanedWords(text) {
        return text.replace(/[.]|\n|,/g, ' ').split(' ');
    }
    return getCleanedWords(tweet).filter(function (word) { return washyourmouthoutwithsoap_1.default.check(lang, word); }).length;
}
/*
 * Module exports.
 */
exports.default = SimpleSpamFilter;
