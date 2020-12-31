import { program } from "commander";

import api from "./cmd/api";
import get from "./cmd/get";

import create from "./cmd/create";
import send from "./cmd/send";
import emit from "./cmd/emit";

import config from "./src/config";

process.on("unhandledRejection", (err) => {
  throw err;
});

program.version(config.getVersion());

program.addCommand(api);
program.addCommand(get);
program.addCommand(create);
program.addCommand(send);
program.addCommand(emit);

program.parse(process.argv);
