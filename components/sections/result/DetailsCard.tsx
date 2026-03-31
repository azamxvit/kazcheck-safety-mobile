import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';
import { globalStyles } from '../../../constants/Styles';

interface Props {
  scamType: string;
  complaintsCount: number;
}

export function DetailsCard({ scamType, complaintsCount }: Props) {
  return (
    <View style={globalStyles.card}>
      <View style={styles.row}>
        <View style={styles.labelWrapper}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.primary} />
          <Text style={styles.labelTitle}>Детали</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.textLeft}>Тип мошенничества</Text>
        <Text style={styles.textRightBold}>{scamType}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.textLeft}>Количество жалоб</Text>
        <Text style={[styles.textRightBold, complaintsCount > 0 && { color: Colors.danger }]}>
          {complaintsCount} жалоб
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 12 },
  labelWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 },
  labelTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: Colors.text 
  },
  textLeft: { 
    fontSize: 14, 
    color: Colors.textSecondary 
  },
  textRightBold: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: Colors.text 
  },
  divider: { 
    height: 1, 
    backgroundColor: Colors.border, 
    width: '100%' 
  },
});