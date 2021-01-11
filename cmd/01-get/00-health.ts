export const command = "health";
export const description = "GET /healthz - check api avalability";

import * as api from "../../src/api";

import config from "../../src/config";

import table from "../../src/format/table";
import json from "../../src/format/json";

import colors from "colors/safe";

export async function handler(argv) {
  const health = await api.health();
  if (argv.json) {
    return console.log(JSON.stringify(health, null, 2));
  }

  health.success
    ? console.log(colors.green("●"), `${config.getContext().url} - healthy`)
    : console.log(colors.red("●"), `${config.getContext().url} - not healthy`);
}
