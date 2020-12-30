import { Command } from "commander";

const cmd = new Command("emit");

//cmd.option("--cmd", "Command name/id");
cmd.option("--to", "Object to emit event to");

cmd.action(async (p) => {
  console.log("todo", p.args, p.opts());
});

export default cmd;
