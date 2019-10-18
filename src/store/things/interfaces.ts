export interface ThingsContextInterface {
  state: State;
  actions: ThingsActions;
}

export type ThingRaw = {
  ["@context"]: string;
  ["@type"]: string[];
  actions: {};
  base: string;
  description: string;
  iconHref: string | null;
  id: string;
  layoutIndex: number;
  links: ThingLinksRaw[];
  properties: ThingPropertiesRaw;
  selectedCapability: string;
  title: string;
  type: string;
  href: string;
};

type ThingPropertyRaw = {
  links: ThingLinksRaw[];
  maximum: number;
  minimum: number;
  title: string;
  unit: string;
  ["@type"]: string;
};

export type ThingPropertiesRaw = {
  on: ThingPropertyRaw;
  level: ThingPropertyRaw;
  colorTemperature: ThingPropertyRaw;
};

type ThingLinksRaw = {
  rel: string;
  href: string;
};

export type ThingPropertyNormalized = {
  link: string;
  title: string;
  minimum: number;
  maximum: number;
  ["@type"]: string;
};

export type ThingModelProperties = {
  on: ThingPropertyNormalized;
  colorTemperature: ThingPropertyNormalized;
  level: ThingPropertyNormalized;
};

export type ThingModelValues = {
  on: boolean;
  colorTemperature: number;
  level: number;
};

// export thies!
export interface ThingModel {
  id: string;
  title: string;
  href: string;
  values: Partial<ThingModelValues>; // <== dynamic properties (e.g. currentValue)
  properties: Partial<ThingModelProperties>; // <== static properties that relate to values (e.g. minmax)
  closingWs: boolean;
  ws?: WebSocket;
  base: string;
  wsBackoff: number;
  connected: boolean;
  fetchValues(): void;
  updateThing(val: Partial<ThingModelValues>): void;
  updateCallback(thing: ThingModel): void;
}

export type State = {
  things: ThingModel[];
  loading: boolean;
  error: string | null;
};

// @TODO move to ./actions
export enum ACTION_TYPES {
  THINGS_INIT = "INIT_THINGS",
  THINGS_FETCH = "THINGS_FETCH",
  PROPERTIES_FETCH = "PROPERTIES_FETCH",
  PROPERTIES_UPDATE = "PROPERTIES_UPDATE",
  USER_LOGIN = "USER_LOGIN"
}

export type Action =
  | {
      type: ACTION_TYPES.THINGS_INIT;
      data: {
        things?: ThingModel[];
        error?: string;
      };
    }
  | {
      type: ACTION_TYPES.PROPERTIES_UPDATE;
      data: ThingModel;
    }
  | {
      type: ACTION_TYPES.USER_LOGIN;
      data: boolean;
    };

export type ThingsActions = {
  login(data: boolean): void;
  initThings(): void;
  updateThing(thing: ThingModel, values: Partial<ThingModelValues>): void;
};
