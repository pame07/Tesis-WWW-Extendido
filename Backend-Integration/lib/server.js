"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var config_1 = __importDefault(require("./config"));
app_1.default.listen(config_1.default.PORT, function () {
    console.log('Server listening at port ' + config_1.default.PORT);
});
