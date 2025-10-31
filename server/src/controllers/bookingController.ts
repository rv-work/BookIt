import type { Request, Response } from "express";

import Experience from "../models/Experience.js";
import Booking from "../models/Booking.js";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      experienceId,
      customerName,
      customerEmail,
      date,
      time,
      quantity,
      price,
      promoCode,
      promoDiscount,
      finalTotal,
    } = req.body;

    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    const slot = experience.slots.find(
      (s) => new Date(s.date).toDateString() === new Date(date).toDateString()
    );

    if (!slot) {
      return res.status(400).json({ message: "Selected date not available" });
    }

    if (!slot.times.includes(time)) {
      return res.status(400).json({ message: "Selected time not available" });
    }

    if (slot.availableSpots < quantity) {
      return res.status(400).json({
        message: `Only ${slot.availableSpots} spots available for this time slot`,
      });
    }

    const booking = new Booking({
      experienceId,
      customerName,
      customerEmail,
      date: new Date(date),
      time,
      quantity,
      price,
      promoCode: promoCode || undefined,
      promoDiscount: promoDiscount || 0,
      finalTotal,
      status: "confirmed",
    });

    await booking.save();

    slot.availableSpots -= quantity;

    await experience.save();

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: booking.bookingId,
      booking,
      remainingSpots: slot.availableSpots,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
};
