import { ScrollView, StyleSheet } from 'react-native';
import { StatsHeader } from '../components/sections/stats/StatsHeader';
import { SummaryGrid } from '../components/widgets/stats/SummaryGrid';
import { RegionalActivity } from '../components/widgets/stats/RegionalActivity';

// В будущем эти данные будут приходить из Supabase
const MOCK_SUMMARY = {
  weeklyScams: 1247,
  newReports: 324,
  protectedUsers: 5247,
  totalScammers: 12247,
};

const MOCK_REGIONS = [
  { name: 'Алматы', count: 342 },
  { name: 'Астана', count: 289 },
  { name: 'Шымкент', count: 176 },
  { name: 'Караганда', count: 134 },
  { name: 'Актобе', count: 98 },
];

export default function StatsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
      <StatsHeader />

      {/* Передаем данные в наши "глупые" компоненты */}
      <SummaryGrid data={MOCK_SUMMARY} />

      {/* Место для графиков (Бублик и Столбцы) */}

      <RegionalActivity data={MOCK_REGIONS} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
