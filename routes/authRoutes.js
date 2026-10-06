import express from "express";

import { register, verifyEmailOTP ,login} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email-otp", verifyEmailOTP);
    
router.post("/login", login);

export default router;