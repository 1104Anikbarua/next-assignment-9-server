import httpStatus from "http-status";
import { handleSendResposne } from "../../utlis/sendResponse.utlis";
import { handleAsyncTryCatch } from "../../utlis/tryCatch.utlis";
import { travelBuddyServices } from "./travelBuddy.service";

// get travel buddies starts here
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
// get travel buddies ends here

const responsdTravelBuddy = handleAsyncTryCatch(async (req, res) => {
  const { buddyId } = req.params;
  const payload = req.body;

  const result = await travelBuddyServices.respondRequest(buddyId, payload);
  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travel buddy request responded successfully",
    data: result,
  });
});
// export travel buddy controller starts here
export const travelBuddyController = { getTravelBuddies, responsdTravelBuddy };
// export travel buddy controller ends here
