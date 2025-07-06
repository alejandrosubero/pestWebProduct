// 📦 PackageStatus
export const PACKAGE_STATUS = [
  'In Stock',
  'In Use',
  'Empty',
  'Almost Empty',
] as const;


export type PackageStatus = (typeof PACKAGE_STATUS)[number];

// 📏 AreaUnit
export const AREA_UNITS = [
  'Acre',
  'Square Foot',
  'Linear Foot',
  'Cubic Foot',
] as const;
export type AreaUnit = (typeof AREA_UNITS)[number];

// 🧪 ConcentrationUnit
export const CONCENTRATION_UNITS = [
  'Percent',
  'Parts Per Million',
] as const;
export type ConcentrationUnit = (typeof CONCENTRATION_UNITS)[number];

// 📉 RateUnit
export const RATE_UNITS = [
  'Gallons Per Acre',
  'Pounds Per Acre',
] as const;
export type RateUnit = (typeof RATE_UNITS)[number];

// 🔬 ProductType
export const PRODUCT_TYPES = [
  'Liquid',
  'Granular',
  'Dust',
  'Gel',
  'Bait',
  'Aerosol',
  'Solid',
] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];

// 💧 LiquidUnit
export const LIQUID_UNITS = [
  'Gallon',
  'Quart',
  'Pint',
  'Fluid Ounce',
  'Milliliter',
  'Tablespoon',
  'Teaspoon',
  'fl oz',
] as const;
export type LiquidUnit = (typeof LIQUID_UNITS)[number];

// 🧂 DryUnit
export const DRY_UNITS = [
  'Pound',
  'Ounce',
  'Gram',
] as const;
export type DryUnit = (typeof DRY_UNITS)[number];

// 🔢 CountUnit
export const COUNT_UNITS = [
  'Count',
  'Trap',
  'Bait Station',
  'Unit',
] as const;
export type CountUnit = (typeof COUNT_UNITS)[number];
