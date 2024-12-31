import mongoose, { Schema, Document } from 'mongoose';

export interface Candy extends Document {
  name: string;
  image: string;
  flavor: string;
  summary: string;
  rating: number;
  manufacturer: string;
  ingredients: string[];
  reviewsAmount: number;
  reviews: Review[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CandySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    flavor: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    reviewsAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [ReviewSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Candy>('Candy', CandySchema);