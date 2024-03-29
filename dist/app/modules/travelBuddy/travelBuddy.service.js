"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelBuddyServices = void 0;
const prisma_utlis_1 = require("../../utlis/prisma.utlis");
// get travel buddies start here
const getTravelBuddies = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_utlis_1.prisma.travelBuddy.findFirstOrThrow({ where: { tripId } });
    const result = yield prisma_utlis_1.prisma.travelBuddy.findMany({
        where: { tripId },
        include: { user: { select: { name: true, email: true } } },
    });
    return result;
});
// get travel buddies ends here
// respond to travel buddy starts here
const respondRequest = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   checking is buddy exists or not
    yield prisma_utlis_1.prisma.travelBuddy.findUniqueOrThrow({
        where: {
            id,
        },
    });
    //   if buddy exists update buddy
    const result = yield prisma_utlis_1.prisma.travelBuddy.update({
        where: { id },
        data: payload,
    });
    return result;
});
// respond to travel buddy ends here
// export travel buddy service functions start here
exports.travelBuddyServices = {
    getTravelBuddies,
    respondRequest,
};
// export travel buddy service functions ends here
