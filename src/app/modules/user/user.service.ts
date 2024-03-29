import { prisma } from "../../utlis/prisma.utlis";

export const selectField = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
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
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: selectField,
  });
  return result;
};
export const userServices = {
  getProfile,
  setProfile,
};
