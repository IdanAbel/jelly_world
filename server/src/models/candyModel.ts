import mongoose, { Schema, Document } from 'mongoose';
import { ReviewSchema, Review } from './reviewModel';
import User from './userModel';

export interface Candy extends Document {
  beanId: number;
  groupName: string[];
  ingredients: string[];
  flavorName: string;
  description: string;
  colorGroup: string;
  backgroundColor: string;
  imageUrl: string;
  glutenFree: boolean;
  sugarFree: boolean;
  seasonal: boolean;
  kosher: boolean;
  rating: number;
  reviewsAmount: number;
  reviews: Review[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CandySchema: Schema = new Schema(
  {
    beanId: {
      type: Number,
      required: false,
    },
    groupName: {
      type: [String],
      required: false,
    },
    ingredients: {
      type: [String],
      required: false,
    },
    flavorName: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    colorGroup: {
      type: String,
      required: false,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    glutenFree: {
      type: Boolean,
      required: false,
    },
    sugarFree: {
      type: Boolean,
      required: false,
    },
    seasonal: {
      type: Boolean,
      required: false,
    },
    kosher: {
      type: Boolean,
      required: false,
    },
    rating: {
      type: Number,
      default: 0,
      required: false,
    },
    reviewsAmount: {
      type: Number,
      default: 0,
      required: false,
    },
    reviews: [ReviewSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Candy>('Candies', CandySchema);
