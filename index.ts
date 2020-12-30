import { program } from "commander";
import dotenv from "dotenv";

import api from "./src/cmds/api";
import get from "./src/cmds/get";

dotenv.config();

program.version("1.0.0");

program.option("--json", "Raw JSON output");

program.addCommand(api);
program.addCommand(get);

program.parse(process.argv);
