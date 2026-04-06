import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

const SCAM_TYPES = [
  { id: 'bank', name: 'Банковское', color: Colors.primary },
  { id: 'invest', name: 'Инвестиции', color: '#FF9500' },
  { id: 'fake_police', name: 'Фейковая полиция', color: Colors.danger },
  { id: 'credits', name: 'Кредиты', color: '#FFCC00' },
  { id: 'spam', name: 'Спам', color: Colors.success || '#34C759' },
];

export function ScamTypesLegend() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
        <Text style={styles.title}>Типы мошенничества</Text>
      </View>

      <View style={styles.grid}>
        {SCAM_TYPES.map((type) => (
          <View key={type.id} style={styles.gridItem}>
            <View style={[styles.dot, { backgroundColor: type.color }]} />
            <Text style={styles.typeName}>{type.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginTop: -40,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
  },
  gridItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  typeName: {
    fontSize: 13,
    color: Colors.text,
  },
});
