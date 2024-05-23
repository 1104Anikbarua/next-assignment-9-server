import { UserActiveStatus, UserRole } from "@prisma/client";
import { prisma } from "../../utlis/prisma.utlis";
import { AppError } from "../../errorHanler/appError.error";
import httpStatus from "http-status";

export const selectField = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  role: true,
};
// get user profile by token id starts here
const getProfile = async (id: string) => {
  // console.log(id);
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
  payload: { email: string; name: string },
) => {
  // check is user exists or not
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
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
  },
) => {
  // console.log(payload);
  // check is user exists or not
  await prisma.user.findUniqueOrThrow({ where: { id } });
  if (payload.role === UserRole.SUPER_ADMIN) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "Admin can not create Super Admin",
    );
  }
  // active user or deactive user edit roles operation
  const result = await prisma.user.update({
    where: { id },
    data: { role: payload.role, status: payload.status },
  });
  return result;

  //
};
// admin set profile
export const userServices = {
  getProfile,
  setProfile,
  setStatus,
};
