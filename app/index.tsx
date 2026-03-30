import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { globalStyles } from '../constants/Styles';
import { CallHistoryCard } from '../components/widgets/CallHistoryCard';

// Моковые данные для проверки (позже будем брать из API)
const MOCK_CALLS = [
  { id: 1, title: 'Фейковый банк', phone: '+7 707 123 4567', tag: 'Банковское мошенничество', complaints: 214, time: 'Сегодня, 14:30', risk: 'danger' as const },
  { id: 2, title: 'Инвест Профит', phone: '+7 707 123 4567', tag: 'Инвестиционные схемы', complaints: 156, time: 'Сегодня, 14:30', risk: 'danger' as const },
  { id: 3, title: 'Фейковый банк', phone: '+7 707 123 4567', tag: 'Кредитные схемы', complaints: 42, time: 'Сегодня, 14:30', risk: 'warning' as const },
];

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      {/* СЕКЦИЯ: Синяя шапка */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.logo}>KazCheck</Text>
            <Text style={styles.subtitle}>Защита от мошенников</Text>
          </View>
          <Ionicons name="shield-checkmark-outline" size={32} color="#fff" />
        </View>
      </View>

      {/* СЕКЦИЯ: Поиск */}
      <View style={styles.searchContainer}>
        <View style={globalStyles.card}>
          <Text style={styles.searchLabel}>Проверить номер телефона</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={styles.input}
              placeholder="+ 7 XXX XXX XXXX"
              placeholderTextColor={Colors.textSecondary}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* СЕКЦИЯ: Статистика за неделю */}
        <View style={styles.statsRow}>
          <View style={[globalStyles.card, styles.statBox]}>
            <View style={styles.statHeader}>
              <Ionicons name="alert-circle-outline" size={20} color={Colors.danger} />
              <Text style={styles.statNumber}>1,247</Text>
            </View>
            <Text style={styles.statDesc}>Мошенники за неделю</Text>
          </View>
          <View style={[globalStyles.card, styles.statBox]}>
            <View style={styles.statHeader}>
              <Ionicons name="trending-up-outline" size={20} color={Colors.primary} />
              <Text style={styles.statNumber}>1,247</Text>
            </View>
            <Text style={styles.statDesc}>Новых жалоб за неделю</Text>
          </View>
        </View>

        {/* СЕКЦИЯ: Проверенные звонки */}
        <View style={globalStyles.textRow}>
          <Text style={globalStyles.title}>Проверенные звонки</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Все</Text>
          </TouchableOpacity>
        </View>

        {/* Рендерим карточки из моковых данных */}
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
        
        <View style={{ height: 40 }} /> {/* Отступ снизу для табов */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (здесь старые стили шапки и поиска остаются без изменений)
  header: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingBottom: 60, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#E0EBFF', marginTop: 4 },
  searchContainer: { paddingHorizontal: 20, marginTop: -40, zIndex: 10 },
  searchLabel: { fontSize: 14, color: Colors.text, marginBottom: 12 },
  inputRow: { flexDirection: 'row', gap: 12 },
  input: { flex: 1, height: 48, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 16, fontSize: 16, color: Colors.text },
  searchButton: { width: 48, height: 48, backgroundColor: Colors.primary, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20 },
  
  // Новые стили для статистики
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statBox: { flex: 1, marginBottom: 0, padding: 16, alignItems: 'center' },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
  statDesc: { fontSize: 12, color: Colors.textSecondary, textAlign: 'center' },
  linkText: { color: Colors.primary, fontSize: 16, fontWeight: '500' },
});