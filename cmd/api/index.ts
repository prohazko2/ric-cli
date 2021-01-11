export const command = "api";
export const description = "Get api information";

export function builder(yargs) {
  return yargs.command(require("./01-info")).command(require("./02-health"));
}
