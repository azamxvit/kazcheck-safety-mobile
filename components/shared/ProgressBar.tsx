import { View, StyleSheet } from 'react-native';

type ProgressBarProps = {
  percentage: number;
  color: string;
};

export function ProgressBar({ percentage, color }: ProgressBarProps) {
  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <View style={styles.track}>
      <View 
        style={[
          styles.fill, 
          { width: `${safePercentage}%`, backgroundColor: color }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)', 
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});