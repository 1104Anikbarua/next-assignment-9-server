"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGlobalError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = require("jsonwebtoken");
const zod_1 = require("zod");
const zod_error_1 = require("../errorHanler/zod.error");
const appError_error_1 = require("../errorHanler/appError.error");
const handleGlobalError = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Opps! something went wrong";
    // if any zod validation error occured
    if (error instanceof zod_1.ZodError) {
        const zodError = (0, zod_error_1.handleZodError)(error);
        statusCode = zodError.statusCode;
        message = zodError.message;
        error = { issue: zodError.issues };
    }
    //if token is incorrect then this if block is going to execute
    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
        statusCode = http_status_1.default.UNAUTHORIZED;
        message = "Unauthorized Access";
    }
    //if token is expired then this if block is going to execute
    else if (error instanceof jsonwebtoken_1.TokenExpiredError) {
        statusCode = http_status_1.default.FORBIDDEN;
        message = "Unauthorized Access";
    }
    // if any error happend then this if block is going to execute
    else if (error instanceof appError_error_1.AppError) {
        statusCode = error.statusCode;
        message = error.message;
    }
    // format error class
    else if (error instanceof Error) {
        statusCode = http_status_1.default.BAD_REQUEST;
        message = error.message;
    }
    //send response to the client
    res.status(statusCode).json({
        success: false,
        message,
        errorDetails: error,
        // stack: error.stack,
    });
};
exports.handleGlobalError = handleGlobalError;
