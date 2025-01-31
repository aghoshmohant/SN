import { Alert, Image, Pressable, StyleSheet, Text, View, Linking } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { hp, wp } from '../helper/common';
import { Picker } from '@react-native-picker/picker';

const camps = [
  {
    id: 1,
    campName: 'Camp Alpha',
    location: 'Thiruvananthapuram',
    maxCapacity: 100,
    currentPeople: 75,
    mapLink: 'https://goo.gl/maps/xyz',
    contactNumber: '+911234567890',
  },
  {
    id: 2,
    campName: 'Camp Beta',
    location: 'Kollam',
    maxCapacity: 150,
    currentPeople: 120,
    mapLink: 'https://goo.gl/maps/abc',
    contactNumber: '+911234567891',
  },
  {
    id: 3,
    campName: 'Camp Gamma',
    location: 'Ernakulam',
    maxCapacity: 200,
    currentPeople: 180,
    mapLink: 'https://goo.gl/maps/def',
    contactNumber: '+911234567892',
  },
  // Add more camps as needed
];

const districts = [
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod',
];

const CampList = () => {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filteredCamps, setFilteredCamps] = useState(camps);

  const handleMapPress = (mapLink) => {
    Linking.openURL(mapLink).catch(err => Alert.alert("Couldn't load page", err));
  };

  const handleCallPress = (contactNumber) => {
    Linking.openURL(`tel:${contactNumber}`).catch(err => Alert.alert("Couldn't make a call", err));
  };

  const handleSearch = () => {
    if (selectedDistrict) {
      const filtered = camps.filter(camp => camp.location === selectedDistrict);
      setFilteredCamps(filtered);
    } else {
      setFilteredCamps(camps); // Reset to show all camps if no district is selected
    }
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
          <Text style={styles.Heading}>Camp List</Text>
        </View>

        {/* District Picker and Search Button */}
        <View style={styles.searchContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDistrict}
              onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select District" value="" />
              {districts.map((district, index) => (
                <Picker.Item key={index} label={district} value={district} />
              ))}
            </Picker>
          </View>

          <Pressable style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </Pressable>
        </View>

        {/* Camp List */}
        <View style={styles.listContainer}>
          {filteredCamps.map((camp) => (
            <View key={camp.id} style={styles.campContainer}>
              <Text style={styles.campText}><Text style={styles.boldText}>Camp Name:</Text> {camp.campName}</Text>
              <Text style={styles.campText}><Text style={styles.boldText}>Location:</Text> {camp.location}</Text>
              <Text style={styles.campText}><Text style={styles.boldText}>Max Capacity:</Text> {camp.maxCapacity}</Text>
              <Text style={styles.campText}><Text style={styles.boldText}>Current People:</Text> {camp.currentPeople}</Text>

              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => handleMapPress(camp.mapLink)}>
                  <Text style={styles.buttonText}>View on Map</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => handleCallPress(camp.contactNumber)}>
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

export default CampList;

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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  picker: {
    height: hp(6),
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16, // Adjust font size if needed
  },
  listContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  campContainer: {
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
  campText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
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