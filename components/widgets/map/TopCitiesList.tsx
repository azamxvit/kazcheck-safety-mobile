import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

const CITIES_DATA = [
  { id: 1, name: 'Алматы', scam: 'Банковское', color: Colors.primary, count: 324 },
  { id: 2, name: 'Астана', scam: 'Инвестиции', color: '#FF9500', count: 289 },
  { id: 3, name: 'Шымкент', scam: 'Фейковая полиция', color: Colors.danger, count: 176 },
  { id: 4, name: 'Караганда', scam: 'Банковское', color: Colors.primary, count: 134 },
  { id: 5, name: 'Актобе', scam: 'Спам', color: Colors.success || '#34C759', count: 98 },
];

export function TopCitiesList() {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Топ городов по активности</Text>

      <View style={styles.listContainer}>
        {CITIES_DATA.map((city, index) => (
          <View
            key={city.id}
            style={[styles.listItem, index === CITIES_DATA.length - 1 && styles.lastItem]}
          >
            <Text style={styles.rank}>{index + 1}</Text>

            <View style={styles.cityInfo}>
              <Text style={styles.cityName}>{city.name}</Text>
              <View style={styles.scamRow}>
                <View style={[styles.dot, { backgroundColor: city.color }]} />
                <Text style={styles.scamType}>{city.scam}</Text>
              </View>
            </View>

            <View style={styles.stats}>
              <Text style={styles.count}>{city.count}</Text>
              <Text style={styles.countLabel}>жалоб</Text>
            </View>
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
    marginBottom: 40,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  listContainer: {},
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastItem: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  rank: {
    width: 28,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B0B0B0',
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  scamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  scamType: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  stats: {
    alignItems: 'flex-end',
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  countLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
