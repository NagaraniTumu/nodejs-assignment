import { Response } from "express";

import { RESPONSE_STATUS_CODES } from "../constants/app.constants";

export class ResponseHandler {
  public send(res: Response, statusCode: number, message: string, data?: any) {
    res.status(statusCode).json({
      stautsCode: statusCode,
      message: message,
      data: data,
    });
    res.end();
  }

  public sendError(res: Response, statusCode: number, message: string) {
    res.status(statusCode).json({
      stautsCode: statusCode,
      message: message,
      errorType: `${statusCode} ${RESPONSE_STATUS_CODES[statusCode]}`,
    });
    res.end();
  }
}


