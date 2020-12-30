import { Command } from "commander";


const cmd = new Command("create");

cmd.command("model").action(async (p) => {
  console.log("todo");
});

cmd.command("object").action(async () => {
  console.log("todo");
});

export default cmd;
