// app/verify.tsx
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../supabase';
import { Colors } from '../constants/Colors';
import { AuthHeader } from '../components/sections/auth/AuthHeader';
import { OtpInput } from '../components/widgets/auth/OtpInput';

export default function VerifyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ phone: string }>();

  // Защита от string[]
  const phone = Array.isArray(params.phone) ? params.phone[0] : params.phone;

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const isValid = code.length === 6;

  const handleVerify = async () => {
    if (!isValid || isLoading) return;
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: code,
        type: 'sms',
      });

      if (error) throw error;
      router.replace('/');
    } catch (err: any) {
      Alert.alert('Неверный код', 'Проверьте код и попробуйте ещё раз');
      setCode('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: { channel: 'sms' },
      });
      if (error) throw error;
      Alert.alert('Готово', 'Код отправлен повторно');
    } catch (err: any) {
      Alert.alert('Ошибка', err.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AuthHeader title="Введите код" subtitle={`Мы отправили SMS на\n${phone}`} />

      <View style={styles.content}>
        <View style={styles.card}>
          <OtpInput value={code} onChange={setCode} />
        </View>

        <TouchableOpacity
          style={[styles.button, (!isValid || isLoading) && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={!isValid || isLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Проверяем...' : 'Подтвердить'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton} onPress={handleResend} disabled={isResending}>
          <Text style={styles.resendText}>
            {isResending ? 'Отправляем...' : 'Отправить код повторно'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 24,
    marginTop: 24,
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
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#E5E5EA',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  resendText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '500',
  },
});
