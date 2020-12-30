import { Command } from "commander";

import * as models from "../models";
import * as objects from "../objects";

const cmd = new Command("get");

cmd.command("models").action(async (p) => {
  console.log(await models.get());
});

cmd.command("objects").action(async () => {
  console.log(await objects.get());
});

export default cmd;
