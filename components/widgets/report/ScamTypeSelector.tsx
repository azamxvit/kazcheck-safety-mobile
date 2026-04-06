import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/Colors';

const SCAM_TYPES = [
  'Банковское мошенничество',
  'Инвестиционные схемы',
  'Фейковая полиция',
  'Кредитные схемы',
  'Спам звонки',
  'Другое',
];

type Props = {
  selected: string | null;
  onSelect: (type: string) => void;
};

export function ScamTypeSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {SCAM_TYPES.map((type) => {
        const isSelected = selected === type;
        return (
          <TouchableOpacity
            key={type}
            style={[styles.option, isSelected && styles.optionSelected]}
            onPress={() => onSelect(type)}
            activeOpacity={0.7}
          >
            <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{type}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  option: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#F4F9FF',
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
