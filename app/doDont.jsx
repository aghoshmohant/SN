import { Image, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../helper/common';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';

const guidelines = {
  Earthquakes: {
    dos: [
      "Move away from all glass and breakable objects",
      "Identify safe places like door frames or under heavy furniture",
      "Hide under a strong desk or table, and cover your head and neck",
      "Stay in a secure location until told it’s safe",
      "Locate your emergency kit if needed",
      "Stay in communication with local authorities and disaster responders",
      "Stay low to the ground to avoid falling debris",
      "If you're outside, find an open area away from buildings and trees",
    ],
    donts: [
      "Move around or try to outrun the situation",
      "Drive during an earthquake",
      "Go near any live wires or debris",
      "Enter a building until it is inspected and deemed safe if outdoors",
      "Stand near windows or glass",
      "Use elevators during or after an earthquake",
    ],
  },
  Wildfires: {
    dos: [
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
    donts: [
      "Go near a live wildfire",
      "Attempt to control a wildfire",
      "Return home until deemed safe",
      "Leave your vehicle engine on in a directly affected area; get low in the vehicle with the engine off",
      "Use water-hose during strong winds as it may spread the fire further",
      "Leave pets behind if evacuated",
    ],
  },
  Hurricanes: {
    dos: [
      "Track the hurricane and prepare accordingly",
      "Gather supplies like food, water, medicines, and batteries",
      "Install storm shutters and reinforce doors",
      "Store loose exterior items like outdoor furniture in a safe location",
      "Sterilize the bath tub and fill it with water for use during a power outage",
      "Be aware of flood risks in your area and secure low-lying items",
      "Evacuate if instructed to",
      "Stay inside and away from windows",
      "Wait until officials deem it safe to leave your home",
      "Take photos for insurance and document the damage",
      "Charge your mobile devices and ensure they’re full",
    ],
    donts: [
      "Avoid electrical equipment or anything plugged into the wall",
      "Do not enter a body of water, as it may be contaminated or contain hidden dangers",
      "Do not go near live wires, fallen trees, or other hazards",
      "Do not run a generator indoors or in an enclosed space",
      "Do not go outside during the storm until the danger has passed",
    ],
  },
  Tornados: {
    dos: [
      "Get into the basement or storm cellar immediately",
      "Cover your head and neck with your hands and arms to protect from debris",
      "If outside, lie in a ditch and cover up with anything available",
      "Wait until the tornado has completely passed before moving",
      "Drive away from the tornado's path if you’re in a car, but don’t try to outrun it",
      "Stay away from windows and large glass areas",
      "Have an emergency kit with food, water, and important documents",
    ],
    donts: [
      "Take shelter in a flimsy structure like a mobile home or shed",
      "Seek shelter under an overpass or bridge (unsafe due to wind turbulence)",
      "Use an elevator in a building during a tornado",
      "Stand by or look out of windows",
      "Stand near heavy objects that could fall and cause injury",
      "Attempt to chase, film, or document a tornado while it's near",
    ],
  },
  Cyclones: {
    dos: [
      "Evacuate if advised by local authorities to avoid storm surges",
      "Stock up on emergency supplies like non-perishable food, water, and medications",
      "Secure windows and doors with storm shutters, plywood, or tape",
      "Stay indoors and away from windows until the cyclone passes",
      "Monitor the situation through official weather channels and news",
      "If you live in a low-lying area, move to higher ground or a more secure location",
    ],
    donts: [
      "Do not stay near windows, doors, or skylights",
      "Do not venture outside until local authorities declare the area safe",
      "Avoid using electrical appliances if there is a power outage",
      "Do not drive through flooded or wind-damaged roads",
    ],
  },
  Floods: {
    dos: [
      "Move to higher ground if you live in a flood-prone area",
      "Monitor local news, weather stations, and official sources for flood updates",
      "Stay indoors and away from windows and doors",
      "Have an evacuation plan in place if your home is at risk",
      "Keep emergency supplies on hand, including blankets, flashlights, and first aid kits",
      "Stay informed of flood warnings through local alerts or apps",
    ],
    donts: [
      "Do not drive through flooded roads, even if you think they’re shallow",
      "Avoid contact with floodwater due to contamination from sewage or chemicals",
      "Do not attempt to swim or wade through floodwaters",
      "Avoid using electrical equipment in flooded areas",
      "Do not wait to evacuate when instructed by authorities",
    ],
  },
  Landslides: {
    dos: [
      "Move to higher ground immediately if you are in a landslide-prone area",
      "Stay away from unstable slopes or cliffs",
      "Monitor weather and geological conditions for signs of an impending landslide",
      "Listen to emergency services for evacuation or shelter instructions",
      "If a landslide occurs, stay low and away from falling debris",
    ],
    donts: [
      "Do not cross areas with visible cracks or shifting ground",
      "Avoid returning to affected areas until it's safe and cleared by officials",
      "Do not build or set up structures near unstable slopes",
    ],
  },
  Tsunamis: {
    dos: [
      "Move to higher ground immediately after receiving a tsunami warning",
      "Listen to local authorities and evacuate if necessary",
      "Stay away from coastal areas and low-lying regions",
      "Monitor official tsunami alerts and updates",
      "Prepare an emergency evacuation kit with essentials like food and water",
    ],
    donts: [
      "Do not wait for the first wave to pass; evacuate immediately",
      "Do not return to coastal areas until declared safe",
      "Avoid using electronic devices in the aftermath to preserve battery life",
    ],
  },
  HeatWaves: {
    dos: [
      "Stay hydrated by drinking plenty of water throughout the day",
      "Stay indoors during the hottest parts of the day, usually from 11 AM to 3 PM",
      "Wear lightweight, light-colored clothing and a wide-brimmed hat for protection",
      "Use fans, air conditioning, or cool compresses to regulate body temperature",
      "Take cool showers or baths to lower your body temperature",
      "Monitor the elderly, infants, and pets for signs of heat-related illness",
    ],
    donts: [
      "Do not leave children, elderly people, or pets in a hot car",
      "Avoid alcohol, caffeine, or sugary drinks as they can cause dehydration",
      "Do not ignore signs of heat exhaustion or heatstroke like dizziness or nausea",
      "Do not perform strenuous activities outdoors during peak heat hours",
    ],
  },
  UrbanFloods: {
    dos: [
      "Move to higher ground if you live in a low-lying, flood-prone area",
      "Install sump pumps and ensure proper drainage around your property",
      "Keep emergency supplies like food, water, and medications on hand",
      "Monitor flood warnings from local authorities",
      "Have an evacuation route planned in case the flood worsens",
    ],
    donts: [
      "Do not drive or walk through flooded streets",
      "Avoid contact with floodwater to prevent illness",
      "Do not use electrical equipment if you suspect it’s been exposed to water",
    ],
  },
  Fires: {
    dos: [
      "Ensure your home has working smoke detectors and fire extinguishers",
      "Create a fire escape plan with family members and practice it regularly",
      "Keep flammable materials away from heat sources",
      "Evacuate immediately if you detect smoke or fire",
      "Close all windows and doors to slow the fire's spread",
      "Call emergency services and provide clear details about your location",
      "If caught in smoke, crawl low to the ground where the air is clearer",
    ],
    donts: [
      "Do not try to fight a large fire on your own",
      "Avoid using water on electrical or grease fires",
      "Do not open windows or doors in the early stages of a fire",
    ],
  },
};


const DoDont = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const filterGuidelines = () => {
    if (!searchText.trim()) return guidelines;

    const filtered = {};
    Object.keys(guidelines).forEach((category) => {
      if (category.toLowerCase().includes(searchText.toLowerCase())) {
        filtered[category] = guidelines[category];
      }
    });

    return filtered;
  };

  const filteredGuidelines = filterGuidelines();

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image resizeMode="contain" source={require('../assets/images/SafeNetText.png')} style={styles.logo} />
        </View>
        <View style={{padding:20}}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search disaster type (e.g., Earthquakes)"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <ScrollView style={styles.scrollContainer}>
          {Object.keys(filteredGuidelines).map((category) => (
            <View key={category} style={styles.categoryBox}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <Text style={styles.subTitle}>Do's</Text>
              {filteredGuidelines[category].dos.map((item, index) => (
                <Text key={`do-${index}`} style={styles.guidelineText}>
                  {`• ${item}`}
                </Text>
              ))}
              <Text style={styles.subTitle}>Don'ts</Text>
              {filteredGuidelines[category].donts.map((item, index) => (
                <Text key={`dont-${index}`} style={styles.guidelineText}>
                  {`• ${item}`}
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

export default DoDont;

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
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#444',
  },
  guidelineText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 2,
  },
});
