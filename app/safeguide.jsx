import { Image, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../helper/common';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';

const safeGuide = {
  Earthquakes: {
    tips: [
      "Move away from all glass and breakable objects",
      "Identify safe places like door frames or under heavy furniture",
      "Hide under a strong desk or table, and cover your head and neck",
      "Stay in a secure location until told it’s safe",
      "Locate your emergency kit if needed",
      "Stay in communication with local authorities and disaster responders",
      "Stay low to the ground to avoid falling debris",
      "If you're outside, find an open area away from buildings and trees",
    ],
  },
  Wildfires: {
    tips: [
      "Remove flammable materials from your home’s exterior, such as leaves and firewood",
      "Shut off gas systems and secure all fuel sources",
      "Soak your roof and plants near your building or home if time permits",
      "Shut all windows and doors",
      "Follow evacuation directions from city officials and authorities",
      "Stay connected to the news and monitor the situation",
      "Stay close to a body of water, stream, or less flammable area like a mountain backside if surrounded",
      "Wear protective clothing like a long-sleeved shirt and pants",
      "Use an N95 mask to avoid inhaling smoke and particulates",
    ],
  },
  Floods: {
    tips: [
      "Move to higher ground immediately",
      "Avoid walking or driving through floodwaters",
      "Turn off gas, electricity, and water before evacuating",
      "Listen to local warnings and emergency updates",
      "Do not touch electrical equipment if standing in water",
      "Keep an emergency supply kit with food, water, and essentials",
      "Avoid bridges over fast-moving water",
      "If trapped in a building, move to the highest level but avoid attics",
    ],
  },
  Hurricanes: {
    tips: [
      "Stay indoors and away from windows",
      "Secure all doors and close interior doors",
      "Move to a small, windowless room on the lowest floor",
      "Charge mobile devices and keep emergency contacts handy",
      "Have an emergency supply kit with water, food, and medications",
      "Evacuate if ordered by local authorities",
      "Avoid using candles; use flashlights instead",
      "Do not return home until officials say it’s safe",
    ],
  },
  Tornadoes: {
    tips: [
      "Seek shelter in a basement or an interior room on the lowest floor",
      "Stay away from windows, doors, and outside walls",
      "Cover yourself with a mattress or heavy blankets for protection",
      "If in a mobile home, evacuate immediately to a sturdy building",
      "If caught outdoors, lie flat in a ditch and cover your head",
      "Do not try to outrun a tornado in a vehicle; seek shelter instead",
      "Listen to local weather reports for updates",
    ],
  },
  Tsunamis: {
    tips: [
      "Move to higher ground immediately if near the coast",
      "Do not return to low-lying areas until authorities declare it safe",
      "Follow tsunami evacuation routes posted in coastal areas",
      "Listen to emergency warnings via radio or mobile alerts",
      "If you feel an earthquake near the coast, expect a tsunami",
      "Never go to the shore to watch a tsunami approach",
      "Avoid rivers and streams that lead to the ocean",
    ],
  },
  Landslides: {
    tips: [
      "Move to higher ground away from slopes, cliffs, and riverbanks",
      "Be alert to unusual sounds like rumbling or cracking noises",
      "Stay away from areas with recent wildfires or heavy rain",
      "Watch for sudden changes in water levels in streams or rivers",
      "Evacuate if local authorities issue warnings",
      "After a landslide, avoid affected areas due to unstable ground",
      "Report broken utility lines or infrastructure damage",
    ],
  },
  Blizzards: {
    tips: [
      "Stay indoors and keep warm with extra layers of clothing",
      "Avoid travel unless absolutely necessary",
      "Keep emergency food, water, and heating supplies on hand",
      "Watch out for frostbite and hypothermia symptoms",
      "Use generators outdoors only to avoid carbon monoxide poisoning",
      "Check on neighbors, especially the elderly and vulnerable",
      "Keep pets indoors and provide adequate warmth",
    ],
  },
  Heatwaves: {
    tips: [
      "Stay hydrated and drink plenty of water",
      "Avoid outdoor activities during peak heat hours",
      "Wear light, loose-fitting clothing",
      "Stay indoors in air-conditioned spaces if possible",
      "Never leave children or pets in parked vehicles",
      "Use fans and cool showers to lower body temperature",
      "Check on elderly relatives and neighbors",
    ],
  },
};


const SafeGuide = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const filterSafeGuide = () => {
    if (!searchText.trim()) return safeGuide;

    const filtered = {};
    Object.keys(safeGuide).forEach((category) => {
      if (category.toLowerCase().includes(searchText.toLowerCase())) {
        filtered[category] = safeGuide[category];
      }
    });

    return filtered;
  };

  const filteredSafeGuide = filterSafeGuide();

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton router={router} />
            <Image resizeMode="contain" source={require('../assets/images/SafeNetText.png')} style={styles.logo} />
          </View>
          <View style={{ padding: 20 }}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search disaster type (e.g., Earthquakes)"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <ScrollView style={styles.scrollContainer}>
              {Object.keys(filteredSafeGuide).map((category) => (
                <View key={category} style={styles.categoryBox}>
                  <Text style={styles.categoryTitle}>{category}</Text>
                  {filteredSafeGuide[category].tips.map((item, index) => (
                    <Text key={`tip-${index}`} style={styles.guidelineText}>
                      • {item}
                    </Text>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SafeGuide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(100),
    alignItems: 'center',
  },
  logo: {
    width: wp(25),
    height: hp(5),
  },
  searchBar: {
    marginTop: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eaeaea',
    fontSize: 16,
  },
  scrollContainer: {
    marginTop: 20,
  },
  categoryBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  guidelineText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    marginVertical: 5,
  },
});
