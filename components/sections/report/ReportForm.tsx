import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { globalStyles } from '../../../constants/Styles';

const SCAM_TYPES = [
  'Банковское мошенничество',
  'Инвестиционные схемы',
  'Фейковая полиция',
  'Кредитные схемы',
  'Спам звонки',
  'Другое'
];

export function ReportForm() {
  const [phone, setPhone] = useState('+7 ');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const isFormValid = phone.length > 5 && selectedType !== null;

  const handleSubmit = () => {
    if (!isFormValid) return;
    console.log('Отправка жалобы:', { phone, selectedType, description });
  };

  return (
    <View style={styles.container}>
      {/* Поле: Номер телефона */}
      <View style={styles.field}>
        <Text style={styles.label}>Номер телефона *</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="+7 (7XX) XXX-XX-XX"
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      {/* Поле: Тип мошенничества */}
      <View style={styles.field}>
        <Text style={styles.label}>Тип мошенничества *</Text>
        <View style={styles.typeGrid}>
          {SCAM_TYPES.map((type) => {
            const isSelected = selectedType === type;
            return (
              <TouchableOpacity
                key={type}
                style={[styles.typeButton, isSelected && styles.typeButtonActive]}
                onPress={() => setSelectedType(type)}
              >
                <Text style={[styles.typeText, isSelected && styles.typeTextActive]}>
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Поле: Описание */}
      <View style={styles.field}>
        <Text style={styles.label}>Описание ситуации (необязательно)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Расскажите, что произошло..."
          placeholderTextColor={Colors.textSecondary}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Text style={styles.hint}>
          Ваше описание поможет другим пользователям распознать мошенников
        </Text>
      </View>

      {/* Кнопка отправки */}
      <TouchableOpacity
        style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
        disabled={!isFormValid}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Отправить жалобу</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 16,
    color: Colors.text,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  typeGrid: {
    gap: 8,
  },
  typeButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  typeButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: '#F0F5FF', // Очень светлый синий фон для выбранного
  },
  typeText: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  typeTextActive: {
    color: Colors.primary,
  },
  hint: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 8,
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D1D6', // Серый цвет, если форма не заполнена
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});