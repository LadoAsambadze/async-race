import { CAR_BRANDS, CAR_MODELS } from '../constants';
import type { CarDraft } from '../types';

const HEX_BASE = 16;
const HEX_COLOR_MAX = 0xffffff;
const HEX_LENGTH = 6;

const pickRandom = <T>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];

export const randomColor = (): string => {
  const value = Math.floor(Math.random() * (HEX_COLOR_MAX + 1));
  return `#${value.toString(HEX_BASE).padStart(HEX_LENGTH, '0')}`;
};

export const randomName = (): string => `${pickRandom(CAR_BRANDS)} ${pickRandom(CAR_MODELS)}`;

export const randomCar = (): CarDraft => ({
  name: randomName(),
  color: randomColor(),
});
