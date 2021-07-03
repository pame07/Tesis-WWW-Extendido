"use strict";
/* istanbul ignore file */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError() {
        var _this = _super.call(this) || this;
        _this.status = 0;
        _this.title = '';
        _this.message = '';
        _this.userMessage = '';
        Object.setPrototypeOf(_this, HttpError.prototype);
        return _this;
    }
    return HttpError;
}(Error));
exports.default = HttpError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(errors) {
        if (errors === void 0) { errors = []; }
        var _this = _super.call(this) || this;
        _this.status = 400;
        _this.title = 'Bad Request';
        _this.message = 'A validation failed';
        _this.userMessage = 'An error has ocurred';
        if (errors.length !== 0) {
            _this.errors = errors;
        }
        return _this;
    }
    return BadRequestError;
}(HttpError));
exports.BadRequestError = BadRequestError;
var UnauthenticatedError = /** @class */ (function (_super) {
    __extends(UnauthenticatedError, _super);
    function UnauthenticatedError() {
        var _this = _super.call(this) || this;
        _this.status = 401;
        _this.title = 'Unauthenticated';
        _this.message = 'Not authenticated';
        _this.userMessage = 'Client needs to authenticate';
        return _this;
    }
    return UnauthenticatedError;
}(HttpError));
exports.UnauthenticatedError = UnauthenticatedError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        var _this = _super.call(this) || this;
        _this.status = 403;
        _this.title = 'Forbidden';
        _this.message = 'Cannot Access';
        _this.userMessage = 'Client cannot access this resource';
        return _this;
    }
    return UnauthorizedError;
}(HttpError));
exports.UnauthorizedError = UnauthorizedError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError() {
        var _this = _super.call(this) || this;
        _this.status = 404;
        _this.title = 'Not found';
        _this.message = 'The requested resource was not found';
        _this.userMessage = 'Not found';
        return _this;
    }
    return NotFoundError;
}(HttpError));
exports.NotFoundError = NotFoundError;
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError() {
        var _this = _super.call(this) || this;
        _this.status = 500;
        _this.title = 'Internal Server Error';
        _this.message = 'An error has ocurred';
        _this.userMessage = 'An error has ocurred';
        return _this;
    }
    return InternalServerError;
}(HttpError));
exports.InternalServerError = InternalServerError;
