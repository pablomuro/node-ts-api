"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
var Validator_1 = require("./Validator");
var class_transformer_1 = require("class-transformer");
var ApiResponse = /** @class */ (function () {
    function ApiResponse(success, message, code, data, error) {
        this.success = success;
        this.message = message;
        this.code = code;
        this.data = data;
        this.error = error;
    }
    ApiResponse.error = function (message, errorsResponse) {
        if (!(errorsResponse instanceof Validator_1.ValidatorResponse)) {
            errorsResponse = new Validator_1.ValidatorResponse(true, errorsResponse);
        }
        return new ApiResponse(false, message, 400, null, errorsResponse);
    };
    ApiResponse.success = function (data, message) {
        var successMessage = (message) ? message : 'Success';
        return new ApiResponse(true, successMessage, 200, class_transformer_1.classToClass(data), null);
    };
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
