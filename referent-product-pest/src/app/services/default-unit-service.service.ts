import { Injectable } from '@angular/core';
import { CountUnit, DryUnit, LiquidUnit } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DefaultUnitServiceService {

  constructor() { }


getUnitsByProductType(productType: string): (LiquidUnit | DryUnit | CountUnit)[] {
    switch (productType) {
      case 'Aerosol':
      case 'Liquid':
        return ['Gallon', 'Quart', 'Pint', 'Fluid Ounce', 'Milliliter', 'Tablespoon', 'Teaspoon', 'fl oz'];
      case 'Granular':
      case 'Dust':
        return ['Pound', 'Ounce', 'Gram'];
      case 'Gel':
        // Gels can be measured by volume (liquid-like) or by weight (dry-like, especially in smaller tubes/syringes)
        return ['Fluid Ounce', 'Milliliter', 'Ounce', 'Gram'];
      case 'Solid':
        // Solids can be measured by weight or as individual countable units
        return ['Pound', 'Ounce', 'Gram', 'Count', 'Unit'];
      case 'Bait':
        // Baits are often counted, but can also be weighed (e.g., bulk bait)
        return ['Pound', 'Ounce', 'Count', 'Trap', 'Bait Station', 'Unit'];
      default:
        return [];
    }
  }

}
