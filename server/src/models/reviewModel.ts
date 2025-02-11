import mongoose, { Schema, Document } from 'mongoose';

export interface Review extends Document {
  rating: number;
  comment: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const ReviewSchema: Schema = new Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model<Review>('Reviews', ReviewSchema);

export default ReviewModel;