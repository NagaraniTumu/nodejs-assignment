import * as mongoose from "mongoose";
import { IReview } from "./book.interface";

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  message: { type: String, required: true },
});

export const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);
