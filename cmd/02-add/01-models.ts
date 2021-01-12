export const command = "models";
export const description = "POST /models";

import * as models from "../../src/models";

import table from "../../src/format/table";
import json from "../../src/format/json";

export const builder = {
  base: {
    default: "mqtt",
    describe: 'Base model',
  }
};

export async function handler(argv) {
  console.log("POST /models", argv);

  const items = await models.get();
  if (argv.json) {
    return json(items);
  }
  table(items, ["base"]);
}
