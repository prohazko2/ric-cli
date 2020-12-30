import { Command } from "commander";

import * as models from "../src/models";
import * as objects from "../src/objects";

import table from "../src/format/table";

const cmd = new Command("get");

cmd.command("models").action(async (p) => {
  table(await models.get(), ["base"]);
});

cmd.command("objects").action(async () => {
  table(await objects.get(), ["id"]);
});

export default cmd;
