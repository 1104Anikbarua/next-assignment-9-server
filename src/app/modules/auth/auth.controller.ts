import { authServices } from "./auth.service";
import httpStatus from "http-status";
import { handleSendResposne } from "../../utlis/sendResponse.utlis";
import { handleAsyncTryCatch } from "../../utlis/tryCatch.utlis";
import config from "../../config";

// create user starts here
const addUser = handleAsyncTryCatch(async (req, res) => {
  const payload = req.body;

  const { accessToken, refreshToken, ...rest } =
    await authServices.addUser(payload);
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  handleSendResposne(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: { accessToken, rest },
  });
});
// create user ends here
// login user starts here
const login = handleAsyncTryCatch(async (req, res) => {
  const payload = req.body;
  const { accessToken, refreshToken, ...rest } =
    await authServices.logIn(payload);
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });
  //
  handleSendResposne(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: { accessToken, rest },
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
// change password ends here
// create admin start here
const createAdmin = handleAsyncTryCatch(async (req, res) => {
  const payload = req.body;
  const result = await authServices.createAdmin(payload);
  handleSendResposne(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});
// create admin ends here
// generate access token using refresh token starts here
const getRefreshToken = handleAsyncTryCatch(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.getAccessToken(refreshToken);
  handleSendResposne(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token generated successfully",
    data: result,
  });
});
// generate access token using refresh token ends here

// export auth controller function starts here
export const authControllers = {
  addUser,
  login,
  changePassword,
  createAdmin,
  getRefreshToken,
};
// export auth controller function starts here
