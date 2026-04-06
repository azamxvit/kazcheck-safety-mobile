import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

export function MiniStatsCard() {
  return (
    <View style={styles.card}>
      {/* Левая колонка */}
      <View style={styles.column}>
        <View style={styles.headerRow}>
          <Ionicons name="alert-circle-outline" size={20} color={Colors.danger} />
          <Text style={styles.number}>1,247</Text>
        </View>
        <Text style={styles.label}>Мошенники за{'\n'}неделю</Text>
      </View>

      {/* Разделитель */}
      <View style={styles.divider} />

      {/* Правая колонка */}
      <View style={styles.column}>
        <View style={styles.headerRow}>
          <Ionicons name="trending-up-outline" size={20} color={Colors.primary} />
          <Text style={styles.number}>1,247</Text>
        </View>
        <Text style={styles.label}>Мошенники за{'\n'}неделю</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});
