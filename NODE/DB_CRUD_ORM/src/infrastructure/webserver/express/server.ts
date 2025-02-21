import "reflect-metadata"
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import options from "../../../../swagger/swagger.json";
import authRoutes from "../../../interface/routes/authRoutes";
import userRoutes from "../../../interface/routes/userRoutes";
import { AppDataSource } from "../../helpers/orm/typeorm/config/ormconfig";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes); // Login and register routes
app.use("/api/users", userRoutes);  // Get details, update details, delete details

// Swagger
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(options));

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection successful");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((e) => {
    console.log("Error initializing database connection:", e);
  });
