import { IReview } from "../models/book.interface";
import { ReviewModel } from "../models/review.schema";

class ReviewsService {
  public async getReviews(): Promise<IReview[]> {
    return await ReviewModel.find({});
  }

  public async getReview(reviewId: string): Promise<IReview> {
    return await ReviewModel.findOne({ _id: reviewId });
  }

  public async createReviews(reviews: IReview[]): Promise<IReview[]> {
    return await ReviewModel.insertMany(reviews);
  }
}

export default new ReviewsService();
