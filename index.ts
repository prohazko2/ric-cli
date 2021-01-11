// import { program } from "commander";

// import api from "./cmd/api";
// import get from "./cmd/get";

// import create from "./cmd/create";
// import send from "./cmd/send";
// import emit from "./cmd/emit";

const cli = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 <cmd> [options]") // usage string of application.
  // .command("install", "install a package (name@version)") // describe commands available.
  // .command(
  //   "publish",
  //   "publish the package inside the current working directory"
  // )
  // .option("f", {
  //   // document options.
  //   array: true, // even single values will be wrapped in [].
  //   description: "an array of files",
  //   default: "test.js",
  //   alias: "file",
  // })
  // .alias("f", "fil")
  .option("h", {
    alias: "help",
    description: "display help message",
  })
  .string(["user", "pass"])
  .implies("user", "pass") // if 'user' is set 'pass' must be set.
  .help("help")
  .commandDir("cmd")
  //.demandCommand()
  //.demand("q") // fail if 'q' not provided.
  //.version(config.getVersion(), "version", "display version information") // the version string.
  .version()
  .alias("version", "v")
  .example("ric get models", "install the latest version of npm")
  .example("ric get objects", "install the latest version of npm")
  .example("ric add models mqtt-test --base mqtt")

  .epilog("for more information visit https://github.com/chevex/yargs")
  .completion()
  .showHelpOnFail(true, "whoops, something went wrong! try `ric --help`");

const argv = cli.argv;

if (!argv._.length) {
  cli.showHelp();
}
