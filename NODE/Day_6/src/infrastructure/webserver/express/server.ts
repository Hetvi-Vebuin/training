import express from "express";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options from "../../../../swagger/swagger.json";
// import colors from "colors";

// colors.enable();

import authRoutes from "../../../interface/routes/authRoutes";
import userRoutes from "../../../interface/routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// const specs=swaggerJSDoc(options);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(options));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

