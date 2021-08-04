import { IBook } from "../models/book.interface";
import { BookModel } from "../models/book.schema";

class BooksService {
  public async getBooks(callback: any) {
    await BookModel.find(callback);
  }

  public async getBookById(query: any, callback: any) {
    await BookModel.findOne(query, callback);
  }

  public async createBook(book: IBook, callback: any) {
    await BookModel.create(book, callback);
  }

  public async updateBook(book: IBook, callback: any) {
    await BookModel.findOneAndUpdate({ _id: book._id }, book, callback);
  }

  public async deleteBook(_id: string, callback: any) {
    await BookModel.findByIdAndRemove(_id, callback);
  }
}

export default new BooksService();
