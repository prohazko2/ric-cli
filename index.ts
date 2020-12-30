import { program } from "commander";

import api from "./src/cmds/api";
import get from "./src/cmds/get";

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

program.version("1.0.0");

program.option("--json", "Raw JSON output");

program.addCommand(api);
program.addCommand(get);

program.parse(process.argv);
