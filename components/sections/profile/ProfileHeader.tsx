import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

export function ProfileHeader() {
  return (
    <View style={styles.container}>
      {/* Синий фон шапки */}
      <View style={styles.blueBackground}>
        <Text style={styles.title}>Профиль</Text>
        <Text style={styles.subtitle}>Настройки и информация</Text>
      </View>

      {/* Карточка пользователя */}
      <View style={styles.userCard}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-outline" size={24} color={Colors.primary} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Пользователь</Text>
          <Text style={styles.userPhone}>+ 7 XXX XXX XXXX</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  blueBackground: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 60,
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F9FF',
    marginHorizontal: 20,
    marginTop: -30,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 102, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
