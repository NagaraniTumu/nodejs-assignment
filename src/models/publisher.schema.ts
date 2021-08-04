import * as mongoose from "mongoose";
import { IPublisher } from "./book.interface";

const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
});

export const PublisherModel = mongoose.model<IPublisher>(
  "Publisher",
  publisherSchema
);
