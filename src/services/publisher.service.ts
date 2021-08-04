import { IPublisher } from "../models/book.interface";
import { PublisherModel } from "../models/publisher.schema";

class PublisherService {
  public async getPublishers(): Promise<IPublisher[]> {
    return await PublisherModel.find({});
  }

  public async getPublisher(publisherId: string): Promise<IPublisher> {
    return await PublisherModel.findOne({ _id: publisherId });
  }

  public async createPublisher(publisher: IPublisher): Promise<IPublisher> {
    return await PublisherModel.create(publisher);
  }

  public async updatePublisher(publisher: IPublisher): Promise<IPublisher> {
    return await PublisherModel.findOneAndUpdate(
      { _id: publisher._id },
      publisher
    );
  }
}

export default new PublisherService();
