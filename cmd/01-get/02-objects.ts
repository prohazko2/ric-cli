export const command = "objects";
export const description = "GET /objects";

import * as objects from "../../src/objects";

import table from "../../src/format/table";
import json from "../../src/format/json";

export async function handler(argv) {
  const items = await objects.get();
  if (argv.json) {
    return json(items);
  }
  table(items, ["id"]);
}
