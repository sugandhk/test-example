import { Request, Response, NextFunction } from "express";
import db from "../../../models/index";
import { Op, Sequelize } from "sequelize";
import response from "@utils/response";
import helper from "@utils/helper";
import groqcloud from "@utils/groqcloud";
import moment from 'moment';
import jwt from "jsonwebtoken";
import { GST } from "@utils/constants";

export const getSummary = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { content } = req.body;

        const prompt = `${content} \n\n Summary:`;
        
        const summary = await groqcloud.getSummary(prompt);
        return response.success(res, {
            statusCode: 200,
            message: "Success",
            data: {
                summary: summary && summary.choices && summary.choices.length > 0 && summary.choices[0].message && summary.choices[0].message.content ? summary.choices[0].message.content : null,
            }
        });
    } catch (err) {
        console.error(err);
        return response.error(res, {
            statusCode: 500,
            message: "Something went wrong!"
        });
    }
};

export default {
    getSummary
}