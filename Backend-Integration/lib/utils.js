"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrap = function (fn) {
    return function (req, res, done) { return fn(req, res).catch(done); };
};
