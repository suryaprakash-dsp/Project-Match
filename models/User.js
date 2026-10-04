import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String,required: true,trim: true },

        email: {type: String,required: true,unique: true,lowercase: true,trim: true},

        password: { type: String,required: true,minlength: 6 },

        isVerified: { type: Boolean,default: false, required: true},

        emailOTP: { type: String,  default: null,   required: true},

        department: { type: String,  default: null,   required: true},
        
        academic_year: { type: String,  default: null,   required: true},

        skills: { type: [String], default: [] },

        emailOTPExpires: { type: Date, default: null }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;