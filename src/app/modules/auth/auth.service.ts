import bcrypt from "bcrypt";
import config from "../../config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//
// create user starts here
const addUser = async (payload: {
  name: string;
  email: string;
  password: string;
  profile: {
    bio: string;
    age: number;
  };
}) => {
  const { profile, ...user } = payload;

  // generate salt rounds
  const saltRounds = await bcrypt.genSalt(Number(config.salt));

  // hash password
  user.password = await bcrypt.hash(user.password, saltRounds);

  // gather userinfo in a single variable
  const userInfo = { ...user };

  const result = await prisma.$transaction(async (prismaConstructor) => {
    //create user
    const createUser = await prismaConstructor.user.create({
      data: userInfo,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    //create profile
    const userProfile = { userId: createUser.id, ...profile };
    const createProfile = await prismaConstructor.userProfile.create({
      data: userProfile,
    });
    return createUser;
  });
  return result;
};
// create user ends here

// login user stars here
const logIn = async () => {};
// login user ends here
// ||
// ||
// export auth service functions starts here
export const authServices = {
  addUser,
  logIn,
};
// export auth service functions ends here
