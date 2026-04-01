export type RiskLevel = 'success' | 'warning' | 'danger' | 'caution';

export interface CallRecord {
  id: number;
  title: string;
  phone: string;
  tag: string;
  complaints: number;
  time: string;
  risk: RiskLevel;
}
