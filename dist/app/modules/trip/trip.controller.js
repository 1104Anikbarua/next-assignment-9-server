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
exports.tripControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_utlis_1 = require("../../utlis/sendResponse.utlis");
const tryCatch_utlis_1 = require("../../utlis/tryCatch.utlis");
const trip_service_1 = require("./trip.service");
// createTrip starts here
const createTrip = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const payload = req.body;
    const result = yield trip_service_1.tripServices.createTrip(id, payload);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Trip created successfully",
        data: result,
    });
}));
// createTrip ends here
// get all trips starts here
const getTrips = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield trip_service_1.tripServices.getTrips(query);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Trips retrieved successfully",
        data: result,
    });
}));
// get all trips ends here
const requestBuddy = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tripId } = req.params;
    const id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield trip_service_1.tripServices.requestBuddy(id, tripId);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Travel buddy request sent successfully",
        data: result,
    });
}));
// export all service function starts here
exports.tripControllers = {
    createTrip,
    getTrips,
    requestBuddy,
};
// export all service function ends here
