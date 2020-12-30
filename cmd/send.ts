import { Command } from "commander";

const cmd = new Command("send");

//cmd.option("--cmd", "Command name/id");
cmd.option("--to", "Object to send command to");

cmd.action(async (p) => {
  console.log("todo", p.args, p.opts());
});

export default cmd;
