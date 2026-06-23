export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export const CARS_PER_PAGE = 7;
export const WINNERS_PER_PAGE = 10;
export const RANDOM_CARS_BATCH = 100;

export const CAR_NAME_MIN_LENGTH = 1;
export const CAR_NAME_MAX_LENGTH = 25;

export const DEFAULT_CAR_COLOR = '#3b82f6';
export const FALLBACK_CAR_COLOR = '#999999';

export const FIRST_PAGE = 1;
export const MS_PER_SECOND = 1000;
export const TIME_DECIMALS = 2;

export const ENGINE_STATUS = {
  STARTED: 'started',
  STOPPED: 'stopped',
  DRIVE: 'drive',
} as const;

export const CAR_BRANDS = [
  'Tesla',
  'Ford',
  'Chevrolet',
  'BMW',
  'Audi',
  'Toyota',
  'Nissan',
  'Porsche',
  'Lamborghini',
  'Ferrari',
  'Mazda',
  'Honda',
] as const;

export const CAR_MODELS = [
  'Model S',
  'Mustang',
  'Camaro',
  'Roadster',
  'Spider',
  'Charger',
  'Supra',
  'Skyline',
  'Corvette',
  'Huracan',
  'Cyber',
  'Phantom',
] as const;

export const ROUTES = {
  GARAGE: '/garage',
  WINNERS: '/winners',
} as const;
