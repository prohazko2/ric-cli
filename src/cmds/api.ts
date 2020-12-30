import { Command } from "commander";
import * as api from "../api";

const cmd = new Command("api");

cmd.command("health").action(async (p) => {
  console.log(await api.health());
});

cmd.command("info").action(async () => {
  console.log(await api.info());
});

export default cmd;
