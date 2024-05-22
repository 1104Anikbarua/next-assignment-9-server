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
// createTrip starts here
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

// createTrip ends here
// get all trips starts here
const getTrips = handleAsyncTryCatch(async (req, res) => {
  const query = req.query as IPayload;
  const result = await tripServices.getTrips(query);
  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Trips retrieved successfully",
    data: result,
  });
});
// get all trips ends here
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
  createTravel,
  getTrips,
  requestBuddy,
};
// export all service function ends here
