import { ExpressJoiError } from "express-joi-validation";

import { RESPONSE_STATUS_CODES } from "../constants/app.constants";
import { NextFunction, Request, Response } from "express";

function errorMiddleware(
  error: any | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error && error.type) {
    const e: ExpressJoiError = error;
    res.status(400).send({
      statusCode: 400,
      message: `${e.type}: ${e.error.details.map((x) => x.message).join(", ")}`,
      errorType: `400 ${RESPONSE_STATUS_CODES[400]}`,
    });
  } else {
    const status = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    const errorType = error.errorType || "500 Internal server error";
    res.status(status).send({
      statusCode: status,
      message: message,
      errorType: errorType,
    });
  }
}

export default errorMiddleware;
