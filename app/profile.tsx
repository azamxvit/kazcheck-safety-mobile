import { ScrollView, StyleSheet } from 'react-native';
import { ProfileHeader } from '../components/sections/profile/ProfileHeader';
import { ProfileStats } from '../components/sections/profile/ProfileStats';
import { ProfileMenu } from '../components/sections/profile/ProfileMenu';
import { Colors } from '../constants/Colors';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
      <ProfileHeader />
      <ProfileStats />
      <ProfileMenu />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
