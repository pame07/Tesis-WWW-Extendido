"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_winston_1 = __importDefault(require("express-winston"));
var winston_1 = __importDefault(require("winston"));
var errorHandler_1 = __importDefault(require("./errorHandling/errorHandler"));
var routes_1 = __importDefault(require("./calculator/routes"));
var config_1 = __importDefault(require("./config"));
var app = express_1.default();
/* istanbul ignore next */
if (config_1.default.NODE_ENV !== 'test') {
    app.use(express_winston_1.default.logger({
        transports: [
            new winston_1.default.transports.Console()
        ],
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
        meta: false,
        msg: 'HTTP {{req.method}} {{req.url}}',
        colorize: true
    }));
}
app.use('/health', function (req, res) {
    res.json({ status: 'UP' });
});
app.use('/calculate', routes_1.default);
app.use(errorHandler_1.default);
exports.default = app;
