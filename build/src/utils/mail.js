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
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv").config();
const transporter = nodemailer_1.default.createTransport({
    pool: true,
    maxConnections: 11,
    maxMessages: Infinity,
    host: String(process.env.MAIL_HOST),
    port: Number(process.env.MAIL_PORT),
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendMail = function (mailData) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield transporter.sendMail(mailData);
        console.log(res);
        // transporter.close();
        return true;
    });
};
exports.default = { sendMail };
