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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = __importDefault(require("../utils/response"));
const index_1 = __importDefault(require("../models/index"));
const is_auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return response_1.default.error(res, {
            statusCode: 401,
            message: "Token Not Found",
        });
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        err.statusCode = 401;
        console.log(err);
        return res.status(401).json({
            status: false,
            message: err.message,
        });
    }
    if (!decodedToken) {
        return response_1.default.error(res, {
            statusCode: 401,
            message: "Not authenticated!",
        });
    }
    req.token = decodedToken;
    const user = yield index_1.default.User.findOne({
        where: { id: req.token.id },
    });
    if (!user) {
        return response_1.default.error(res, {
            statusCode: 401,
            message: "User not found!",
        });
    }
    if (user.status == false) {
        return response_1.default.error(res, {
            statusCode: 401,
            message: "Your account is inactive!",
        });
    }
    next();
});
exports.default = is_auth;
