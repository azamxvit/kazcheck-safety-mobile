// app/login.tsx
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabase';
import { Colors } from '../constants/Colors';
import { AuthHeader } from '../components/sections/auth/AuthHeader';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('+7');
  const [isLoading, setIsLoading] = useState(false);

  const isValid = phone.length >= 11;

  const handleSendOtp = async () => {
    if (!isValid || isLoading) return;
    setIsLoading(true);

    try {
      const cleanPhone = phone.replace(/[\s()\-]/g, '');

      const { error } = await supabase.auth.signInWithOtp({
        phone: cleanPhone,
      });

      if (error) throw error;

      router.push({ pathname: '/verify', params: { phone: cleanPhone } });
    } catch (err: any) {
      Alert.alert('Ошибка', err.message || 'Не удалось отправить SMS');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AuthHeader
        title="Войдите в аккаунт"
        subtitle="Введите номер телефона — отправим код подтверждения"
      />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Номер телефона</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="+7 XXX XXX XXXX"
            placeholderTextColor={Colors.textSecondary}
            autoFocus
          />
          <Text style={styles.hint}>Мы отправим SMS с кодом подтверждения</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, (!isValid || isLoading) && styles.buttonDisabled]}
          onPress={handleSendOtp}
          disabled={!isValid || isLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Отправляем SMS...' : 'Получить код'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { flex: 1, padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 24,
    marginTop: 24,
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    paddingVertical: 8,
  },
  hint: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 8,
    lineHeight: 18,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#E5E5EA',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
