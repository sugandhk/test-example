"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.getSummaryRules = void 0;
const express_validator_1 = require("express-validator");
const response_1 = __importDefault(require("@utils/response"));
const getSummaryRules = () => {
    return [
        (0, express_validator_1.body)("content")
            .trim()
            .notEmpty()
            .withMessage("Content can't be empty!")
            .isString()
            .withMessage("Content should be string")
    ];
};
exports.getSummaryRules = getSummaryRules;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    const errorWithParams = {};
    errors.array().forEach((err) => extractedErrors.push(err.msg));
    errors.array().forEach((err) => (errorWithParams[err.path] = err.msg));
    return response_1.default.error(res, {
        statusCode: 422,
        message: extractedErrors[0],
        errors: errorWithParams,
    });
};
exports.validate = validate;
