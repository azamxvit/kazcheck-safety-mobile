import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

type CallHistoryCardProps = {
  title: string;
  phone: string;
  tagText: string;
  complaints: number;
  time: string;
  riskLevel: 'danger' | 'warning';
};

export function CallHistoryCard({
  title,
  phone,
  tagText,
  complaints,
  time,
  riskLevel,
}: CallHistoryCardProps) {
  const isDanger = riskLevel === 'danger';
  const mainColor = isDanger ? Colors.danger : Colors.warning;
  const tagBgColor = isDanger ? '#FFF0F0' : '#FFFBE5';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      {/* Иконка слева */}
      <View style={[styles.iconContainer, { backgroundColor: mainColor }]}>
        <Ionicons name="alert" size={20} color="#fff" />
      </View>

      {/* Контент */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
        </View>
        <Text style={styles.phone}>{phone}</Text>

        <View style={styles.row}>
          <View style={[styles.tag, { backgroundColor: tagBgColor }]}>
            <Text style={[styles.tagText, { color: mainColor }]}>{tagText}</Text>
          </View>
          <Text style={styles.complaints}>{complaints} жалоб</Text>
        </View>

        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  phone: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  complaints: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  time: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
