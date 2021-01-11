export const command = "api";
export const description = "Raw HTTP Api";

export function builder(yargs) {
  return yargs
    .command(require("./01-get"))
    .command(require("./02-post"))
    .command(require("./03-patch"));
}
