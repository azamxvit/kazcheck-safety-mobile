// components/widgets/auth/OtpInput.tsx
import { useRef } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../../constants/Colors';

const OTP_LENGTH = 6;

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export function OtpInput({ value, onChange }: Props) {
  const inputRef = useRef<TextInput>(null);

  const digits = value.split('');

  return (
    <Pressable style={styles.container} onPress={() => inputRef.current?.focus()}>
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.box,
            digits[i] ? styles.boxFilled : null,
            i === digits.length ? styles.boxActive : null,
          ]}
        >
          {/* Курсор-мигалка на активном боксе */}
          <TextInput
            style={styles.digit}
            value={digits[i] || ''}
            editable={false}
            caretHidden={true}
          />
          {i === digits.length && <View style={styles.cursor} />}
        </View>
      ))}

      {/* Скрытый реальный инпут который принимает ввод */}
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={value}
        onChangeText={(text) => {
          const clean = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
          onChange(clean);
        }}
        keyboardType="number-pad"
        autoFocus
        maxLength={OTP_LENGTH}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  box: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxFilled: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}08`,
  },
  boxActive: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  digit: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    padding: 0,
  },
  cursor: {
    width: 2,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
