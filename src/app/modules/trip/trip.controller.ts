import httpStatus from "http-status";
import { handleSendResposne } from "../../utlis/sendResponse.utlis";
import { handleAsyncTryCatch } from "../../utlis/tryCatch.utlis";
import { tripServices } from "./trip.service";

// createTrip starts here
const createTrip = handleAsyncTryCatch(async (req, res) => {
  const payload = req.body;
  const result = await tripServices.createTrip(payload);
  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Trip created successfully",
    data: result,
  });
});

// createTrip ends here
export const tripControllers = {
  createTrip,
};
