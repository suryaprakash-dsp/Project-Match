import User from "../models/User.js";

// GET ALL USERS
export const getAllUsers = async (req, res) => {
    try {
        const {
            search = "",
            skills = "",
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            order = "desc",
        } = req.query;

        // Pagination
        const pageNumber = Math.max(parseInt(page), 1);
        const limitNumber = Math.max(parseInt(limit), 1);
        const skip = (pageNumber - 1) * limitNumber;

        // MongoDB filter
        const filter = {
            isVerified: true,
        };

        // Search by name or email
        if (search.trim()) {
            filter.$or = [
                {
                    name: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
            ];
        }

        // Skill filter
        if (skills.trim()) {
            const skillArray = skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);

            if (skillArray.length > 0) {
                filter.skills = {
                    $in: skillArray,
                };
            }
        }

        // Sorting
        const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

        const sort = {
            [sortBy]: sortOrder,
        };

        // Get users
        const users = await User.find(filter)
            .select("-password -emailOTP -emailOTPExpires")
            .sort(sort)
            .skip(skip)
            .limit(limitNumber);

        // Total users
        const totalUsers = await User.countDocuments(filter);

        const totalPages = Math.ceil(totalUsers / limitNumber);

        res.status(200).json({
            success: true,
            users,
            pagination: {
                currentPage: pageNumber,
                limit: limitNumber,
                totalUsers,
                totalPages,
            },
        });

    } catch (error) {
        console.error("GET ALL USERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};