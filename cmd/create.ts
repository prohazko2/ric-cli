import { Command } from "commander";

const cmd = new Command("create").storeOptionsAsProperties(false);

cmd
  .command("model")
  .arguments("<base> <name>")
  .option("-b,--base <base>", " xxx base")
  .option("-n,--name <name>", " xxx name")
  .action(async (p) => {
    console.log("todo");
  });

cmd.command("object").action(async () => {
  console.log("todo");
});

export default cmd;
