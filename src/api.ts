import { resolve, parse } from "url";
import { join } from "path";

import http from "http";
import https from "https";

import { unique } from "./util";

import config from "./config";

export type ItemId = string;

export interface ApiResponse {
  success: boolean;
}

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
  jti: string = "";
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
    this.trySetTokenId();
  }

  trySetTokenId() {
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

export class NginxError extends ApiError {
  title: any = "";

  withTitle(title = "") {
    this.title = title;
    return this;
  }

  static fromHtml(resp = "", statusCode = 500) {
    let [, title = "Unknown nginx errror"] =
      /<title>(.*?)<\/title>/gi.exec(resp) || [];
    title = title.replace(statusCode.toString(), "").trim();

    return new NginxError(http.STATUS_CODES[statusCode])
      .withCode(statusCode)
      .withTitle(title);
  }
}

export function req<T, U = unknown>(
  url: string,
  opts: http.RequestOptions = {},
  data: U = null
) {
  const { protocol, hostname, port, path } = parse(url);
  const proto = protocol === "https:" ? https : http;

  opts = {
    method: "GET",
    host: hostname,
    port: +port,
    path,
    ...opts,
  };

  if (!port) {
    opts.port = protocol === "https:" ? 443 : 80;
  }

  return new Promise<T>((resolve, reject) => {
    const req = proto.request(opts, (res) => {
      let resp = "";
      res.on("data", (chunk) => (resp += chunk.toString()));
      res.on("end", () => {
        try {
          /*
           * most nginx upstream errors should be handled by ingress default-backend
           * but who knows ...
           */
          if (resp.startsWith("<html>") && resp.includes("nginx")) {
            return reject(
              NginxError.fromHtml(resp, res.statusCode).withUrl(url)
            );
          }

          const json = JSON.parse(resp);
          if (res.statusCode >= 400) {
            return reject(
              new ApiError(json.message)
                .withCode(res.statusCode)
                .withTags(json.tags)
                .withUrl(url)
            );
          }
          resolve(json);
        } catch (err) {
          console.log(resp);
          reject(err);
        }
      });
    });
    req.on("error", (err) => reject(err));

    if (data) {
      let send = data as any;
      if (typeof data === "object") {
        send = JSON.stringify(data);
      }
      req.write(send);
    }
    req.end();
  });
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

export function get<T = ApiResponse>(path: string, query = {}) {
  if (!path.startsWith("api/v1") || !path.startsWith("/api/v1")) {
    path = join("api/v1", path);
  }
  const url = resolve(config.getContext().url, path);
  return req<T>(url, { method: "GET", headers: getDefaultHeaders() });
}

export function info() {
  return get("/");
}

export function health() {
  return get("/healthz");
}
