interface Ingredient {
  name: string;
  percentage: string;
  type: string;
  mode_of_action: string;
  key_properties: string[];
  target_spectrum: string;
  safety_notes: string[];
}

interface Deep {
  Ingredients: Ingredient[];
  combination_rationale: CombinationRationale | null;
}

interface CombinationRationale {
  resistance_management: string | null;
  knockdown_and_residual: string | null;
  broader_coverage: string | null;
}

export class TechnicalProduct {
  id: number;
  sourceFile: string;
  title: string;
  productOverview: string;
  activeIngredients: string;
  howItWorks: string;
  spectrumOfControl: string;
  applicationRates: string;
  applicationTips: string;
  Advantages: string;
  safetyEnvironmentalNotes: string;
  whyTheseComponentsAreUsed: string;
  physicalChemicalProperties: string;
  Deep: Deep;
  url1: string;
  url2: string;

  constructor(data: any = {}) {
    this.id = 0;
    this.sourceFile = data.sourceFile || '';
    this.title = data.title || '';
    this.productOverview = data.productOverview || '';
    this.activeIngredients = data.activeIngredients || '';
    this.howItWorks = data.howItWorks || '';
    this.spectrumOfControl = data.spectrumOfControl || '';
    this.applicationRates = data.applicationRates || '';
    this.applicationTips = data.applicationTips || '';
    this.Advantages = data.Advantages || '';
    this.safetyEnvironmentalNotes = data.safetyEnvironmentalNotes || '';
    this.whyTheseComponentsAreUsed = data.whyTheseComponentsAreUsed || '';
    this.physicalChemicalProperties = data.physicalChemicalProperties || '';
    this.Deep = {
      Ingredients: data.Deep?.Ingredients?.map((ingredient: any) => ({
        name: ingredient.name || '',
        percentage: ingredient.percentage || '',
        type: ingredient.type || '',
        mode_of_action: ingredient.mode_of_action || '',
        key_properties: ingredient.key_properties || [],
        target_spectrum: ingredient.target_spectrum || '',
        safety_notes: ingredient.safety_notes || [],
      })) || [],
      combination_rationale: data.Deep?.combination_rationale || null,
    };
    this.url1 = data.url1 || '';
    this.url2 = data.url2 || '';
  }
}