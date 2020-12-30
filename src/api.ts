import fetch from "node-fetch";

import { resolve } from "url";
import { join } from "path";

let BASE_URL = "https://sandbox.rightech.io/";

export type ApiResponse = {
  success: boolean;
};

function getDefaultHeaders() {
  const defaults = {
    accept: "application/json",
    "content-type": "application/json",
  } as any;

  if (process.env.RIC_TOKEN) {
    defaults.authorization = `Bearer ${process.env.RIC_TOKEN}`;
  }
  return defaults;
}

export async function get<T = ApiResponse>(path: string, query = {}) {
  if (!path.startsWith("api/v1") || !path.startsWith("/api/v1")) {
    path = join("api/v1", path);
  }

  const url = resolve(BASE_URL, path);
  const res = await fetch(url, {
    headers: getDefaultHeaders(),
  });
  return res.json() as Promise<T>;
}

export function info() {
  return get("/");
}

export function health() {
  return get("/healthz");
}
