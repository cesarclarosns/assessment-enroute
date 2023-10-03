import dotenv from "dotenv";

if (process.env.NODE_ENV === "dev") {
  dotenv.config();
}

import { connectDB } from "./db";
import { app } from "./api";
import { config } from "./config/config";

(async () => {
  await connectDB();
  app.listen(config.PORT, () => {
    console.log(`Server is running on port: ${config.PORT}`);
  });
})();
