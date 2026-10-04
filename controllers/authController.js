import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import generateOTP from "../utils/generateOTP.js";
import sendEmail from "../utils/sendEmail.js";

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password ,department, academic_year, skills} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }
        console.log("REGISTER DATA:", { name, email, password });
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate 6 digit OTP
        const otp = generateOTP();

        // OTP valid for 10 minutes
        const otpExpiry = new Date(
            Date.now() + 10 * 60 * 1000
        );

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            emailOTP: otp,
            emailOTPExpires: otpExpiry,
            department: department,
            academic_year: academic_year,
            skills: skills
        });

        // Send only OTP
        await sendEmail({
            to: email,
            subject: "Email Verification OTP",
            text: otp,
        });

        res.status(201).json({
            success: true,
            message: "OTP sent to your email",
            email: user.email,
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// VERIFY EMAIL OTP
export const verifyEmailOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const user = await User.findOne({ email });

        console.log("VERIFY OTP DATA:", user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified",
            });
        }

        // Check OTP
        if (user.emailOTP !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Check OTP expiry
        if (
            !user.emailOTPExpires ||
            user.emailOTPExpires < new Date()
        ) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }

        // Verify user
        user.isVerified = true;
        user.emailOTP = otp;
        user.emailOTPExpires = null;

        await user.save();

        // Generate JWT only after verification
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
                emailOTP: user.emailOTP
            },
        });

    } catch (error) {
        console.error("VERIFY OTP ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};