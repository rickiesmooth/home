import { ThingPropertyNormalized } from "../store/interfaces";
import pipe from "ramda/es/pipe";

type utilFn = (ops: number[]) => number;

const getArgs = (
  input: number = 0,
  { minimum = 0, maximum = 100 }: Partial<ThingPropertyNormalized> = {}
) => [input - minimum, maximum - minimum];

const getPercentage: utilFn = ([offset, range]) => offset / range;
const getValue: utilFn = ([offset, range]) => offset * range;

export const percentage = pipe(
  getArgs,
  getPercentage
);

export const value = pipe(
  getArgs,
  getValue
);
