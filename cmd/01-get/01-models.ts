export const command = "models";
export const description = "GET /models";

import * as models from "../../src/models";

import table from "../../src/format/table";
import json from "../../src/format/json";

export async function handler(argv) {
  console.log("GET /models", argv);

  const items = await models.get();
  if (argv.json) {
    return json(items);
  }
  table(items, ["base"]);
}
