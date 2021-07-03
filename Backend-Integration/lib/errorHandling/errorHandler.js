"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var httpError_1 = __importStar(require("./httpError")); // eslint-disable-line no-unused-vars
var config_1 = __importDefault(require("../config"));
// eslint-disable-next-line no-unused-vars
function errorHandler(error, request, response, next) {
    /* istanbul ignore next */
    if (config_1.default.NODE_ENV !== 'test') {
        /* istanbul ignore next */
        console.error(error);
    }
    if (error instanceof httpError_1.default) {
        response
            .status(error.status)
            .send(error);
    }
    else {
        response.status(500).send(new httpError_1.InternalServerError());
    }
}
exports.default = errorHandler;
