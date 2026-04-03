import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { supabase } from '../../../supabase'; // <-- Путь до твоего index.ts с клиентом

const SCAM_TYPES = [
  'Банковское мошенничество',
  'Фейковый интернет-магазин',
  'Инвестиционные схемы',
  'Спам / Реклама',
  'Другое'
];

interface ReportFormProps {
  initialPhone?: string;
}

export function ReportForm({ initialPhone = '' }: ReportFormProps) {
  const router = useRouter();
  
  // Состояния (State) нашей формы
  const [phone, setPhone] = useState(initialPhone);
  const [scamType, setScamType] = useState(SCAM_TYPES[0]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!phone.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите номер телефона');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('reports')
        .insert({
          phone: phone.trim(),
          scam_type: scamType,
          comment: comment.trim()
        });

      if (error) throw error;

      // 3. Если всё ок — показываем успех и возвращаем на главную
      Alert.alert('Успех!', 'Спасибо за жалобу. Вы помогаете сделать связь безопаснее.', [
        { text: 'ОК', onPress: () => router.replace('/') }
      ]);

    } catch (error: any) {
      Alert.alert('Ошибка при отправке', error.message || 'Попробуйте позже');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Поле: Номер телефона */}
      <Text style={styles.label}>Номер телефона</Text>
      <TextInput
        style={styles.input}
        placeholder="+7 (7XX) XXX XX XX"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        editable={!isSubmitting}
      />

      {/* Поле: Тип мошенничества */}
      <Text style={styles.label}>Тип угрозы</Text>
      <View style={styles.chipsContainer}>
        {SCAM_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.chip, scamType === type && styles.chipActive]}
            onPress={() => setScamType(type)}
            disabled={isSubmitting}
          >
            <Text style={[styles.chipText, scamType === type && styles.chipTextActive]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Поле: Комментарий */}
      <Text style={styles.label}>Детали (необязательно)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Что они говорили? Как представились?"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
        editable={!isSubmitting}
      />

      {/* Кнопка отправки */}
      <TouchableOpacity 
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]} 
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Отправить жалобу</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});