import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';
import { globalStyles } from '../../../constants/Styles';
import { ProgressBar } from '../../shared/ProgressBar';
import { RiskConfig } from './config';

interface Props {
  config: RiskConfig;
  percentage: number;
}

export function RiskIndicatorCard({ config, percentage }: Props) {
  return (
    <View style={[styles.card, { backgroundColor: config.bg }]}>
      <View style={styles.header}>
        <Ionicons name={config.icon} size={28} color={config.color} />
        <View style={styles.textContent}>
          <Text style={[styles.title, { color: config.color }]}>{config.title}</Text>
          <Text style={styles.desc}>{config.desc}</Text>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={globalStyles.textRow}>
          <Text style={styles.progressLabel}>Уровень риска</Text>
          <Text style={[styles.progressValue, { color: config.color }]}>{percentage}%</Text>
        </View>
        <ProgressBar percentage={percentage} color={config.color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 20 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 20 
  },
  textContent: { 
    flex: 1, 
    marginLeft: 12 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  desc: { 
    fontSize: 14, 
    color: Colors.text, 
    opacity: 0.8, 
    lineHeight: 20 
  },
  progressSection: { marginTop: 8 },
  progressLabel: { fontSize: 14, color: Colors.text },
  progressValue: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
});