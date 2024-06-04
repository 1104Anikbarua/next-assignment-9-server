import bcrypt from "bcrypt";
import config from "../../config";
import { User, UserActiveStatus, UserRole } from "@prisma/client";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import { AppError } from "../../errorHanler/appError.error";
import { prisma } from "../../utlis/prisma.utlis";
import { selectField } from "../user/user.service";

// create user starts here
const addUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profile: {
    bio: string;
    age: number;
  };
}): Promise<Partial<User & { accessToken: string; refreshToken: string }>> => {
  payload.role = UserRole.BUDDY;
  // generate salt rounds
  const saltRounds = await bcrypt.genSalt(Number(config?.salt));

  // hash password
  payload.password = await bcrypt.hash(payload?.password, saltRounds);

  const { id, name, email, role, createdAt, profilePhoto, status, updatedAt } =
    await prisma.user.create({
      data: payload,
      select: selectField,
    });
  // return result;
  const jwtPayload = { id, name, email, role };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as Secret, {
    expiresIn: config.jwt_access_expires_in,
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as Secret,
    { expiresIn: config.jwt_refresh_expires_in },
  );

  return {
    id,
    name,
    email,
    role,
    createdAt,
    profilePhoto,
    status,
    updatedAt,
    accessToken,
    refreshToken,
  };
};
// create user ends here

// login user stars here
const logIn = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  // check is user exists in database
  const isUserExists = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  // if exists comparse password
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExists.password,
  );
  // if password not matched throw custom app error
  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Please check your email and password",
    );
  }
  const { name, id, role } = isUserExists;
  const jwtPayload = { id, name, email, role };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as Secret, {
    expiresIn: config.jwt_access_expires_in,
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as Secret,
    { expiresIn: config.jwt_refresh_expires_in },
  );

  return { id, name, email, accessToken, refreshToken };
};
// login user ends here
// change password start here
const changePassword = async (
  decodedUser: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  // destructure currentPassword and new password from payload
  const { currentPassword, newPassword } = payload;
  const { id } = decodedUser;
  const { password } = await prisma.user.findUniqueOrThrow({
    where: { id }, //if with email we get unique error when try to update user email then we have to set id as unique
  });
  // check if password matched
  const isPasswordMatched = await bcrypt.compare(currentPassword, password);
  // if password not matched
  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Please check your email or password",
    );
  }
  // if password match then hash new password
  const hashPassword = await bcrypt.hash(newPassword, Number(config.salt));
  const result = await prisma.user.update({
    where: { id },
    data: { password: hashPassword },
    select: selectField,
  });
  return result;
};
// change password ends here

// View and Manage User Accounts: Activate/deactivate accounts, edit roles.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createAdmin = async (payload: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) => {
  payload.role = UserRole.ADMIN;
  // generate salt
  const saltRounds = await bcrypt.genSalt(Number(config.salt));
  // hash password
  payload.password = await bcrypt.hash(payload.password, saltRounds);

  const result = await prisma.user.create({
    data: payload,
    select: selectField,
  });
  return result;
};
//
// generate acccess token
const getAccessToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;
  const { status, role } = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  if (status === UserActiveStatus.BLOCKED) {
    throw new AppError(httpStatus.NOT_FOUND, `User is ${status}`);
  }

  const jwtPayload = {
    email,
    role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as Secret, {
    expiresIn: config.jwt_access_expires_in,
  });

  return accessToken;
};
// ||
// ||
// export auth service functions starts here
export const authServices = {
  addUser,
  logIn,
  changePassword,
  createAdmin,
  getAccessToken,
};
// export auth service functions ends here
