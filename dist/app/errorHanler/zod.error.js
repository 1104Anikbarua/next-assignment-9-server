"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (error) => {
    const statusCode = 400;
    const message = "Validation error";
    const errorDeails = error.issues.map(({ path, message }) => ({
        field: path[path.length - 1],
        message: message,
    }));
    return {
        statusCode,
        message,
        errorDeails,
    };
};
exports.handleZodError = handleZodError;
