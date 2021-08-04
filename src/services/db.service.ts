import { connect } from "mongoose";

import { logger } from "../utils/logger";

import { DBCONFIG, CONNECTION_OPTIONS } from "../constants/app.constants";

class DBService {
  public connectDB(): void {
    connect(this.getConnectionString(), CONNECTION_OPTIONS)
      .then(() => logger.info("Connected to DB."))
      .catch((err) => logger.error(err));
  }

  private getConnectionString(): string {
    return (
      "mongodb+srv://" +
      DBCONFIG.username +
      ":" +
      DBCONFIG.password +
      "@cluster0.kqxbg.mongodb.net/" +
      DBCONFIG.database +
      "?retryWrites=true&w=majority"
    );
  }
}

export default new DBService();
