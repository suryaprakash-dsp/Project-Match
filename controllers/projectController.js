import Project from "../models/Project.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
    try {
        const {
            project_Title,
            category,
            open_vacancies,
            project_description,
            required_skills,
        } = req.body;

        // Validation
        if (
            !project_Title ||
            !category ||
            !open_vacancies
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Project title, category and open vacancies are required",
            });
        }

        // Create project
        const project = await Project.create({
            userId: req.user._id,
            project_Title,
            category,
            open_vacancies,
            project_description,
            required_skills,
        });

        // Get created project with user details
        const createdProject = await Project.findById(project._id)
            .populate("userId", "name email");

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project: createdProject,
        });

    } catch (error) {
        console.error("CREATE PROJECT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// GET ALL PROJECTS
export const getAllProjects = async (req, res) => {
    try {
        const {
            type = "available",
            search = "",
            category = "",
            skills = "",
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            order = "desc",
        } = req.query;

        // Get logged-in user from JWT
        const loggedInUserId = req.user._id;

        // Pagination
        const pageNumber = Math.max(parseInt(page) || 1, 1);
        const limitNumber = Math.max(parseInt(limit) || 10, 1);

        const skip = (pageNumber - 1) * limitNumber;

        // MongoDB filter
        const filter = {};

        // --------------------------------
        // MY PROJECTS / AVAILABLE PROJECTS
        // --------------------------------

        if (type === "my") {
            // Only logged-in user's projects
            filter.userId = loggedInUserId;
        } else if (type === "available") {
            // Exclude logged-in user's projects
            filter.userId = {
                $ne: loggedInUserId,
            };
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid project type. Use 'my' or 'available'",
            });
        }

        // --------------------------------
        // SEARCH
        // --------------------------------

        if (search.trim()) {
            filter.$or = [
                {
                    project_Title: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
                {
                    category: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
                {
                    project_description: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
            ];
        }

        // --------------------------------
        // CATEGORY FILTER
        // --------------------------------

        if (category.trim()) {
            filter.category = {
                $regex: category.trim(),
                $options: "i",
            };
        }

        // --------------------------------
        // SKILLS FILTER
        // --------------------------------

        if (skills.trim()) {
            const skillArray = skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);

            if (skillArray.length > 0) {
                filter.required_skills = {
                    $in: skillArray,
                };
            }
        }

        // --------------------------------
        // SORTING
        // --------------------------------

        const sortOrder =
            order.toLowerCase() === "asc" ? 1 : -1;

        const sort = {
            [sortBy]: sortOrder,
        };

        // --------------------------------
        // GET PROJECTS
        // --------------------------------

        const projects = await Project.find(filter)
            .populate("userId", "name email")
            .sort(sort)
            .skip(skip)
            .limit(limitNumber);

        // --------------------------------
        // TOTAL COUNT
        // --------------------------------

        const totalProjects = await Project.countDocuments(filter);

        const totalPages = Math.ceil(
            totalProjects / limitNumber
        );

        // --------------------------------
        // RESPONSE
        // --------------------------------

        return res.status(200).json({
            success: true,
            type,
            projects,
            pagination: {
                currentPage: pageNumber,
                limit: limitNumber,
                totalProjects,
                totalPages,
            },
        });

    } catch (error) {
        console.error("GET ALL PROJECTS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};