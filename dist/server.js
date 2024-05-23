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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./app/config/index"));
const db_service_1 = require("./app/db/db.service");
// eslint-disable-next-line no-unused-vars
let server;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        server = app_1.default.listen(index_1.default.port, () => {
            console.log(`Server is running on ${index_1.default.port}`);
        });
        (0, db_service_1.createSuperAdmin)();
    }
    catch (error) {
        console.log(error);
    }
});
main();
