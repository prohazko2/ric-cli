import { get as _get, ItemId, BaseItem } from "./api";

type StateValue = number | boolean | string;

type State = {
  [argumentId: string]: StateValue;
};

export interface RicObject<TState = State, TConfig = any> extends BaseItem {
  /** 
    @highlight
    @validate required, unique, deviceid
  */
  id: string;

  /** 
    @highlight
    @validate required
  */
  model: ItemId;

  /** 
    @readonly
  */
  active: boolean;

  status?: string;
  type?: string;

  state?: TState;
  processedState?: TState;

  config?: TConfig;

  botEnabled?: boolean;
  bot?: {
    state: string;
  };
}

export function get() {
  return _get<RicObject[]>("objects");
}
