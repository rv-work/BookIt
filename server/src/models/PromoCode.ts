import mongoose, { Document, Schema } from "mongoose";

export interface IPromoCode extends Document {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  isActive: boolean;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PromoCodeSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    usageLimit: {
      type: Number,
      min: 1,
    },
    usageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPromoCode>("PromoCode", PromoCodeSchema);
