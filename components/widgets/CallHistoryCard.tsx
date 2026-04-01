import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Badge } from '../shared/Badge';

type CallHistoryCardProps = {
  key?: string | number;
  title: string;
  phone: string;
  tagText: string;
  complaints: number;
  time: string;
  riskLevel: 'danger' | 'warning' | 'success';
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
  const iconColor = isDanger ? Colors.danger : Colors.warning;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      {/* Иконка риска слева */}
      <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
        <Ionicons name="alert" size={20} color="#fff" />
      </View>

      {/* Основная информация */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.border} />
        </View>
        <Text style={styles.phone}>{phone}</Text>

        <View style={styles.tagRow}>
          <Badge text={tagText} type={riskLevel} />
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
    alignItems: 'flex-start',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  phone: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
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
