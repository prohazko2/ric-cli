import { only } from "../util";

const base = ["_id", "name"];

export default function <T>(items: T | T[], fields: string[] = []) {
  items = Array.isArray(items) ? items : [items];
  fields = [...base, ...fields];

  console.table(items.map((x) => only(x, fields)));
}
