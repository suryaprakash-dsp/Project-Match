import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        project_Title: {
            type: String,
            required: true,
            trim: true,
        },

        category:{
            type: String,
            required: true,
            unique: true,   
            trim: true,
        },

        open_vacancies: {
            type: String,
            required: true,
        },

        project_description: {
            type: String,
            default: "",
            trim: true,
        },

        required_skills: {
            type: [String],
            default: [],
        }

             
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;