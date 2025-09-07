// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { NavConfig } from '../../../models/navElemet.model';
// import { NavService } from '../../../services/nav.service';

// type UnitType =
//   | 'Weight'
//   | 'Volume'
//   | 'Distance'
//   | 'Density'
//   | 'Concentration'
//   | 'Time'
//   | 'Temperature'
//   | 'Acceleration'
//   | 'Energy'
//   | 'Force'
//   | 'SurfaceArea'
//   | 'FlatAngle';

// @Component({
//   selector: 'app-unit-converter',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './unit-converter.component.html',
//   styleUrl: './unit-converter.component.scss',
// })
// export class UnitConverterComponent {

//    private navService = inject(NavService);
//   // ----------------------------------------------------------------------
//   //  UI state
//   // ----------------------------------------------------------------------
//   unitTypes: UnitType[] = [
//     'Weight',
//     'Volume',
//     'Distance',
//     'Density',
//     'Concentration',
//     'Time',
//     'Temperature',
//     'Acceleration',
//     'Energy',
//     'Force',
//     'SurfaceArea',
//     'FlatAngle',
//   ];

//   selectedType: UnitType = 'Weight';
//   fromUnit: string = '';
//   toUnit: string = '';
//   value: number | null = null;
//   result: string = '';
//    title = 'Unit Converter';

//   constructor(){
// this.setNav();
//   }
//   // ----------------------------------------------------------------------
//   //  Conversion tables
//   // ----------------------------------------------------------------------
//   // Each type has a mapping: unit → { targetUnit: factor }
//   // Factors are relative to the *base unit* shown below.
//   // For temperature we use a custom handler.
//   conversionTable: Record<UnitType, Record<string, Record<string, number>>> = {
//     Weight: {
//       kilogram: { gram: 1000, ton: 0.001, pound: 2.20462, ounce: 35.274 },
//       gram: { kilogram: 0.001, ton: 0.000001, pound: 0.00220462, ounce: 0.035274 },
//       ton: { kilogram: 1000, gram: 1_000_000, pound: 2204.62, ounce: 35273.9 },
//       pound: { kilogram: 0.453592, gram: 453.592, ton: 0.000453592, ounce: 16 },
//       ounce: { kilogram: 0.0283495, gram: 28.3495, ton: 0.0000283495, pound: 0.0625 },
//     },

//     Volume: {
//       liter: { milliliter: 1000, gallon: 0.264172, pint: 2.11338, cup: 4.22675 },
//       milliliter: { liter: 0.001, gallon: 0.000264172, pint: 0.00211338, cup: 0.00422675 },
//       gallon: { liter: 3.78541, milliliter: 3785.41, pint: 8, cup: 16 },
//       pint: { liter: 0.473176, milliliter: 473.176, gallon: 0.125, cup: 2 },
//       cup: { liter: 0.236588, milliliter: 236.588, gallon: 0.0625, pint: 0.5 },
//     },

//     Distance: {
//       meter: { kilometer: 0.001, foot: 3.28084, mile: 0.000621371, inch: 39.3701 },
//       kilometer: { meter: 1000, foot: 3280.84, mile: 0.621371, inch: 39370.1 },
//       foot: { meter: 0.3048, kilometer: 0.0003048, mile: 0.000189394, inch: 12 },
//       mile: { meter: 1609.34, kilometer: 1.60934, foot: 5280, inch: 63360 },
//       inch: { meter: 0.0254, kilometer: 0.0000254, foot: 0.0833333, mile: 0.0000157828 },
//     },

//     Density: {
//       'kg/m3': { 'g/cm3': 0.001, 'lb/ft3': 0.062428 },
//       'g/cm3': { 'kg/m3': 1000, 'lb/ft3': 62.428 },
//       'lb/ft3': { 'kg/m3': 16.0185, 'g/cm3': 0.0160185 },
//     },

//     Concentration: {
//       'mol/L': { 'mol/m3': 1000, 'mmol/L': 1000 },
//       'mol/m3': { 'mol/L': 0.001, 'mmol/L': 1 },
//       'mmol/L': { 'mol/L': 0.001, 'mol/m3': 1 },
//     },

//     Time: {
//       second: { minute: 1 / 60, hour: 1 / 3600, day: 1 / 86400, week: 1 / 604800 },
//       minute: { second: 60, hour: 1 / 60, day: 1 / 1440, week: 1 / 10080 },
//       hour: { second: 3600, minute: 60, day: 1 / 24, week: 1 / 168 },
//       day: { second: 86400, minute: 1440, hour: 24, week: 1 / 7 },
//       week: { second: 604800, minute: 10080, hour: 168, day: 7 },
//     },

//     Temperature: {
//       // Special case – handled in `convertTemperature`
//     },

//     Acceleration: {
//       'm/s2': { 'ft/s2': 3.28084, 'g': 0.101971, 'km/h2': 0.01 },
//       'ft/s2': { 'm/s2': 0.3048, 'g': 0.03108, 'km/h2': 0.003048 },
//       'g': { 'm/s2': 9.80665, 'ft/s2': 32.174, 'km/h2': 0.98 },
//       'km/h2': { 'm/s2': 0.277778, 'ft/s2': 0.912985, 'g': 1.019683 },
//     },

//     Energy: {
//       joule: { calorie: 0.239005, kilocalorie: 0.000239005, BTU: 0.000947817 },
//       calorie: { joule: 4.184, kilocalorie: 0.001, BTU: 0.0039683 },
//       kilocalorie: { joule: 4184, calorie: 1000, BTU: 3.9683 },
//       BTU: { joule: 1055.06, calorie: 251.847, kilocalorie: 0.251847 },
//     },

//     Force: {
//       newton: { pound: 0.224809, dyne: 100000, kip: 0.001,
//         // 1 kip = 4448.2216 N
//       },
//       pound: { newton: 4.44822, dyne: 444822, kip: 0.001,
//         // 1 kip = 4448.2216 lb
//       },
//       dyne: { newton: 1e-5, pound: 2.24809e-6, kip: 2.24809e-11 },
//       kip: { newton: 4448.2216, pound: 4448.2216, dyne: 4.44822e+9 },
//     },

//     SurfaceArea: {
//       'm2': { 'ft2': 10.7639, 'in2': 1550.003, 'yd2': 1.19599 },
//       'ft2': { 'm2': 0.092903, 'in2': 144, 'yd2': 0.111111 },
//       'in2': { 'm2': 0.00064516, 'ft2': 0.00694444, 'yd2': 0.000771605 },
//       'yd2': { 'm2': 0.836127, 'ft2': 9, 'in2': 1296 },
//     },

//     FlatAngle: {
//       degree: { radian: Math.PI / 180, grad: 10 / 9 },
//       radian: { degree: 180 / Math.PI, grad: 200 / Math.PI },
//       grad: { degree: 0.9, radian: Math.PI / 200 },
//     },
//   };

//   // ----------------------------------------------------------------------
//   //  Public API
//   // ----------------------------------------------------------------------
//   onTypeChange(): void {
//     // Reset units & result when the type changes
//     this.fromUnit = '';
//     this.toUnit = '';
//     this.result = '';
//   }

//   convert(): void {
//     if (this.value === null || this.value === undefined) {
//       this.result = 'Please enter a value';
//       return;
//     }

//     if (!this.fromUnit || !this.toUnit) {
//       this.result = 'Select both units';
//       return;
//     }

//     // Temperature is special (needs offset, not just a factor)
//     if (this.selectedType === 'Temperature') {
//       this.result = this.convertTemperature(
//         this.value,
//         this.fromUnit,
//         this.toUnit
//       );
//       return;
//     }

//     // Normal unit conversion
//     const table = this.conversionTable[this.selectedType];
//     const fromMap = table[this.fromUnit];
//     const factor = fromMap?.[this.toUnit];

//     if (factor === undefined) {
//       this.result = 'Conversion not available';
//       return;
//     }

//     const converted = this.value * factor;
//     this.result = `${converted.toLocaleString(undefined, {
//       maximumFractionDigits: 6,
//     })} ${this.toUnit}`;
//   }

//   // ----------------------------------------------------------------------
//   //  Temperature conversion – handles offsets
//   // ----------------------------------------------------------------------
//   convertTemperature(
//     val: number,
//     from: string,
//     to: string
//   ): string {
//     // Convert from `from` to Celsius first
//     let celsius: number;
//     switch (from) {
//       case 'celsius':
//         celsius = val;
//         break;
//       case 'fahrenheit':
//         celsius = (val - 32) * (5 / 9);
//         break;
//       case 'kelvin':
//         celsius = val - 273.15;
//         break;
//       default:
//         return 'Unsupported temp unit';
//     }

//     // Convert from Celsius to `to`
//     let result: number;
//     switch (to) {
//       case 'celsius':
//         result = celsius;
//         break;
//       case 'fahrenheit':
//         result = celsius * (9 / 5) + 32;
//         break;
//       case 'kelvin':
//         result = celsius + 273.15;
//         break;
//       default:
//         return 'Unsupported temp unit';
//     }

//     return `${result.toLocaleString(undefined, {
//       maximumFractionDigits: 2,
//     })} ${to}`;
//   }

//   // ----------------------------------------------------------------------
//   //  Helpers for the template
//   // ----------------------------------------------------------------------
//   getUnitOptions(): string[] {
//     const map = this.conversionTable[this.selectedType];
//     return Object.keys(map);
//   }


//     setNav(): void {
  
//       this.navService.reSetNavConfig();
  
//       let navConfig: NavConfig = new NavConfig();
//       navConfig.title = this.title;
//       navConfig.ico.menu = false;
//       navConfig.ico.back = true;
//       navConfig.ico.home = true;
//       navConfig.ico.favorite = false;
//       navConfig.ico.logut = false;
//       navConfig.ico.label = false;
//       navConfig.ico.sds = false;
//       navConfig.goto = 'app/lab/field';
//       this.navService.setNavConfig(navConfig);
//     }
    
// }


import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavConfig } from '../../../models/navElemet.model';
import { NavService } from '../../../services/nav.service';

type UnitType =
  | 'Weight'
  | 'Volume'
  | 'Distance'
  | 'Density'
  | 'Concentration'
  | 'Time'
  | 'Temperature'
  | 'Acceleration'
  | 'Energy'
  | 'Force'
  | 'SurfaceArea'
  | 'FlatAngle';

@Component({
  selector: 'app-unit-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],   // <-- added FormsModule for ngModel
  templateUrl: './unit-converter.component.html',
  styleUrl: './unit-converter.component.scss',
})
export class UnitConverterComponent {
  // ----------------------------------------------------------------------
  // UI state
  // ----------------------------------------------------------------------
  private navService = inject(NavService);
  unitTypes: UnitType[] = [
    'Weight',
    'Volume',
    'Distance',
    'Density',
    'Concentration',
    'Time',
    'Temperature',
    'Acceleration',
    'Energy',
    'Force',
    'SurfaceArea',
    'FlatAngle',
  ];

  selectedType: UnitType = 'Weight';
  fromUnit: string = '';
  toUnit: string = '';
  value: number | null = null;
  result: string = '';
  title = 'Unit Converter';

  constructor() {
    this.setNav();
  }

  // ----------------------------------------------------------------------
  // Conversion tables
  // ----------------------------------------------------------------------
  conversionTable: Record<
    UnitType,
    Record<string, Record<string, number>>
  > = {
      // --------------------- Weight ---------------------------------------
      Weight: {
        kilogram: {
          gram: 1000,
          ton: 0.001,
          pound: 2.20462,
          ounce: 35.274,
        },
        gram: {
          kilogram: 0.001,
          ton: 0.000001,
          pound: 0.00220462,
          ounce: 0.035274,
        },
        ton: {
          kilogram: 1000,
          gram: 1_000_000,
          pound: 2204.62,
          ounce: 35273.9,
        },
        pound: {
          kilogram: 0.453592,
          gram: 453.592,
          ton: 0.000453592,
          ounce: 16,
        },
        ounce: {
          kilogram: 0.0283495,
          gram: 28.3495,
          ton: 0.0000283495,
          pound: 0.0625,
        },
      },

      // --------------------- Volume ---------------------------------------
      Volume: {
        liter: {
          milliliter: 1000,
          gallon: 0.264172,
          pint: 2.11338,
          cup: 4.22675,
          'fluid-ounce': 33.814,
        },
        milliliter: {
          liter: 0.001,
          gallon: 0.000264172,
          pint: 0.00211338,
          cup: 0.00422675,
          'fluid-ounce': 0.033814,
        },
        gallon: {
          liter: 3.78541,
          milliliter: 3785.41,
          pint: 8,
          cup: 16,
          'fluid-ounce': 128,
        },
        pint: {
          liter: 0.473176,
          milliliter: 473.176,
          gallon: 0.125,
          cup: 2,
          'fluid-ounce': 16,
        },
        cup: {
          liter: 0.236588,
          milliliter: 236.588,
          gallon: 0.0625,
          pint: 0.5,
          'fluid-ounce': 8,
        },
        'fluid-ounce': {
          liter: 0.0295735,
          milliliter: 29.5735,
          gallon: 0.0078125,
          pint: 0.0625,
          cup: 0.125,
        },
      },

      // --------------------- Distance -------------------------------------
      Distance: {
        meter: {
          kilometer: 0.001,
          foot: 3.28084,
          mile: 0.000621371,
          inch: 39.3701,
        },
        kilometer: {
          meter: 1000,
          foot: 3280.84,
          mile: 0.621371,
          inch: 39370.1,
        },
        foot: {
          meter: 0.3048,
          kilometer: 0.0003048,
          mile: 0.000189394,
          inch: 12,
        },
        mile: {
          meter: 1609.34,
          kilometer: 1.60934,
          foot: 5280,
          inch: 63360,
        },
        inch: {
          meter: 0.0254,
          kilometer: 0.0000254,
          foot: 0.0833333,
          mile: 0.0000157828,
        },
      },

      // --------------------- Density --------------------------------------
      Density: {
        'kg/m3': {
          'g/cm3': 0.001,
          'lb/ft3': 0.062428,
        },
        'g/cm3': {
          'kg/m3': 1000,
          'lb/ft3': 62.428,
        },
        'lb/ft3': {
          'kg/m3': 16.0185,
          'g/cm3': 0.0160185,
        },
      },

      // --------------------- Concentration -------------------------------
      Concentration: {
        'mol/L': {
          'mol/m3': 1000,
          'mmol/L': 1000,
        },
        'mol/m3': {
          'mol/L': 0.001,
          'mmol/L': 1,
        },
        'mmol/L': {
          'mol/L': 0.001,
          'mol/m3': 1,
        },
      },

      // --------------------- Time -----------------------------------------
      Time: {
        second: {
          minute: 1 / 60,
          hour: 1 / 3600,
          day: 1 / 86400,
          week: 1 / 604800,
        },
        minute: {
          second: 60,
          hour: 1 / 60,
          day: 1 / 1440,
          week: 1 / 10080,
        },
        hour: {
          second: 3600,
          minute: 60,
          day: 1 / 24,
          week: 1 / 168,
        },
        day: {
          second: 86400,
          minute: 1440,
          hour: 24,
          week: 1 / 7,
        },
        week: {
          second: 604800,
          minute: 10080,
          hour: 168,
          day: 7,
        },
      },

      // --------------------- Temperature ----------------------------------
      Temperature: {
        // Handled by a special method – no numeric factors needed here
      },

      // --------------------- Acceleration ---------------------------------
      Acceleration: {
        'm/s2': { 'ft/s2': 3.28084, g: 0.101971, 'km/h2': 0.01 },
        'ft/s2': { 'm/s2': 0.3048, g: 0.03108, 'km/h2': 0.003048 },
        g: { 'm/s2': 9.80665, 'ft/s2': 32.174, 'km/h2': 0.98 },
        'km/h2': { 'm/s2': 0.277778, 'ft/s2': 0.912985, g: 1.019683 },
      },

      // --------------------- Energy ---------------------------------------
      Energy: {
        joule: { calorie: 0.239005, kilocalorie: 0.000239005, BTU: 0.000947817 },
        calorie: { joule: 4.184, kilocalorie: 0.001, BTU: 0.0039683 },
        kilocalorie: { joule: 4184, calorie: 1000, BTU: 3.9683 },
        BTU: { joule: 1055.06, calorie: 251.847, kilocalorie: 0.251847 },
      },

      // --------------------- Force ----------------------------------------
      Force: {
        newton: {
          pound: 0.224809,
          dyne: 100000,
          kip: 0.001, // 1 kip = 4448.2216 N
        },
        pound: {
          newton: 4.44822,
          dyne: 444822,
          kip: 0.001, // 1 kip = 4448.2216 lb
        },
        dyne: { newton: 1e-5, pound: 2.24809e-6, kip: 2.24809e-11 },
        kip: {
          newton: 4448.2216,
          pound: 4448.2216,
          dyne: 4.44822e+9,
        },
      },

      // --------------------- Surface Area ---------------------------------
      SurfaceArea: {
        'square-meter': {
          'square-foot': 10.7639,
          acre: 0.000247105,
          'square-meter':1
        },
        'square-foot': {
          'square-meter': 0.092903,
           acre: 0.0000229568,
        },
        acre: {
          'square-meter': 4046.86,
          'square-foot': 43560,
        },
      },

      // --------------------- Flat Angle -----------------------------------
      FlatAngle: {
        degree: { 'fluid-ounce': 0.0174533, radian: 0.0174533, 'turn': 1 / 360 },
        radian: { degree: 57.2958, 'turn': 1 / (2 * Math.PI) },
        turn: { degree: 360, radian: 2 * Math.PI },
      },
    };

  // ----------------------------------------------------------------------
  // UI helpers
  // ----------------------------------------------------------------------
  getUnitOptions() {
    return Object.keys(this.conversionTable[this.selectedType] || {});
  }

  // ----------------------------------------------------------------------
  // Main conversion routine
  // ----------------------------------------------------------------------
  convert() {

    if (!this.value || !this.fromUnit || !this.toUnit) {
      this.result = 'Please fill all fields.';
      return;
    }

    // ---- 1. Temperature is a special case
    if (this.selectedType === 'Temperature') {
      this.result = this.convertTemperature(
        this.value,
        this.fromUnit,
        this.toUnit
      );
      return;
    }


  if (this.value && this.fromUnit && this.toUnit && (this.fromUnit === this.toUnit) ) {
      this.result = `${this.value} ${this.fromUnit}` ;
      return;
    }

    const factors =
      this.conversionTable[this.selectedType][this.fromUnit];
    if (!factors) {
      this.result = 'From‑unit not supported.';
      return;
    }

    const factor = factors[this.toUnit];
    if (factor === undefined) {
      this.result = 'To‑unit not supported.';
      return;
    }
    const converted = this.value * factor;
    const formatted = Number.isFinite(converted)? Number(converted.toFixed(6)).toString(): converted.toString();
    this.result = `${formatted} ${this.toUnit}`;
  }

  // ----------------------------------------------------------------------
  // Temperature conversion helper
  // ----------------------------------------------------------------------
  convertTemperature(value: number, from: string, to: string): string {
    let celsius: number;
    switch (from) {
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * (5 / 9);
        break;
      default:
        return 'Unsupported temp unit';
    }

    switch (to) {
      case 'celsius':
        return `${celsius.toFixed(6)} °C`;
      case 'fahrenheit':
        return `${(celsius * 9) / 5 + 32} °F`;
      case 'kelvin':
        return `${celsius + 273.15} K`;
      default:
        return 'Unsupported temp unit';
    }
  }

   setNav(): void {
  
      this.navService.reSetNavConfig();
  
      let navConfig: NavConfig = new NavConfig();
      navConfig.title = this.title;
      navConfig.ico.menu = false;
      navConfig.ico.back = true;
      navConfig.ico.home = true;
      navConfig.ico.favorite = false;
      navConfig.ico.logut = false;
      navConfig.ico.label = false;
      navConfig.ico.sds = false;
      navConfig.goto = 'app/lab/field';
      this.navService.setNavConfig(navConfig);
    }
}
