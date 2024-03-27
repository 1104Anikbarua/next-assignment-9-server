import httpStatus from "http-status";
import { handleSendResposne } from "../../utlis/sendResponse.utlis";
import { handleAsyncTryCatch } from "../../utlis/tryCatch.utlis";
import { tripServices } from "./trip.service";

// createTrip starts here
const createTrip = handleAsyncTryCatch(async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  const result = await tripServices.createTrip(id, payload);
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
