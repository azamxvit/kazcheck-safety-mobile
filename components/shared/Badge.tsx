import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

type BadgeProps = {
  text: string;
  type?: 'danger' | 'warning' | 'success' | 'default';
};

export function Badge({ text, type = 'danger' }: BadgeProps) {
  const getStyles = () => {
    switch (type) {
      case 'danger':
        return { bg: Colors.dangerLight, text: Colors.danger };
      case 'warning':
        return { bg: Colors.warningLight, text: Colors.warning };
      case 'success':
        return { bg: Colors.successLight, text: Colors.success };
      default:
        return { bg: '#F0F0F0', text: Colors.textSecondary };
    }
  };

  const theme = getStyles();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});
