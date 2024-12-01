"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const response_1 = __importDefault(require("./src/utils/response"));
require("module-alias/register");
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json());
// const httpServer = createServer(app);
/**
 * @admin routes
 */
// app.use("/api/v1/admin/", adminHomeRoutes);
app.use("*", function (req, res) {
    response_1.default.error(res, {
        statusCode: 404,
        message: "Invalid URL!",
    });
});
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        const { items, successUrl, cancelUrl } = req.body;
        // Validate request payload
        if (!items || !successUrl || !cancelUrl) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Map items to Stripe line items
        const lineItems = items.map((item) => ({
            price_data: {
                currency: "usd", // Change as needed
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Stripe expects the amount in cents
            },
            quantity: item.quantity,
        }));
        // Create Stripe Checkout session
        // const session = await stripe.checkout.sessions.create({
        //   payment_method_types: ["card"],
        //   line_items: lineItems,
        //   mode: "payment",
        //   success_url: successUrl,
        //   cancel_url: cancelUrl,
        // });
        // res.status(200).json({ sessionId: session.id });
    }
    catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ message: "Failed to create checkout session", error });
    }
});
// export default (req: VercelRequest, res: VercelResponse) => {
//   app(req, res);
// };
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
// httpServer.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
