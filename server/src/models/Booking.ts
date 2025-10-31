import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail: string;
  date: Date;
  time: string;
  quantity: number;
  price: number;
  promoCode?: string;
  promoDiscount: number;
  finalTotal: number;
  status: "confirmed" | "cancelled" | "pending";
  bookingId: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema(
  {
    experienceId: {
      type: Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    promoCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    promoDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },
    finalTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "pending"],
      default: "confirmed",
    },
    bookingId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.pre("save", function (next) {
  if (!this.bookingId) {
    this.bookingId =
      "BK" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});
BookingSchema.index({ bookingId: 1 }, { unique: true });

export default mongoose.model<IBooking>("Booking", BookingSchema);
