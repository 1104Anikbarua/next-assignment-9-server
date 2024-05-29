import httpStatus from "http-status";
import { handleSendResposne } from "../../utlis/sendResponse.utlis";
import { handleAsyncTryCatch } from "../../utlis/tryCatch.utlis";
import { userServices } from "./user.service";
// get user profile start here
const getProfile = handleAsyncTryCatch(async (req, res) => {
  const { id } = req.user;
  const result = await userServices.getProfile(id);
  handleSendResposne(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});
// get user profile end here
// update user profile starts here
const setProfile = handleAsyncTryCatch(async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  const result = await userServices.setProfile(id, payload);
  handleSendResposne(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});
// update user profile ends here
// set status start here
const setStatus = handleAsyncTryCatch(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await userServices.setStatus(id, payload, req.user);
  handleSendResposne(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});
// set status ends here
// export user controller functions starts here
export const userControllers = {
  getProfile,
  setProfile,
  setStatus,
};
