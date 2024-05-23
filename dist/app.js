"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes/routes");
const globalError_middleware_1 = require("./app/middleware/globalError.middleware");
const notFound_middleware_1 = require("./app/middleware/notFound.middleware");
const app = (0, express_1.default)();
//parse json object
app.use(express_1.default.json());
// handle cors origin
app.use((0, cors_1.default)());
//connect to the index routes
app.use("/api/v1", routes_1.indexRoutes);
app.use("/", (req, res) => {
    res.send("Hellow world");
});
// basic global error handler
app.use(globalError_middleware_1.handleGlobalError);
app.use(notFound_middleware_1.handleNotFound);
exports.default = app;
