import app from "./config/app";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));
