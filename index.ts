import { program } from "commander";

import api from "./src/cmds/api";

program.version("1.0.0");

program.option("--json", "Raw JSON output");

program.addCommand(api);

program.parse(process.argv);
