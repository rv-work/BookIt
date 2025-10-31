import type { Request, Response } from "express";

import PromoCode from "../models/PromoCode.js";

export const validatePromoCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Promo code is required" });
    }

    const promoCode = await PromoCode.findOne({
      code: code.toUpperCase(),
      isActive: true,
      validUntil: { $gte: new Date() },
    });

    if (!promoCode) {
      return res.status(400).json({ message: "Invalid or expired promo code" });
    }

    if (promoCode.usageLimit && promoCode.usageCount >= promoCode.usageLimit) {
      return res
        .status(400)
        .json({ message: "Promo code usage limit exceeded" });
    }

    promoCode.usageCount += 1;
    await promoCode.save();

    res.json({
      message: "Promo code is valid",
      discount: promoCode.discount,
      type: promoCode.type,
    });
  } catch (error) {
    console.error("Error validating promo code:", error);
    res.status(500).json({ message: "Failed to validate promo code" });
  }
};
