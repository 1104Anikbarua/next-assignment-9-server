"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSendResposne = void 0;
const handleSendResposne = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        meta: data.meta,
        data: data.data,
    });
};
exports.handleSendResposne = handleSendResposne;
