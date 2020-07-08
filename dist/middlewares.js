"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageMiddleware = void 0;
var api_1 = __importDefault(require("./api"));
exports.languageMiddleware = function (req, res, next) {
    req.acceptsLanguages();
    api_1.default.language = 'asasasas';
    next();
};
