import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HomeHeaderProps = {
  phoneNumber: string;
  onChangePhoneNumber: (text: string) => void;
  onSearch: () => void;
  isLoading: boolean;
};

export function HomeHeader({
  phoneNumber,
  onChangePhoneNumber,
  onSearch,
  isLoading,
}: HomeHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.blueBackground, { paddingTop: insets.top + 20 }]}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.title}>KazCheck</Text>
            <Text style={styles.subtitle}>Защита от мошенников</Text>
          </View>
          <Ionicons name="shield-outline" size={32} color="#fff" />
        </View>
      </View>

      <View style={styles.searchCard}>
        <Text style={styles.searchTitle}>Проверить номер телефона</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="+ 7 XXX XXX XXXX"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={onChangePhoneNumber}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.searchButton, isLoading && { opacity: 0.7 }]}
            activeOpacity={0.8}
            onPress={onSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Ionicons name="search" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  blueBackground: {
    backgroundColor: Colors.primary,
    paddingBottom: 70,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  searchCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginTop: -40,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  searchTitle: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
