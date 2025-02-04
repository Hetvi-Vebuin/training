import express from "express";
import dotenv from "dotenv";
import colors from "colors";

colors.enable();

import authRoutes from "../../../interface/routes/authRoutes";
import userRoutes from "../../../interface/routes/userRoutes";
import conn from "../../config/db";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// export const startServer = async (): Promise<void> => {
//   try {
//     await conn.getConnection();
//     console.log("Connection successfully".cyan.bgGreen);
//     app.listen(PORT, () => {
//       console.log(`Server Running on PORT ${PORT}`.bgCyan);
//     });
//   } catch (err) {
//     console.log("Unable to connect to the server.".bgRed.white);
//   }
// };
// startServer();
