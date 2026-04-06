import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

export function SuccessMessage() {
  return (
    <View style={styles.container}>
      {/* Зеленая подложка с иконкой */}
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark" size={48} color={Colors.success || '#34C759'} />
      </View>

      {/* Текст */}
      <Text style={styles.title}>Спасибо!</Text>
      <Text style={styles.subtitle}>
        Ваше сообщение помогает другим людям{'\n'}избежать мошенничества.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
