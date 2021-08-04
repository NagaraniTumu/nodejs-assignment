import { RESPONSE_STATUS_CODES } from "../constants/app.constants";

class HttpException extends Error {
  statusCode: number;
  message: string;
  errorType: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errorType = `${statusCode} ${RESPONSE_STATUS_CODES[statusCode]}`;
  }
}

export default HttpException;
