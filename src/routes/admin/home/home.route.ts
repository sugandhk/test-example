import express from "express";
const router = express.Router();
import is_auth from "@middleware/is_auth";

import homeController from "../../../controllers/admin/home/home.controller";

import {
    getSummaryRules,
    validate
} from "../../../validators/admin/home/home.validator";


router.post('/get-summary', getSummaryRules(), validate, homeController.getSummary);

export default router;
