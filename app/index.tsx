import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { supabase } from '../supabase';

import { HomeHeader } from '../components/sections/home/HomeHeader';
import { MiniStatsCard } from '../components/widgets/home/MiniStatsCard';
import { CallHistoryCard } from '../components/widgets/home/CallHistoryCard';

const MOCK_CALLS = [
  {
    id: 1,
    title: 'Фейковый банк',
    phone: '+7 707 123 4567',
    tag: 'Банковское мошенничество',
    complaints: 214,
    time: 'Сегодня, 14:30',
    risk: 'danger' as const,
  },
  {
    id: 2,
    title: 'Инвест Профит',
    phone: '+7 707 123 4567',
    tag: 'Инвестиционные схемы',
    complaints: 156,
    time: 'Сегодня, 14:30',
    risk: 'danger' as const,
  },
  {
    id: 3,
    title: 'Фейковый банк',
    phone: '+7 707 123 4567',
    tag: 'Кредитные схемы',
    complaints: 42,
    time: 'Сегодня, 14:30',
    risk: 'warning' as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('+7');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckNumber = async () => {
    if (phoneNumber.length < 11) {
      Alert.alert('Ошибка', 'Введите корректный номер телефона (минимум 11 символов)');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-number', {
        body: { phone: phoneNumber },
      });

      if (error) throw new Error(error.message);

      const riskData = data?.data || {};

      router.push({
        pathname: '/result',
        params: {
          phone: phoneNumber,
          risk: riskData.risk_level || 'unknown',
          percentage: (riskData.risk_score || 0).toString(),
        },
      });
    } catch (err: any) {
      Alert.alert('Ошибка соединения', err.message || 'Не удалось проверить номер');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <HomeHeader
          phoneNumber={phoneNumber}
          onChangePhoneNumber={setPhoneNumber}
          onSearch={handleCheckNumber}
          isLoading={isLoading}
        />

        <MiniStatsCard />

        {/* Заголовок списка */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Проверенные звонки</Text>
          <TouchableOpacity>
            <Text style={styles.listLink}>Все</Text>
          </TouchableOpacity>
        </View>

        {/* Маппинг */}
        <View style={styles.listContainer}>
          {MOCK_CALLS.map((call) => (
            <CallHistoryCard
              key={call.id}
              title={call.title}
              phone={call.phone}
              tagText={call.tag}
              complaints={call.complaints}
              time={call.time}
              riskLevel={call.risk}
            />
          ))}
        </View>
      </ScrollView>

      {/* Плавающая кнопка */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.9}
        onPress={() => router.push('/report')}
      >
        <Ionicons name="flag-outline" size={20} color="#fff" />
        <Text style={styles.fabText}>Сообщить о мошеннике</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  listLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 100,
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
