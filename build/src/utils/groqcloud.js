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
Object.defineProperty(exports, "__esModule", { value: true });
// import axios from "axios";
require("dotenv").config();
const getSummary = (content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const response = await axios.post(
        //   'https://api.groq.com/openai/v1/chat/completions',
        //   {
        //     model: "llama3-8b-8192",
        //     messages: [
        //       {
        //         role: "user",
        //         content: content
        //       }
        //     ]
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        //     }
        //   }
        // );
        // console.log(response.data, "from sms top");
        return "Test"; //response.data;
    }
    catch (error) {
        console.log(error, "from sms top");
        return error;
    }
});
exports.default = { getSummary };
