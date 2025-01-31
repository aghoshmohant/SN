import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Linking } from 'react-native';
import { wp, hp } from '../helper/common';
import BackButton from '../components/BackButton';
import ScreenWrapper from '../components/ScreenWrapper';
import { useRouter } from 'expo-router';

const contacts = () => {
  const router = useRouter(); // Use the router from expo-router
  
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    { id: '1', name: 'Kerala State Disaster Management Authority (KSDMA)', number: '1070' },
    { id: '2', name: 'Emergency Operations Center', number: '0471-2331639' },
    { id: '3', name: 'Police Control Room', number: '112' },
    { id: '4', name: 'Fire and Rescue Services', number: '101' },
    { id: '5', name: 'Ambulance Services', number: '108' },
    { id: '6', name: 'Coastal Disaster Helpline', number: '1093' },
    { id: '7', name: 'Kerala Health Helpline (DISHA)', number: '104' },
    { id: '8', name: 'National Health Mission Helpline', number: '0471-2552056' },
    { id: '9', name: 'Flood Relief Helpline', number: '1077' },
    { id: '10', name: 'Landslide Emergency (Forest Dept.)', number: '0471-2321610' },
    { id: '11', name: 'Animal Rescue', number: '0471-2732217' },
    { id: '12', name: 'State Disaster Management Authority (SDMA)', number: '1010' },
    { id: '13', name: 'National Disaster Response Force (NDRF)', number: '112' },
    { id: '14', name: 'Flood Management Cell', number: '0422-2253660' },
    { id: '15', name: 'Cyclone Warning Center', number: '044-22362372' },
    { id: '16', name: 'Earthquake Helpline', number: '1011' },
    { id: '17', name: 'Fire Department Control', number: '040-2345055' },
    { id: '18', name: 'Tsunami Warning Center', number: '044-22362556' },
    { id: '19', name: 'Ambulance Service (National)', number: '108' },
    { id: '20', name: 'National Flood Relief Center', number: '1800-1000' },
  ]);

  // Filter data based only on the name
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCall = (number) => {
    const phoneNumber = `tel:${number}`;
    Linking.openURL(phoneNumber).catch((err) =>
      console.error('Error while opening caller:', err)
    );
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image
            resizeMode="contain"
            source={require('../assets/images/SafeNetText.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.body}>
          <TextInput
            style={styles.input}
            placeholder="Search by name..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.contactInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.number}>{item.number}</Text>
                </View>
                {/* Call Button */}
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleCall(item.number)}
                >
                  <Text style={styles.callButtonText}>Call</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(100),
    alignItems: 'center',
    marginBottom: hp(3),
  },
  logo: {
    width: wp(25),
    height: hp(5),
  },
  body: {
    padding: wp(4),
  },
  input: {
    height: 45,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#333',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: wp(5),
    borderRadius: 12,
    marginBottom: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  contactInfo: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  number: { fontSize: 16, color: '#555' },
  callButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(4),
    height: 45,
    width: 100,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default contacts;
