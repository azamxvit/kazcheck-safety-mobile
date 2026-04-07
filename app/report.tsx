import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { ScamTypeSelector } from '../components/widgets/report/ScamTypeSelector';
import { supabase } from '../supabase';

export default function ReportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Стейты формы
  const [phone, setPhone] = useState('+7');
  const [scamType, setScamType] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  // Стейты загрузки и ошибок
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Валидация
  const isFormValid = phone.length >= 11 && scamType !== null;

  const handleSubmit = async () => {
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error: upsertError } = await supabase.from('phone_numbers').upsert(
        {
          number: phone,
          fraud_type: scamType,
          last_reported: new Date().toISOString(),
        },
        {
          onConflict: 'number',
          ignoreDuplicates: false,
        }
      );

      if (upsertError) throw upsertError;

      // Инкремент количества жалоб
      await supabase.rpc('increment_report_count', { target_number: phone });

      const { error: insertError } = await supabase.from('reports').insert({
        phone_number: phone,
        fraud_type: scamType!,
        description: description || null,
        // user_id добавим позже, когда подключим авторизацию
      });

      if (insertError) throw insertError;

      router.push('/success');
    } catch (err: any) {
      console.error('Ошибка отправки жалобы:', err);
      setError('Не удалось отправить жалобу. Попробуйте ещё раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Сообщить о мошеннике</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.divider} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Номер телефона *</Text>
          <TextInput
            style={styles.input}
            placeholder="+ 7 XXX XXX XXXX"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            editable={!isLoading}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Тип мошенничества *</Text>
          <ScamTypeSelector selected={scamType} onSelect={setScamType} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Описание ситуации (необязательно)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Расскажите, что произошло..."
            placeholderTextColor={Colors.textSecondary}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
            editable={!isLoading}
          />
          <Text style={styles.helperText}>
            Ваше описание поможет другим пользователям распознать мошенников
          </Text>
        </View>

        {/* Вывод ошибки */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Кнопка отправки с индикатором загрузки */}
        <TouchableOpacity
          style={[styles.submitButton, (!isFormValid || isLoading) && styles.submitButtonDisabled]}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={!isFormValid || isLoading}
        >
          <Text
            style={[
              styles.submitButtonText,
              (!isFormValid || isLoading) && styles.submitButtonTextDisabled,
            ]}
          >
            {isLoading ? 'Отправка...' : 'Отправить жалобу'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  helperText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 8,
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#E5E5EA',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonTextDisabled: {
    color: '#999999',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
});
