import { Request, Response, NextFunction } from "express";

import BooksService from "../services/book.service";
import ReviewsService from "../services/review.service";
import PublisherService from "../services/publisher.service";

import HttpException from "../exceptions/http.exception";

import { IBook } from "../models/book.interface";

import { ERROR_MSGS, SUCCESS_MSGS } from "../constants/message.constants";

class BookController {
  public getBookById(req: Request, res: Response, next: NextFunction) {
    const bookId = req.params.book_id;

    BooksService.getBookById({ _id: bookId }, (err, book) => {
      if (!book) {
        next(new HttpException(400, `${ERROR_MSGS.InvalidBookId} ${bookId}`));
      } else {
        res.send({
          statusCode: 200,
          message: SUCCESS_MSGS.BooksById,
          data: book,
        });
      }
    });
  }

  public getBooks(req: Request, res: Response, next: NextFunction) {
    BooksService.getBooks((err: any, books: IBook[]) => {
      if (err) {
        next(new HttpException(500, err.message));
      } else {
        res.send({
          statusCode: 200,
          message: SUCCESS_MSGS.Books,
          data: books,
        });
      }
    });
  }

  public async createBook(req: Request, res: Response, next: NextFunction) {
    const book = { ...req.body };

    if (book.reviews) {
      const reviews = await ReviewsService.createReviews(book.reviews);
      book.reviews = reviews.map((review) => review._id);
    }

    const publisher = await PublisherService.createPublisher(book.publisher);
    book.publisher = publisher._id;

    await BooksService.createBook(book, (err, doc) => {
      if (err && err.code === 11000) {
        next(new HttpException(409, ERROR_MSGS.UniqueBook));
      } else if (!doc) {
        next(new HttpException(500, err));
      } else {
        res.send({
          statusCode: 200,
          message: SUCCESS_MSGS.CreateBook,
          data: doc,
        });
      }
    });
  }

  public async updateBook(req: Request, res: Response, next: NextFunction) {
    const book = req.body;
    try {
      if (book.publisher) {
        const publisher = await PublisherService.updatePublisher(
          book.publisher
        );
        if (!publisher) {
          next(
            new HttpException(
              400,
              `${ERROR_MSGS.InvalidPublisherId} ${book.publisher._id}`
            )
          );
          return;
        }
      }

      await BooksService.updateBook(book, (err, doc) => {
        if (err && err.code === 11000) {
          next(new HttpException(409, ERROR_MSGS.UniqueBook));
        } else if (!doc) {
          next(
            new HttpException(404, `${ERROR_MSGS.InvalidBookId} ${book._id}`)
          );
        } else {
          res.send({
            statusCode: 200,
            message: SUCCESS_MSGS.UpdateBook,
            data: doc,
          });
        }
      });
    } catch (err) {}
  }

  public deleteBook(req: Request, res: Response, next: NextFunction) {
    const bookId = req.params.book_id;

    BooksService.deleteBook(bookId, (err, data) => {
      if (err || !data) {
        next(new HttpException(404, `${ERROR_MSGS.InvalidBookId} ${bookId}`));
      } else {
        res.send({
          statusCode: 200,
          message: SUCCESS_MSGS.DeleteBook,
        });
      }
    });
  }
}

export default new BookController();
