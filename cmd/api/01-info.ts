export const command = "info";
export const description = "GET / - get api version";

import * as api from "../../src/api";

export async function handler(argv) {
  console.log(await api.info());
}
