import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { globalStyles } from '../constants/Styles';
import { RISK_CONFIG, RiskType } from '../components/sections/result/config';
import { RiskIndicatorCard } from '../components/sections/result/RiskIndicatorCard';
import { DetailsCard } from '../components/sections/result/DetailsCard';

export default function ResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams();
  const phone = (params.phone as string) || '+ 7 707 123 4567';
  const riskType = (params.risk as RiskType) || 'danger';
  const percentage = Number(params.percentage) || 94;

  const config = RISK_CONFIG[riskType] || RISK_CONFIG.danger;

  return (
    <View style={[globalStyles.container, { paddingTop: insets.top }]}>
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Результат проверки</Text>
        <View style={{ width: 24 }} /> {/* Заглушка */}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Номер телефона */}
        <View style={styles.phoneSection}>
          <View style={styles.phoneIconWrapper}>
            <Ionicons name="call-outline" size={24} color={Colors.textSecondary} />
          </View>
          <Text style={styles.phoneNumber}>{phone}</Text>
          <Text style={styles.phoneId}>ID: KZ SCAM 15721</Text>
        </View>

        <RiskIndicatorCard config={config} percentage={percentage} />

        <DetailsCard scamType="Банковское мошенничество" complaintsCount={214} />

        {/* Кнопки действий */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/report')}>
            <Ionicons name="flag-outline" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Сообщить о мошеннике</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/')}>
            <Text style={styles.secondaryButtonText}>Вернуться на главную</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
  },
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  content: { padding: 20 },
  phoneSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  phoneIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  phoneNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  phoneId: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  actionButtons: {
    marginTop: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: Colors.surface,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
