export type ActivityCategory = 'ai' | 'cloud' | 'transfer' | 'compute';

export interface ActivityInputItem {
  category: ActivityCategory;
  name: string;
  tool: string;
  quantity: number;
  unit: string;
  durationDays?: number;
  transferType?: 'Upload' | 'Download' | 'Streaming' | 'Sync';
  resourceType?: string;
  energyKwh: number;
  co2Kg: number;
}

export interface ActivityRecord {
  id: string;
  date: string;
  type: ActivityCategory;
  typeName: string;
  details: string;
  quantity: number;
  unit: string;
  energyUsedKwh: number;
  co2Kg: number;
  emissionFactor: string;
  source: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  carbonBudgetKg: number;
  joinedDate: string;
}

export interface UserAccount extends UserProfile {
  password: string; // stored for local client-side authentication
}

export interface EmissionFactors {
  aiPerQueryKwh: number; // 0.002 kWh / query
  cloudPerGbMonthKwh: number; // 0.02 kWh / GB / month
  transferPerGbKwh: number; // 0.03 kWh / GB
  computePerHourKwh: number; // 0.05 kWh / hour
  gridIntensityKgPerKwh: number; // 0.475 kg CO2e / kWh
}

export interface MLPrediction {
  month: string;
  predictedCo2Kg: number;
  confidenceLower: number;
  confidenceUpper: number;
  primaryDriver: string;
  reductionPotentialKg: number;
}
