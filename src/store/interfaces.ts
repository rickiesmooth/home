export type ThingProperties = {
  on: boolean;
  level: number;
  colorTemperature: string;
};

export type Thing = {
  id: string;
  title: string;
  href: string;
  properties: ThingProperties;
};

export type State = {
  things: FetchData<Thing[]>;
  properties: {
    [key: string]: FetchData<ThingProperties>;
  };
};

// @TODO move to ./utils/fetch
export type FetchData<T> = { loading: boolean; result?: T; error?: string };

// @TODO move to ./actions
export enum ACTION_TYPES {
  THINGS_FETCH = "THINGS_FETCH",
  PROPERTIES_FETCH = "PROPERTIES_FETCH",
  PROPERTIES_UPDATE = "PROPERTIES_UPDATE"
}

export type Action =
  | {
      type: ACTION_TYPES.THINGS_FETCH;
      data: FetchData<Thing[]>;
    }
  | {
      type: ACTION_TYPES.PROPERTIES_FETCH;
      data: FetchData<ThingProperties>;
      href: string;
    }
  | {
      type: ACTION_TYPES.PROPERTIES_UPDATE;
      data: ThingProperties;
      href: string;
    };

export type EnhancedActions = {
  getThings(): void;
  getThingProperties(id: string): void;
  updateThingProperties(href: string, props: Partial<ThingProperties>): void;
};
