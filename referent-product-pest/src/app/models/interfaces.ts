
// src/app/models/interfaces.ts
export interface IProduct {
  id?: number;
  name: string;
  type: ProductType;
  description?: string;
  safetyDataSheetUrl?: string;
  package: IPackage;
}

export interface IPackage {
  id?: string;
  productId: string | undefined;
  locationId: string;
  initialQuantity: number;
  currentQuantity: number;
  unitOfMeasure: string;
  status: PackageStatus;
  batchNumber?: string;
  openedDate?: string;
  expirationDate?: string;
  location: Location;
}

export interface Location {
  locationName: string;
  locationArea: string;
  locationSeccion: string;
}

export interface IUsageRecord {
  id?: string;
  productName: string;
  packageId: string;
  productId: string;
  quantityUsed: number;
  unitOfMeasure: string;
  usageDate: string;
  notes?: string;
}

export interface Formulation {
  id: number;
  title: string;
  content: string;
}

export interface Product {
  id: number;
  name: string;
  activeIngredients: string;
  applicationTreatment: string;
  pestsControlled: string[];
}


export interface Notification {
  message: string;
  type: 'warning' | 'info';
}


export interface PackageSummary {
  inUse: number;
  inStock: number;
  empty: number;
}


export type PackageStatus = 'In Stock' | 'In Use' | 'Empty' | 'Almost Empty';

export type AreaUnit = 'Acre' | 'Square Foot' | 'Linear Foot' | 'Cubic Foot';

export type ConcentrationUnit = 'Percent' | 'Parts Per Million';

export type RateUnit = 'Gallons Per Acre' | 'Pounds Per Acre';

export type ProductType = 'Liquid' | 'Granular' | 'Dust' | 'Gel' | 'Bait' | 'Aerosol' | 'Solid';

// Aerosol/Liquid/Gel
export type LiquidUnit = 'Gallon' | 'Quart' | 'Pint' | 'Fluid Ounce' | 'Milliliter' | 'Tablespoon' | 'Teaspoon' | 'fl oz';

// Granular/Dust/Gel/Solid
export type DryUnit = 'Pound' | 'Ounce' | 'Gram';

// Bait/Solid/others (assuming 'others' implies general countable items)
export type CountUnit = 'Count' | 'Trap' | 'Bait Station' | 'Unit';












