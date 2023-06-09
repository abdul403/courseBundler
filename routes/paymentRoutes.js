import express from "express";
import {
  buySubsription,
  cancelSubscription,
  getRazorpayKey,
  verifyPayment,
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

// Buy subscription

router.route("/subscribe").get(isAuthenticated, buySubsription);

// payment verification and save in database
router.route("/paymentverification").post(isAuthenticated, verifyPayment);

// get razor pay key
router.route("/razorpaykey").get(getRazorpayKey);

//cancel subscription

router
  .route("/subscription/cancel")
  .delete(isAuthenticated, cancelSubscription);
export default router;
