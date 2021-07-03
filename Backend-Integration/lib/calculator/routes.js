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
var express_1 = __importDefault(require("express"));
var service_1 = require("./service");
var express_validator_1 = require("express-validator");
var validation_1 = require("./validation");
var utils_1 = require("../utils");
var calculatorRoutes = express_1.default.Router();
calculatorRoutes.get('/plain-text', validation_1.validate('calculateTextCredibility'), utils_1.asyncWrap(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    errors = express_validator_1.validationResult(req);
                    if (!errors.isEmpty()) {
                        validation_1.errorMapper(errors.array());
                    }
                    _b = (_a = res).json;
                    return [4 /*yield*/, service_1.calculateTextCredibility({
                            text: req.query.text,
                            lang: req.query.lang
                        }, {
                            weightBadWords: +req.query.weightBadWords,
                            weightMisspelling: +req.query.weightMisspelling,
                            weightSpam: +req.query.weightSpam
                        })];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}));
calculatorRoutes.get('/twitter/user/:id', validation_1.validate('twitterUserCredibility'), utils_1.asyncWrap(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    errors = express_validator_1.validationResult(req);
                    if (!errors.isEmpty()) {
                        validation_1.errorMapper(errors.array());
                    }
                    _b = (_a = res).json;
                    return [4 /*yield*/, service_1.twitterUserCredibility(req.params.id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}));
calculatorRoutes.get('/user/scrape', validation_1.validate('scrapperTwitterUserCredibility'), function (req, res) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        validation_1.errorMapper(errors.array());
    }
    var userCredibility = service_1.scrapperTwitterUserCredibility(req.query.verified === 'true', Number(req.query.yearJoined));
    res.send(userCredibility);
});
calculatorRoutes.get('/twitter/social/:userId', validation_1.validate('socialCredibility'), utils_1.asyncWrap(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, socialCredibilityVal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = express_validator_1.validationResult(req);
                    if (!errors.isEmpty()) {
                        validation_1.errorMapper(errors.array());
                    }
                    return [4 /*yield*/, service_1.socialCredibility(req.params.userId, +req.query.maxFollowers)];
                case 1:
                    socialCredibilityVal = _a.sent();
                    res.send(socialCredibilityVal);
                    return [2 /*return*/];
            }
        });
    });
}));
calculatorRoutes.get('/twitter/tweets', validation_1.validate('tweetCredibility'), utils_1.asyncWrap(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    errors = express_validator_1.validationResult(req);
                    if (!errors.isEmpty()) {
                        validation_1.errorMapper(errors.array());
                    }
                    _b = (_a = res).json;
                    return [4 /*yield*/, service_1.calculateTweetCredibility(req.query.tweetId, {
                            weightBadWords: +req.query.weightBadWords,
                            weightMisspelling: +req.query.weightMisspelling,
                            weightSpam: +req.query.weightSpam,
                            weightSocial: +req.query.weightSocial,
                            weightText: +req.query.weightText,
                            weightUser: +req.query.weightUser
                        }, +req.query.maxFollowers)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}));
calculatorRoutes.get('/social/scrape', validation_1.validate('scrapedSocialCredibility'), function (req, res) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        validation_1.errorMapper(errors.array());
    }
    res.send(service_1.scrapedSocialCredibility(+req.query.followersCount, +req.query.friendsCount, +req.query.maxFollowers));
});
calculatorRoutes.get('/tweets/scraped', validation_1.validate('scrapedTweetCredibility'), utils_1.asyncWrap(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    errors = express_validator_1.validationResult(req);
                    if (!errors.isEmpty()) {
                        validation_1.errorMapper(errors.array());
                    }
                    _b = (_a = res).json;
                    return [4 /*yield*/, service_1.scrapedtweetCredibility({
                            text: req.query.tweetText,
                            lang: req.query.lang
                        }, {
                            weightSpam: +req.query.weightSpam,
                            weightBadWords: +req.query.weightBadWords,
                            weightMisspelling: +req.query.weightMisspelling,
                            weightText: +req.query.weightText,
                            weightUser: +req.query.weightUser,
                            weightSocial: +req.query.weightSocial,
                        }, {
                            name: '',
                            verified: req.query.verified === 'true',
                            yearJoined: +req.query.yearJoined,
                            followersCount: +req.query.followersCount,
                            friendsCount: +req.query.friendsCount
                        }, +req.query.maxFollowers)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}));
exports.default = calculatorRoutes;
