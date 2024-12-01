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
exports.getSummary = void 0;
const response_1 = __importDefault(require("@utils/response"));
const groqcloud_1 = __importDefault(require("@utils/groqcloud"));
const getSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const prompt = `${content} \n\n Summary:`;
        const summary = yield groqcloud_1.default.getSummary(prompt);
        return response_1.default.success(res, {
            statusCode: 200,
            message: "Success",
            data: {
                summary: summary && summary.choices && summary.choices.length > 0 && summary.choices[0].message && summary.choices[0].message.content ? summary.choices[0].message.content : null,
            }
        });
    }
    catch (err) {
        console.error(err);
        return response_1.default.error(res, {
            statusCode: 500,
            message: "Something went wrong!"
        });
    }
});
exports.getSummary = getSummary;
exports.default = {
    getSummary: exports.getSummary
};
