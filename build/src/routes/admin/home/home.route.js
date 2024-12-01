"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const home_controller_1 = __importDefault(require("../../../controllers/admin/home/home.controller"));
const home_validator_1 = require("../../../validators/admin/home/home.validator");
router.post('/get-summary', (0, home_validator_1.getSummaryRules)(), home_validator_1.validate, home_controller_1.default.getSummary);
exports.default = router;
