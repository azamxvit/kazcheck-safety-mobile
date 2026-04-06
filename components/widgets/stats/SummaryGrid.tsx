import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

type SummaryData = {
  weeklyScams: number;
  newReports: number;
  protectedUsers: number;
  totalScammers: number;
};

export function SummaryGrid({ data }: { data: SummaryData }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Карточка 1 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="alert-circle-outline" size={16} color={Colors.danger} />
            <Text style={styles.cardTitle}>За неделю</Text>
          </View>
          <Text style={styles.number}>{data.weeklyScams.toLocaleString()}</Text>
          <Text style={[styles.trend, { color: Colors.success }]}>12% от прошлой недели</Text>
        </View>

        {/* Карточка 2 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="trending-up-outline" size={16} color={Colors.primary} />
            <Text style={styles.cardTitle}>Новых жалоб</Text>
          </View>
          <Text style={styles.number}>{data.newReports.toLocaleString()}</Text>
          <Text style={[styles.trend, { color: Colors.danger }]}>8% от прошлой недели</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Карточка 3 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-checkmark-outline" size={16} color={Colors.success} />
            <Text style={styles.cardTitle}>Защищено</Text>
          </View>
          <Text style={styles.number}>{data.protectedUsers.toLocaleString()}</Text>
          <Text style={styles.subtext}>Всего пользователей</Text>
        </View>

        {/* Карточка 4 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="warning-outline" size={16} color={Colors.warning} />
            <Text style={styles.cardTitle}>В базе</Text>
          </View>
          <Text style={styles.number}>{data.totalScammers.toLocaleString()}</Text>
          <Text style={styles.subtext}>Номеров мошенников</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: -40,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  trend: {
    fontSize: 11,
    fontWeight: '500',
  },
  subtext: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
