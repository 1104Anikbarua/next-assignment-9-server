import httpStatus from "http-status";
import { handleSendResposne } from "../../utlis/sendResponse.utlis";
import { handleAsyncTryCatch } from "../../utlis/tryCatch.utlis";
import { tripServices } from "./trip.service";
import { IPayload } from "./trip.interface";

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
const createTravel = handleAsyncTryCatch(async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  const result = await tripServices.createTravel(id, payload);
  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Travel created successfully",
    data: result,
  });
});
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
const getTravels = handleAsyncTryCatch(async (req, res) => {
  const getFilteredField = <T, K extends keyof T>(obj: T, keys: K[]) => {
    const payload: Partial<T> = {};

    for (const key of keys) {
      if (obj && obj.hasOwnProperty.call(obj, key)) {
        payload[key] = obj[key];
      }
    }
    return payload;
  };
  const query = req.query as IPayload;
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
  const { meta, result } = await tripServices.getTravels(payload);
  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travels retrieved successfully",
    data: result,
    meta,
  });
});
// get all travels ends here
// get travel by user id start here
const getTravel = handleAsyncTryCatch(async (req, res) => {
  //  extract token value
  const user = req.user;
  const result = await tripServices.getTravel(user);
  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travel retrieved successfully",
    data: result,
  });
});
// get travel by user id ends here
// request a buddy for a trip
// can do one user can request for one time now one user can request multiple time
const requestBuddy = handleAsyncTryCatch(async (req, res) => {
  const { travelId } = req.params;
  const id = req.body?.userId;
  const result = await tripServices.requestBuddy(id, travelId);

  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Travel buddy request sent successfully",
    data: result,
  });
});
// request a buddy for a travel

// get user all requested travel
const getRequestedTravels = handleAsyncTryCatch(async (req, res) => {
  const result = await tripServices.getRequestedTravels(req.user);

  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Requested travel retrieved successfully",
    data: result,
  });
});
// export all service function starts here
export const tripControllers = {
  // createTrip
  // getTrips,
  createTravel,
  getTravels,
  getTravel,
  requestBuddy,
  getRequestedTravels,
};
// export all service function ends here
