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
exports.ProductController = void 0;
var Product_1 = require("../models/Product");
var logger_1 = __importDefault(require("../utils/logger"));
var ApiResponse_1 = require("../utils/ApiResponse");
var Validator_1 = require("../utils/Validator");
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allProducts, apiResponse, error_1, apiResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Product_1.Product.find()];
                    case 1:
                        allProducts = _a.sent();
                        apiResponse = ApiResponse_1.ApiResponse.success(allProducts);
                        logger_1.default.info(apiResponse);
                        return [2 /*return*/, res.status(200).json(apiResponse)];
                    case 2:
                        error_1 = _a.sent();
                        apiResponse = ApiResponse_1.ApiResponse.error("Error on list products", error_1);
                        logger_1.default.error(apiResponse);
                        return [2 /*return*/, res.status(400).json(apiResponse)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var product, _a, _b, name_1, _c, description, _d, category, _e, price, _f, stock, createdProduct, apiResponse, error_2, apiResponse;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, new Product_1.Product()];
                    case 1:
                        product = _g.sent();
                        _a = req.body, _b = _a.name, name_1 = _b === void 0 ? null : _b, _c = _a.description, description = _c === void 0 ? null : _c, _d = _a.category, category = _d === void 0 ? null : _d, _e = _a.price, price = _e === void 0 ? null : _e, _f = _a.stock, stock = _f === void 0 ? null : _f;
                        product.name = name_1;
                        product.description = description;
                        product.category = category;
                        product.price = parseFloat(price);
                        product.stock = parseInt(stock);
                        return [4 /*yield*/, Validator_1.Validator(product)];
                    case 2:
                        _g.sent();
                        return [4 /*yield*/, product.save()];
                    case 3:
                        createdProduct = _g.sent();
                        apiResponse = ApiResponse_1.ApiResponse.success(createdProduct);
                        logger_1.default.info(apiResponse);
                        return [2 /*return*/, res.status(200).json(apiResponse)];
                    case 4:
                        error_2 = _g.sent();
                        apiResponse = ApiResponse_1.ApiResponse.error("Error on create product", error_2);
                        logger_1.default.error(apiResponse);
                        return [2 /*return*/, res.status(400).json(apiResponse)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, uuid, product, _b, _c, name_2, _d, description, _e, category, _f, price, _g, stock, savedProduct, apiResponse, error_3, apiResponse;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 4, , 5]);
                        _a = req.body.uuid, uuid = _a === void 0 ? null : _a;
                        return [4 /*yield*/, Product_1.Product.findOneOrFail(uuid)];
                    case 1:
                        product = _h.sent();
                        _b = req.body, _c = _b.name, name_2 = _c === void 0 ? null : _c, _d = _b.description, description = _d === void 0 ? null : _d, _e = _b.category, category = _e === void 0 ? null : _e, _f = _b.price, price = _f === void 0 ? null : _f, _g = _b.stock, stock = _g === void 0 ? null : _g;
                        product.name = name_2;
                        product.description = description;
                        product.category = category;
                        product.price = parseFloat(price);
                        product.stock = parseInt(stock);
                        return [4 /*yield*/, Validator_1.Validator(product)];
                    case 2:
                        _h.sent();
                        return [4 /*yield*/, product.save()];
                    case 3:
                        savedProduct = _h.sent();
                        apiResponse = ApiResponse_1.ApiResponse.success(savedProduct);
                        logger_1.default.info(apiResponse);
                        return [2 /*return*/, res.status(200).json(apiResponse)];
                    case 4:
                        error_3 = _h.sent();
                        apiResponse = ApiResponse_1.ApiResponse.error("Error on update product", error_3);
                        logger_1.default.error(apiResponse);
                        return [2 /*return*/, res.status(400).json(apiResponse)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, uuid, product, deletedProduct, apiResponse, error_4, apiResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body.uuid, uuid = _a === void 0 ? null : _a;
                        return [4 /*yield*/, Product_1.Product.findOneOrFail(uuid)];
                    case 1:
                        product = _b.sent();
                        return [4 /*yield*/, Validator_1.Validator(product)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, product.remove()];
                    case 3:
                        deletedProduct = _b.sent();
                        apiResponse = ApiResponse_1.ApiResponse.success(deletedProduct);
                        logger_1.default.info(apiResponse);
                        return [2 /*return*/, res.status(200).json(apiResponse)];
                    case 4:
                        error_4 = _b.sent();
                        apiResponse = ApiResponse_1.ApiResponse.error("Error on delete product", error_4);
                        logger_1.default.error(apiResponse);
                        return [2 /*return*/, res.status(400).json(apiResponse)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
exports.default = new ProductController();
