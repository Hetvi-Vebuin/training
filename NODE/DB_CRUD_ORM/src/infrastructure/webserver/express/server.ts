import "reflect-metadata"
import express from "express";
import dotenv from "dotenv";
// import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options from "../../../../swagger/swagger.json";
import authRoutes from "../../../interface/routes/authRoutes";
import userRoutes from "../../../interface/routes/userRoutes";
import { AppDataSource } from "../../helpers/orm/typeorm/config/ormconfig";

dotenv.config();

const app = express();
app.use(express.json());

// test
// app.use("/",(req, res)=>{
//   res.send("demo");
// });

app.use("/api/auth", authRoutes); // Login and register routes
app.use("/api/users", userRoutes);  // Get details, update details, delete details

const PORT = 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection successful");

    // Swagger
    // const specs=swaggerJSDoc(options);
    app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(options));

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((e) => {
    console.log("Error initializing database connection:", e);
  });
