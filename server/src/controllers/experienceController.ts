import type { Request, Response } from "express";

import Experience from "../models/Experience.js";

export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find()
      .select("title location price originalPrice image description")
      .sort({ createdAt: -1 });

    res.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Failed to fetch experiences" });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ message: "Failed to fetch experience" });
  }
};
