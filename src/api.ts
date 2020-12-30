import fetch from "node-fetch";

import { resolve } from "url";
import { join } from "path";

import { unique } from "./util";

import config from "./config";

export type ApiResponse = {
  success: boolean;
};

export type ItemId = string;
export interface BaseItem extends ApiResponse {
  _id?: ItemId;

  name?: string;
  description?: string;

  owner?: ItemId;
  group?: ItemId;

  time?: number;
  _at?: number;
}

export class ApiError extends Error {
  jti: any = "";
  url: string = "";
  tags: string[] = [];
  code = 500;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
    this.trySetId();
  }

  trySetId() {
    const [, b64] = (getToken() || "").split(".");
    if (b64) {
      try {
        const payload = Buffer.from(b64, "base64").toString();
        this.jti = JSON.parse(payload).jti || "";
      } catch (err) {}
    }
  }

  withTags(tags: string[] = []) {
    this.tags = unique([...this.tags, ...(tags || [])]);
    return this;
  }

  withCode(code: number) {
    this.code = +code;
    return this;
  }

  withUrl(url: string) {
    this.url = url;
    return this;
  }
}

function getToken() {
  return config.getContext().token;
}

function getDefaultHeaders() {
  const defaults = {
    accept: "application/json",
    "content-type": "application/json",
    "user-agent": `ric-cli:node ${config.getVersion()}`,
  } as any;

  const token = getToken();
  if (token) {
    defaults.authorization = `Bearer ${token}`;
  }
  return defaults;
}

export async function get<T = ApiResponse>(path: string, query = {}) {
  if (!path.startsWith("api/v1") || !path.startsWith("/api/v1")) {
    path = join("api/v1", path);
  }

  const url = resolve(config.getContext().url, path);
  const res = await fetch(url, {
    headers: getDefaultHeaders(),
  });
  const json = (await res.json()) as any;

  if (res.status >= 400) {
    throw new ApiError(json.message)
      .withUrl(url)
      .withCode(json.code)
      .withTags(json.tags);
  }

  return json as T;
}

export function info() {
  return get("/");
}

export function health() {
  return get("/healthz");
}
