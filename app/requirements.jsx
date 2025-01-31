import { Alert, Image, Pressable, StyleSheet, Text, View, Linking } from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { hp, wp } from '../helper/common';


const requirements = [
  {
    id: 1,
    itemName: 'Tents',
    quantity: 10,
    category: 'Shelter',
    campName: 'Camp Alpha',
    location: 'Thiruvananthapuram',
    mapLink: 'https://goo.gl/maps/xyz',
    phoneNumber: '+911234567890',
  },
  {
    id: 2,
    itemName: 'Blankets',
    quantity: 50,
    category: 'Bedding',
    campName: 'Camp Beta',
    location: 'Kollam',
    mapLink: 'https://goo.gl/maps/abc',
    phoneNumber: '+911234567891',
  },
  // Add more items as needed
];

const Organization = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleMapPress = (mapLink) => {
    Linking.openURL(mapLink).catch(err => Alert.alert("Couldn't load page", err));
  };

  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(err => Alert.alert("Couldn't make a call", err));
  };

  return (
    <ScreenWrapper>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image resizeMode='contain' source={require('../assets/images/SafeNetText.png')} style={styles.logo} />
        </View>

        <View>
          <Text style={styles.Heading}>Requirement List</Text>
        </View>

        <View style={styles.listContainer}>
          {requirements.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={styles.itemText}><Text style={styles.boldText}>Item:</Text> {item.itemName}</Text>
              <Text style={styles.itemText}><Text style={styles.boldText}>Quantity:</Text> {item.quantity}</Text>
              <Text style={styles.itemText}><Text style={styles.boldText}>Category:</Text> {item.category}</Text>
              <Text style={styles.itemText}><Text style={styles.boldText}>Camp:</Text> {item.campName}</Text>
              <Text style={styles.itemText}><Text style={styles.boldText}>Location:</Text> {item.location}</Text>

              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => handleMapPress(item.mapLink)}>
                  <Text style={styles.buttonText}>View on Map</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => handleCallPress(item.phoneNumber)}>
                  <Text style={styles.buttonText}>Call Camp</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Organization;

const styles = StyleSheet.create({
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
  Heading: {
    fontSize: hp(3),
    fontWeight: 'bold',
    paddingTop: 50,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  container: {
    backgroundColor: '#D9F8DB',
    height: hp(100),
  },
  listContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold', // Make column names bold
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});