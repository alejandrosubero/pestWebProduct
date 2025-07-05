
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
  productId: string;
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

export type PackageStatus = 'In Stock' | 'In Use' | 'Empty';
export type ProductType = 'Liquid' | 'Solid' | 'Gel' | 'Dust';
