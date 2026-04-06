import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

export function FeaturedRegionCard() {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="location-outline" size={24} color="#fff" />
      </View>

      <View style={styles.info}>
        <Text style={styles.cityName}>Алматы</Text>
        <Text style={styles.scamType}>Банковское</Text>
        <View style={styles.row}>
          <Text style={styles.reportsCount}>342 жалоб</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.closeBtn}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F4F9FF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 102, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  scamType: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  reportsCount: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  closeBtn: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
});
