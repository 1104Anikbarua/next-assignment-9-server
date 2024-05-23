"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (error) => {
    const statusCode = 400;
    const message = "Validation error";
    const issues = error.issues.map((issue) => {
        return {
            field: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode,
        message,
        issues,
    };
};
exports.handleZodError = handleZodError;
