export const command = "health";
export const description = "GET /healthz - check api avalability";

import * as api from "../../src/api";

export async function handler(argv) {
  console.log(await api.health());
}
