import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export function ProfileStats() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Ваша статистика</Text>

      <View style={styles.row}>
        {/* Карточка проверок */}
        <View style={[styles.statCard, { backgroundColor: '#F4F9FF' }]}>
          <Text style={[styles.statNumber, { color: Colors.primary }]}>12</Text>
          <Text style={styles.statLabel}>Проверено{'\n'}номеров</Text>
        </View>

        {/* Карточка жалоб */}
        <View style={[styles.statCard, { backgroundColor: '#F2FCF3' }]}>
          <Text style={[styles.statNumber, { color: Colors.success || '#34C759' }]}>3</Text>
          <Text style={styles.statLabel}>Отправлено{'\n'}жалоб</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});
