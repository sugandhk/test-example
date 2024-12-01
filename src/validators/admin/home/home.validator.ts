import { body, header, query, validationResult } from "express-validator";
import express, { Request, Response, NextFunction } from "express";
import db from "../../../models/index";
import response from "@utils/response";

export const getSummaryRules = () => {
    return [
        body("content")
            .trim()
            .notEmpty()
            .withMessage("Content can't be empty!")
            .isString()
            .withMessage("Content should be string")
    ]
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: any = [];
    const errorWithParams: any = {};
    errors.array().forEach((err) => extractedErrors.push(err.msg));
    errors.array().forEach((err: any) => (errorWithParams[err.path] = err.msg));
    return response.error(res, {
        statusCode: 422,
        message: extractedErrors[0],
        errors: errorWithParams,
    });
};