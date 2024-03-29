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
exports.travelBuddyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_utlis_1 = require("../../utlis/sendResponse.utlis");
const tryCatch_utlis_1 = require("../../utlis/tryCatch.utlis");
const travelBuddy_service_1 = require("./travelBuddy.service");
// get travel buddies starts here
const getTravelBuddies = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get trip id from params
    const { tripId } = req.params;
    const result = yield travelBuddy_service_1.travelBuddyServices.getTravelBuddies(tripId);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Potential travel buddies retrieved successfully",
        data: result,
    });
}));
// get travel buddies ends here
const responsdTravelBuddy = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buddyId } = req.params;
    const payload = req.body;
    const result = yield travelBuddy_service_1.travelBuddyServices.respondRequest(buddyId, payload);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Travel buddy request responded successfully",
        data: result,
    });
}));
// export travel buddy controller starts here
exports.travelBuddyController = { getTravelBuddies, responsdTravelBuddy };
// export travel buddy controller ends here
