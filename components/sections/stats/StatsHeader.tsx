import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export function StatsHeader() {
  return (
    <View style={styles.blueBackground}>
      <Text style={styles.title}>Статистика</Text>
      <Text style={styles.subtitle}>Анализ мошеннических звонков</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  blueBackground: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
