import express from "express";
import { connectDB } from "./db/connection.js";
import configService from "./config/config.service.js";
import { errorHandler } from "./common/index.js";
import { authController, userController } from "./module/index.js";

let port = configService.PORT;
const app = express();
app.use(express.json());
await connectDB();

app.use("/auth", authController);
app.use("/user", userController);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
