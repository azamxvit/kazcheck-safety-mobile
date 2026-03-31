import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export type RiskType = 'danger' | 'warning' | 'success';

export interface RiskConfig {
  color: string;
  bg: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
}

export const RISK_CONFIG: Record<RiskType, RiskConfig> = {
  danger: {
    color: Colors.danger,
    bg: Colors.dangerLight,
    icon: 'warning',
    title: 'Высокий риск мошенничества',
    desc: 'Этот номер связан с банковскими мошенническими схемами. Не сообщайте личные данные!',
  },
  warning: {
    color: Colors.warning,
    bg: Colors.warningLight,
    icon: 'alert',
    title: 'Подозрительный номер',
    desc: 'Этот номер был отмечен несколькими пользователями.',
  },
  success: {
    color: Colors.success,
    bg: Colors.successLight,
    icon: 'shield-checkmark',
    title: 'Безопасный номер',
    desc: 'Этот номер не был отмечен в нашей базе данных.',
  },
};