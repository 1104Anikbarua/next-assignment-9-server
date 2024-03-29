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
exports.getPaginationInfo = void 0;
const getPaginationInfo = (...info) => __awaiter(void 0, void 0, void 0, function* () {
    const [page, limit, sortBy, sortOrder] = info;
    const pages = Number(page) || 1;
    // how many data to take
    const limits = Number(limit) || 10;
    // how many page to skip
    const skip = (pages - 1) * limits;
    // how to show the data(by default sortby=budget and sortorder=desc )
    const orderBy = {
        [sortBy ? sortBy : "budget"]: sortOrder ? sortOrder : "desc",
    };
    return { pages, limits, skip, orderBy };
});
exports.getPaginationInfo = getPaginationInfo;
