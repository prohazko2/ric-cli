import os from "os";
import fs from "fs";

import yaml from "yaml";

import { version } from "../package.json";

let currentContext: Context = {
  name: "anon",
  url: "https://sandbox.rightech.io/",
  token: null,
};

export interface Context {
  name: string;
  url: string;
  token: string;
}

export interface ConfigFile {
  version: 1;
  context: string;
  contexts: Context[];
}

function reloadConfig() {
  const content = fs
    .readFileSync(`${os.homedir()}/.ric/config.yaml`)
    .toString();
  const config = yaml.parse(content) as ConfigFile;

  currentContext = config.contexts.find((x) => x.name === config.context);
}

export function getVersion() {
  return version;
}

export function getContext() {
  return currentContext;
}

try {
  reloadConfig();
} catch (err) {}

export default {
  getVersion,
  getContext,
};
