import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SuccessMessage } from '../components/widgets/success/SuccessMessage';

export default function SuccessScreen() {
  const router = useRouter();

  useEffect(() => {
    // Устанавливаем таймер на 2.5 секунды
    const timer = setTimeout(() => {
      // replace заменяет текущий экран в истории, чтобы нельзя было вернуться назад свайпом
      router.replace('/');
    }, 2500);

    // Очищаем таймер, если компонент вдруг размонтируется раньше времени
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <SuccessMessage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
