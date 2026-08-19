import express from "express";

import {
getProfile,
updateProfile,
} from "../controllers/studentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// Get logged-in student's profile

router.get(
"/profile",
authMiddleware,
getProfile
);

// Update logged-in student's profile
router.put(
"/profile",
authMiddleware,
updateProfile
);
export default router;