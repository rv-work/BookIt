import express from "express";
import {
  getExperienceById,
  getExperiences,
} from "../controllers/experienceController.js";

const router = express.Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceById);

export default router;
