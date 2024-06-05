import { UserActiveStatus, UserRole } from "@prisma/client";
import { prisma } from "../../utlis/prisma.utlis";
import { AppError } from "../../errorHanler/appError.error";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

export const selectField = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  role: true,
  status: true,
  profilePhoto: true,
};

const getUsers = async (user: JwtPayload) => {
  const { email } = user;
  const result = await prisma.user.findMany({
    where: {
      email: {
        not: email,
      },
    },
    select: selectField,
  });
  return result;
};
// get user profile by token id starts here
const getProfile = async (id: string) => {
  // check is user is exists or not
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: selectField,
  });
  return result;
};
// get user profile by token id ends here
// update user profile
const setProfile = async (
  id: string,
  payload: { email?: string; name?: string },
) => {
  // check is user exists or not
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
      status: UserActiveStatus.ACTIVE,
    },
  });
  // update user profile information
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: selectField,
  });
  return result;
};
// update user profile

// admin set profile
const setStatus = async (
  id: string,
  payload: {
    role: UserRole;
    status: UserActiveStatus;
    email: string;
    name: string;
  },
  user: JwtPayload,
) => {
  // take user role from token
  const { role } = user;

  // check is user exists or not
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: { id },
  });

  // prevent admin to block super admin or create a user super admin
  if (userInfo?.role === UserRole.SUPER_ADMIN) {
    // admin can not create super admin
    if (payload?.role === UserRole.SUPER_ADMIN && role === UserRole.ADMIN) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Admin can not create super admin",
      );
      // admin cannot block super admin
    } else if (payload?.role === UserRole.ADMIN && role === UserRole.ADMIN) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Admin can not create super admin",
      );
      // admin cannot block super admin
    } else if (payload?.role === UserRole.BUDDY && role === UserRole.ADMIN) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Admin can not create super admin",
      );
      // admin cannot block super admin
    } else if (
      payload?.status === UserActiveStatus.BLOCKED &&
      role === UserRole.ADMIN
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Admin can not blocked super admin",
      );
    }
  }
  // prevent admin to make buddy a superadmin
  else if (userInfo.role === UserRole.BUDDY) {
    if (payload.role === UserRole.SUPER_ADMIN && role === UserRole.ADMIN) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Admin can not create super admin",
      );
    }
  }
  // prevent admin to make a admin superadmin
  else if (userInfo.role === UserRole.ADMIN) {
    if (payload.role === UserRole.SUPER_ADMIN && role === UserRole.ADMIN) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Admin can not create super admin",
      );
    }
  }
  // active user or block user edit roles operation
  const result = await prisma.user.update({
    where: { id },
    // data: { role: payload.role, status: payload.status },
    data: payload,
    select: selectField,
  });
  return result;
};
// admin set profile
export const userServices = {
  getProfile,
  setProfile,
  setStatus,
  getUsers,
};
