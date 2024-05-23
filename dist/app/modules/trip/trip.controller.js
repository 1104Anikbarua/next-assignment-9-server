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
// // createTrip starts here
// const createTrip = handleAsyncTryCatch(async (req, res) => {
//   const { id } = req.user;
//   const payload = req.body;
//   const result = await tripServices.createTrip(id, payload);
//   handleSendResposne(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "Trip created successfully",
//     data: result,
//   });
// });
// createTrip ends here
// create travel start here
const createTravel = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const payload = req.body;
    const result = yield trip_service_1.tripServices.createTravel(id, payload);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Travel created successfully",
        data: result,
    });
}));
// create travel ends here
// get all trips starts here
// const getTrips = handleAsyncTryCatch(async (req, res) => {
//   const query = req.query as IPayload;
//   const result = await tripServices.getTrips(query);
//   handleSendResposne(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Trips retrieved successfully",
//     data: result,
//   });
// });
// get all trips ends here
// get all travels starts here
const getTravels = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getFilteredField = (obj, keys) => {
        const payload = {};
        for (const key of keys) {
            if (obj && obj.hasOwnProperty.call(obj, key)) {
                payload[key] = obj[key];
            }
        }
        return payload;
    };
    const query = req.query;
    const payload = getFilteredField(query, [
        "destination",
        "startDate",
        "endDate",
        "budget",
        "searchTerm",
        "page",
        "limit",
        "sortBy",
        "sortOrder",
        "minBudget",
        "maxBudget",
        "travelType",
        "description",
    ]);
    const { meta, result } = yield trip_service_1.tripServices.getTravels(payload);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Travels retrieved successfully",
        data: result,
        meta,
    });
}));
// get all travels ends here
// get travel by user id start here
const getTravel = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  extract token value
    const user = req.user;
    const result = yield trip_service_1.tripServices.getTravel(user);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Travel retrieved successfully",
        data: result,
    });
}));
// get travel by user id ends here
// request a buddy for a trip
// can do one user can request for one time now one user can request multiple time
const requestBuddy = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { travelId } = req.params;
    const id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield trip_service_1.tripServices.requestBuddy(id, travelId);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Travel buddy request sent successfully",
        data: result,
    });
}));
// request a buddy for a travel
// get user all requested travel
const getRequestedTravels = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trip_service_1.tripServices.getRequestedTravels(req.user);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Requested travel retrieved successfully",
        data: result,
    });
}));
// get all requested travel
// set travel start here
const setTravel = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { travelId } = req.params;
    const paylaod = req.body;
    const result = yield trip_service_1.tripServices.setTravel(travelId, paylaod);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Travel updated successfully",
        data: result,
    });
}));
// set travel ends here
// remove travel start here
const removeTravel = (0, tryCatch_utlis_1.handleAsyncTryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { travelId } = req.params;
    const result = yield trip_service_1.tripServices.removeTravel(travelId);
    (0, sendResponse_utlis_1.handleSendResposne)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Travel removed successfully",
        data: result,
    });
}));
// remove travel ends here
// export all service function starts here
exports.tripControllers = {
    // createTrip
    // getTrips,
    createTravel,
    getTravels,
    getTravel,
    requestBuddy,
    getRequestedTravels,
    setTravel,
    removeTravel,
};
// export all service function ends here
