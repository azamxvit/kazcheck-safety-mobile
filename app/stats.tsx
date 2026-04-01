import { View, Text } from 'react-native';
import { globalStyles } from '../constants/Styles';

export default function Screen() {
  return (
    <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text>В разработке...</Text>
    </View>
  );
}
