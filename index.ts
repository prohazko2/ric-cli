import { program } from "commander";

import api from "./cmd/api";
import get from "./cmd/get";

import config from "./src/config";

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

program.version(config.getVersion());

program.option("--json", "Raw JSON output");

program.addCommand(api);
program.addCommand(get);

program.parse(process.argv);
