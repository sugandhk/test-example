import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import db from "./src/models/index";
import response from "./src/utils/response";
import "module-alias/register";
import Stripe from "stripe";

import { createServer, Server as HTTPServer } from 'http';
import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * @admin routes
 */
import adminHomeRoutes from "./src/routes/admin/home/home.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
// const httpServer = createServer(app);

const stripe = new Stripe("sk_test_51QRCwrCmVwGMpdRjCt7vRmddgCACpd6e8zaxEbnqrexkg7iu29lgY72DQLWEMZTLCo6Bnxjcr3YijtM7honiqejr004EyZm6Vw" as string, {
  typescript: true,
});

app.post("/api/stripe-create-checkout-session", async (req: Request, res: Response) => {
  try {
    const { items, successUrl, cancelUrl } = req.body;

    // return res.status(200).json({ message: "Success" });

    if (!items || !successUrl || !cancelUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: "Failed to create checkout session", error });
  }
});



/**
 * @admin routes
 */
// app.use("/api/v1/admin/", adminHomeRoutes);




app.use("*", function (req: Request, res: Response) {
  response.error(res, {
    statusCode: 404,
    message: "Invalid URL!",
  });
});

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};

// export default async (req: VercelRequest, res: VercelResponse) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     const { items, successUrl, cancelUrl } = req.body;

//     // Validate request payload
//     if (!items || !successUrl || !cancelUrl) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Map items to Stripe line items
//     const lineItems = items.map((item: any) => ({
//       price_data: {
//         currency: "usd", // Change as needed
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100, // Stripe expects the amount in cents
//       },
//       quantity: item.quantity,
//     }));

//     // Create Stripe Checkout session
//     // const session = await stripe.checkout.sessions.create({
//     //   payment_method_types: ["card"],
//     //   line_items: lineItems,
//     //   mode: "payment",
//     //   success_url: successUrl,
//     //   cancel_url: cancelUrl,
//     // });

//     // res.status(200).json({ sessionId: session.id });
//   } catch (error: any) {
//     console.error("Stripe Error:", error);
//     res.status(500).json({ message: "Failed to create checkout session", error });
//   }
// };

// export default (req: VercelRequest, res: VercelResponse) => {
//   app(req, res);
// };

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
// httpServer.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });