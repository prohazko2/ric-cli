import { get as _get, BaseItem } from "./api";

export interface ModelNode {
  id: string;
  name: string;
  type: "subsystem" | "argument" | "action" | "event";
  active: boolean;

  children?: ModelNode[];
  description?: string;

  /* this.type === 'argument */
  dataType?: string;
  unit?: string;

  /* this.type === 'action */
  service?: string;
  command?: string;
  params?: object;
}

export interface Model extends BaseItem {
  base?: string;
  props?: object;

  data?: ModelNode;
}

export function get() {
  return _get<Model[]>("models");
}
