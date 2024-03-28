import httpStatus from "http-status";
import { handleSendResposne } from "../../utlis/sendResponse.utlis";
import { handleAsyncTryCatch } from "../../utlis/tryCatch.utlis";
import { userServices } from "./user.service";

// update user profile starts here
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
// update user profile ends here

const setStatus = handleAsyncTryCatch(async (req, res) => {
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
// export user controller functions starts here
export const userControllers = {
  getProfile,
  setStatus,
};
