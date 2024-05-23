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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_utlis_1 = require("../../utlis/sendResponse.utlis");
const tryCatch_utlis_1 = require("../../utlis/tryCatch.utlis");
const config_1 = __importDefault(require("../../config"));
// create user starts here
const addUser = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield auth_service_1.authServices.addUser(payload);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User registered successfully",
        data: result,
    });
}));
// create user ends here
// login user starts here
const login = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const _a = yield auth_service_1.authServices.logIn(payload), { accessToken, refreshToken } = _a, rest = __rest(_a, ["accessToken", "refreshToken"]);
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.node_env === "production",
        httpOnly: true,
    });
    //
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User logged in successfully",
        data: { accessToken, rest },
    });
}));
// login user ends here
// change password start here
const changePassword = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield auth_service_1.authServices.changePassword(req.user, payload);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password changed successfully",
        data: result,
    });
}));
// change password ends here
// create admin start here
const createAdmin = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield auth_service_1.authServices.createAdmin(payload);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Admin created successfully",
        data: result,
    });
}));
// create admin ends here
// export auth controller function starts here
exports.authControllers = {
    addUser,
    login,
    changePassword,
    createAdmin,
};
// export auth controller function starts here
