"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("./controllers/UserController"));
var ProductController_1 = __importDefault(require("./controllers/ProductController"));
var ApiResponse_1 = require("./utils/ApiResponse");
var AuthMiddleware_1 = require("./utils/AuthMiddleware");
var routes = express_1.Router();
routes.get('/', UserController_1.default.index);
routes.post('/register', UserController_1.default.create);
routes.post('/login', UserController_1.default.login);
routes.get('/logout', AuthMiddleware_1.AuthMiddleware.logout, UserController_1.default.logout);
routes.get('/products', AuthMiddleware_1.AuthMiddleware.authValidation, ProductController_1.default.list);
routes.post('/product', AuthMiddleware_1.AuthMiddleware.authValidation, ProductController_1.default.create);
routes.put('/product/:uuid', AuthMiddleware_1.AuthMiddleware.authValidation, ProductController_1.default.update);
routes.delete('/product/:uuid', AuthMiddleware_1.AuthMiddleware.authValidation, ProductController_1.default.delete);
routes.use('*', function (req, res) {
    return res.status(404).json(ApiResponse_1.ApiResponse.error("API endpoint doesn't exist", {}));
});
exports.default = routes;
