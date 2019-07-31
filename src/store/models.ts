import {
  ThingPropertiesRaw,
  ThingModelProperties,
  ThingModel,
  ThingModelValues,
  ThingRaw
} from "./interfaces";
import { doFetch } from "../utils/useFetch";

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
  constructor(raw: ThingRaw) {
    const normalizedProperties = normalizeRawThingProperties(raw.properties);
    this.title = raw.title;
    this.id = raw.id;
    this.href = raw.href;
    this.properties = normalizedProperties;
    this.values = {
      on: false,
      level: 0,
      colorTemperature: 0
    };
  }

  fetchValues = () => doFetch<ThingModelValues>(`${this.href}/properties`);

  // UPDATE VALUE
  updateValue = (value: Partial<ThingModelValues>) => {
    Object.entries(value).forEach(([key, val]) => {
      doFetch<ThingModelValues>(`${this.href}/properties/${key}`, {
        method: "PUT",
        body: JSON.stringify({
          [key]: val
        })
      });
    });
  };
}
