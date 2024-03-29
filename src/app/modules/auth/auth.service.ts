import bcrypt from "bcrypt";
import config from "../../config";
import { User } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import { AppError } from "../../errorHanler/appError.error";
import { prisma } from "../../utlis/prisma.utlis";
import { selectField } from "../user/user.service";

// create user starts here
const addUser = async (payload: {
  name: string;
  email: string;
  password: string;
  profile: {
    bio: string;
    age: number;
  };
}): Promise<Partial<User>> => {
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
      select: selectField,
    });
    //create profile
    const userProfile = { userId: createUser.id, ...profile };
    await prismaConstructor.userProfile.create({
      data: userProfile,
    });
    return createUser;
  });
  return result;
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
      httpStatus.FORBIDDEN,
      "Please check your email and password",
    );
  }
  const { name, id } = isUserExists;
  const jwtPayload = { id, name, email };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as Secret, {
    expiresIn: config.jwt_expires_in,
  });

  return { id, name, email, token };
};
// login user ends here
// ||
// ||
// export auth service functions starts here
export const authServices = {
  addUser,
  logIn,
};
// export auth service functions ends here
