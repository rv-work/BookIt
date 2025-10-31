import mongoose, { Document, Schema } from "mongoose";

export interface IExperience extends Document {
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  fullDescription: string;
  includes: string[];
  slots: {
    date: Date;
    times: string[];
    availableSpots: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    includes: [
      {
        type: String,
        trim: true,
      },
    ],
    slots: [
      {
        date: {
          type: Date,
          required: true,
        },
        times: [
          {
            type: String,
            required: true,
          },
        ],
        availableSpots: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExperience>("Experience", ExperienceSchema);
