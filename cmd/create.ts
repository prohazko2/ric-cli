import { Command } from "commander";

import * as models from "../src/models";

const cmd = new Command("get");

cmd.command("models").action(async (p) => {
  console.log(await models.get());
});

cmd.command("objects").action(async () => {
  console.log(await models.get());
});

export default cmd;
