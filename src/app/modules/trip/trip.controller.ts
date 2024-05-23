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
const requestBuddy = handleAsyncTryCatch(async (req, res) => {
  const { tripId } = req.params;
  const id = req.body?.userId;
  const result = await tripServices.requestBuddy(id, tripId);

  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Travel buddy request sent successfully",
    data: result,
  });
});

// export all service function starts here
export const tripControllers = {
  // createTrip
  // getTrips,
  createTravel,
  getTravels,
  requestBuddy,
};
// export all service function ends here
