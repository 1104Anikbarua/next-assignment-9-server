import httpStatus from "http-status";
import { handleSendResposne } from "../../utlis/sendResponse.utlis";
import { handleAsyncTryCatch } from "../../utlis/tryCatch.utlis";
import { travelBuddyServices } from "./travelBuddy.service";

const getTravelBuddies = handleAsyncTryCatch(async (req, res) => {
  // get trip id from params
  const { tripId } = req.params;
  const result = await travelBuddyServices.getTravelBuddies(tripId);
  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Potential travel buddies retrieved successfully",
    data: result,
  });
});

export const travelBuddyController = { getTravelBuddies };
