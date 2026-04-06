import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export type RegionData = {
  name: string;
  count: number;
};

export function RegionalActivity({ data }: { data: RegionData[] }) {
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Активность по регионам</Text>

      {data.map((region, index) => {
        const fillPercentage = (region.count / maxCount) * 100;

        return (
          <View key={index} style={styles.regionRow}>
            <View style={styles.textRow}>
              <Text style={styles.regionName}>{region.name}</Text>
              <Text style={styles.regionCount}>{region.count}</Text>
            </View>

            <View style={styles.barBackground}>
              <View style={[styles.barFill, { width: `${fillPercentage}%` }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 40,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  regionRow: {
    marginBottom: 16,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  regionName: {
    fontSize: 14,
    color: Colors.text,
  },
  regionCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  barBackground: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
});
