import { ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../constants/Colors';
import { MapHeader } from '../components/sections/map/MapHeader';
import { ScamTypesLegend } from '../components/widgets/map/ScamTypesLegend';
import { FeaturedRegionCard } from '../components/widgets/map/FeaturedRegionCard';
import { TopCitiesList } from '../components/widgets/map/TopCitiesList';

export default function MapScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
        <MapHeader />
        <ScamTypesLegend />
        <FeaturedRegionCard />
        <TopCitiesList />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Глобальный серый фон
  },
});
