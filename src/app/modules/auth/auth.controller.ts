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
const login = async (req: Request, res: Response) => {};
// login user starts here
// export auth controller function starts here
export const authControllers = {
  addUser,
  login,
};
// export auth controller function starts here
