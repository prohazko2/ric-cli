export const command = "get";
export const description = "Get some ric resources";

export function builder(yargs) {
  return yargs
    .command(require("./00-health"))
    .command(require("./01-models"))
    .command(require("./02-objects"));
}
