"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
/* istanbul ignore next */
exports.default = {
    PORT: process.env.PORT,
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY || '',
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET || '',
    NODE_ENV: process.env.NODE_ENV || 'local'
};
