export const command = "add";
export const description = "create some ric resources";

export const aliases = ["create"];

export function builder(yargs) {
  return yargs.command(require("./01-models"));
  //.command(require("./02-objects"));
}
