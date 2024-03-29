"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_utlis_1 = require("../../utlis/sendResponse.utlis");
const tryCatch_utlis_1 = require("../../utlis/tryCatch.utlis");
const user_service_1 = require("./user.service");
// update user profile starts here
const getProfile = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield user_service_1.userServices.getProfile(id);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User profile retrieved successfully",
        data: result,
    });
}));
// update user profile ends here
const setStatus = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const payload = req.body;
    const result = yield user_service_1.userServices.setProfile(id, payload);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User profile updated successfully",
        data: result,
    });
}));
// export user controller functions starts here
exports.userControllers = {
    getProfile,
    setStatus,
};
