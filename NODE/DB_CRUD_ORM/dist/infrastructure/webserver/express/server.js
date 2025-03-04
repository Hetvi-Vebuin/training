"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../../../../swagger/swagger.json"));
const authRoutes_1 = __importDefault(require("../../../interface/routes/authRoutes"));
const userRoutes_1 = __importDefault(require("../../../interface/routes/userRoutes"));
const ormconfig_1 = require("../../helpers/orm/typeorm/config/ormconfig");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Allow frontend
    credentials: true, // Allow cookies and headers
}));
app.use("/api/auth", authRoutes_1.default); // Login and register routes
app.use("/api/users", userRoutes_1.default); // Get details, update details, delete details
// Swagger
app.use("/api-doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
ormconfig_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((e) => {
    console.log("Error initializing database connection:", e);
});
