"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// create a instance from prisma client
exports.prisma = new client_1.PrismaClient();
