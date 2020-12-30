import { get as _get } from "./api";

export function get() {
  return _get("objects");
}
