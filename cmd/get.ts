import { Command } from "commander";

import * as models from "../src/models";
import * as objects from "../src/objects";

import table from "../src/format/table";
import json from "../src/format/json";

const cmd = new Command("get");

cmd.option("--json", "Raw JSON output");
cmd.option("--wide", "Return more fields");

cmd.command("models").action(async ({ parent }) => {
  const items = await models.get();
  if (parent.json) {
    return json(items);
  }
  table(items, ["base"]);
});

cmd.command("objects").action(async ({ parent }) => {
  const items = await objects.get();
  if (parent.json) {
    return json(items);
  }
  table(items, ["id"]);
});

export default cmd;
