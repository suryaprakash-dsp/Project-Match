import express from "express";

import {
    createProject,
    getAllProjects,
} from "../controllers/projectController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createProject", protect, createProject);

router.get("/getAllProjects",protect, getAllProjects);

export default router;