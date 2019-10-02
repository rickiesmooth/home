import {
  ThingPropertiesRaw,
  ThingModelProperties,
  ThingModel,
  ThingModelValues,
  ThingRaw
} from "./interfaces";
import API, { GATEWAY_URL } from "../../utils/api";
import { debounce } from "../../utils/throttle";
import { whereEq } from "ramda";

export type FetchData<T> = { loading: boolean; result?: T; error?: string };

function normalizeRawThingProperties(
  rawItem: ThingPropertiesRaw
): Partial<ThingModelProperties> {
  const entries = Object.entries(rawItem);
  const normalized = entries.map(([key, value]) => {
    const { links, ...rest } = value;
    return [
      key,
      {
        ...rest,
        link: value.links[0].href
      }
    ];
  });
  return Object.fromEntries(normalized);
}

export class Thing implements ThingModel {
  id: string;
  title: string;
  href: string;
  properties: Partial<ThingModelProperties>; // <== static properties that relate to values (e.g. minmax)
  values: Partial<ThingModelValues>; // <== dynamic properties (e.g. currentValue)
  closingWs: boolean;
  base: string;
  wsBackoff: number;
  ws?: WebSocket;
  connected: boolean;
  updateCallback: (updatedThing: ThingModel) => void;
  constructor(
    raw: ThingRaw,
    updateCallback: (updatedThing: ThingModel) => void
  ) {
    const normalizedProperties = normalizeRawThingProperties(raw.properties);
    this.title = raw.title;
    this.id = raw.id;
    this.href = raw.href;
    this.properties = normalizedProperties;
    this.base = raw.base;
    this.updateCallback = updateCallback;
    this.wsBackoff = 1000;
    this.closingWs = false;
    this.connected = false;
    // this.eventDescriptions = raw.events @TODO implement
    this.values = {
      on: false,
      level: 0,
      colorTemperature: 0
    };

    this.initWebsocket();
    this.fetchValues();
  }

  fetchValues = async () => {
    const { data } = await API.fetch<ThingModelValues>(
      `${GATEWAY_URL}${this.href}/properties`
    );
    this.onPropertyStatus(data!);
  };

  onPropertyStatus = (value: Partial<ThingModelValues>) => {
    this.values = {
      ...this.values,
      ...value
    };
    this.updateCallback(this);
  };

  debouncedFetch = debounce<[string, Partial<ThingModelValues>]>(
    250,
    ([key, val]) => {
      API.updateProperty(`${GATEWAY_URL}${this.href}/properties/${key}`, {
        [key]: val
      });
    }
  );

  updateThing = (value: Partial<ThingModelValues>) => {
    Object.entries(value).forEach(args => this.debouncedFetch(args));
    this.onPropertyStatus(value);
  };

  private initWebsocket() {
    if (this.closingWs) {
      return;
    }

    if (!this.hasOwnProperty("href")) {
      return;
    }

    const wsHref = new URL(this.href, this.base.replace(/^http/, "ws"));

    this.ws = new WebSocket(`${wsHref}?jwt=${API.jwt}`);

    // After the websocket is open, add subscriptions for all events.
    this.ws.addEventListener(
      "open",
      () => {
        // Reset the backoff period
        this.wsBackoff = 1000;

        // if (Object.keys(this.eventDescriptions).length == 0) {
        //   return;
        // }
        const msg = {
          messageType: "addEventSubscription",
          data: {}
        };
        // for (const name in this.eventDescriptions) {
        //   msg.data[name] = {};
        // }
        this.ws!.send(JSON.stringify(msg));
      },
      { once: true }
    );

    const debouncedPropertyStatusChangedCheck = debounce<
      Partial<ThingModelValues>
    >(1000, message => {
      if (!whereEq(message, this.values)) {
        this.onPropertyStatus(message);
      }
    });

    const onEvent = (event: { data: string }) => {
      const message = JSON.parse(event.data);

      switch (message.messageType) {
        case "propertyStatus":
          debouncedPropertyStatusChangedCheck(message.data);
          break;
        case "event":
          // this.onEvent(message.data);
          break;
        case "connected":
          this.onConnected(message.data);
          break;
        case "error":
          // status 404 means that the Thing already removed.
          if (message.data.status === "404 Not Found") {
            console.log("Successfully removed Thing.");
            cleanup();
          }
          break;
      }
    };

    const cleanup = () => {
      if (!this.ws) return;
      this.ws.removeEventListener("message", onEvent);
      this.ws.removeEventListener("close", cleanup);
      this.ws.removeEventListener("error", cleanup);
      this.ws.close();
      this.ws = undefined;

      setTimeout(() => {
        this.wsBackoff *= 2;
        if (this.wsBackoff > 30000) {
          this.wsBackoff = 30000;
        }
        this.initWebsocket();
      }, this.wsBackoff);
    };

    this.ws.addEventListener("message", onEvent);
    this.ws.addEventListener("close", cleanup);
    this.ws.addEventListener("error", cleanup);
  }

  onConnected(connected: boolean) {
    this.connected = connected;
  }
}
