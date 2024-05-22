import { authServices } from "./auth.service";
import httpStatus from "http-status";
import { handleSendResposne } from "../../utlis/sendResponse.utlis";
import { handleAsyncTryCatch } from "../../utlis/tryCatch.utlis";

// create user starts here
const addUser = handleAsyncTryCatch(async (req, res) => {
  const payload = req.body;

  const result = await authServices.addUser(payload);

  handleSendResposne(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
// create user ends here
// login user starts here
const login = handleAsyncTryCatch(async (req, res) => {
  const payload = req.body;
  const result = await authServices.logIn(payload);

  //
  handleSendResposne(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});
// login user ends here
// change password start here
const changePassword = handleAsyncTryCatch(async (req, res) => {
  const payload = req.body;
  const result = await authServices.changePassword(req.user, payload);
  handleSendResposne(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});
// export auth controller function starts here
export const authControllers = {
  addUser,
  login,
  changePassword,
};
// export auth controller function starts here
