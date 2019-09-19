import { ThingPropertyNormalized } from "../store/things/interfaces";
import pipe from "ramda/es/pipe";

type utilFn = (ops: number[]) => number;

const getValues = (
  input: number = 0,
  { minimum = 0, maximum = 1 }: Partial<ThingPropertyNormalized> = {}
) => [input, maximum - minimum, minimum];

const getPercentage: utilFn = ([input, range, min]) => (input - min) / range;
const getValue: utilFn = ([input, range, min]) => input * range + min;

export const valueToPercentage = pipe(
  getValues,
  getPercentage
);

export const percentageToValue = pipe(
  getValues,
  getValue
);
