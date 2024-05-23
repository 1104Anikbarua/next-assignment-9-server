import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../utlis/prisma.utlis";
import config from "../config";

const superAdmin = {
  name: "anik barua",
  email: "superadmin@gmail.com",
  password: "123456",
};

export const createSuperAdmin = async () => {
  //hash the plain text password
  try {
    // generate salt
    const saltRounds = await bcrypt.genSalt(Number(config.salt));
    const hashPassword = await bcrypt.hash(superAdmin.password, saltRounds);
    //   find already super admin exists or not
    const isSuperAdminExists = await prisma.user.findUnique({
      where: {
        email: superAdmin.email,
      },
    });

    if (!isSuperAdminExists) {
      await prisma.user.create({
        data: {
          name: superAdmin.name,
          email: superAdmin.email,
          password: hashPassword,
          role: UserRole.SUPER_ADMIN,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
