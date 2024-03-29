/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "http";
import app from "./app";
import config from "./app/config/index";

// eslint-disable-next-line no-unused-vars
let server: Server;
const main = async () => {
  try {
    server = app.listen(config.port, () => {
      console.log(`Server is running on ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
