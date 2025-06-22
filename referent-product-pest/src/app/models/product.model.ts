// src/app/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  activeIngredients: string;
  applicationTreatment: string;
  pestsControlled: string[];
}

