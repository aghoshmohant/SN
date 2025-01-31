import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Linking, Image } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';

const vehicleList = () => {
  const vehicles = [
    { owner: 'John Doe', phone: '9876543210', type: 'SUV', name: 'Fortuner', district: 'Manhattan' },
    { owner: 'Alice Johnson', phone: '9123456789', type: '4x4', name: 'Thar', district: 'Downtown' },
  ];

  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const filterVehicles = () => {
    return vehicles.filter((vehicle) =>
      vehicle.district.toLowerCase().includes(searchText.toLowerCase()) ||
      searchText === ''
    );
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton router={router} />
            <Image source={require('../assets/images/SafeNetText.png')} style={styles.safeNetTextImage} />
          </View>
          <View style={styles.body}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search by District"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />

            <ScrollView style={styles.listContainer}>
              {filterVehicles().map((vehicle, index) => (
                <View key={index} style={styles.vehicleCard}>
                  <View style={styles.vehicleInfo}>
                    <Text style={styles.vehicleName}>{vehicle.name} ({vehicle.type})</Text>
                    <Text style={styles.vehicleDetails}>Owner: {vehicle.owner}</Text>
                    <Text style={styles.vehicleDetails}>District: {vehicle.district}</Text>
                    <Text style={styles.vehicleDetails}>{vehicle.phone}</Text>
                  </View>
                  <TouchableOpacity style={styles.callButton} onPress={() => handleCall(vehicle.phone)}>
                    <Text style={styles.callButtonText}>Call</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default vehicleList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 5,
  },
  body: {
    padding: 20,
  },
  safeNetTextImage: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  searchBar: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
  },
  listContainer: {
    marginTop: 10,
  },
  vehicleCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vehicleDetails: {
    fontSize: 16,
    color: '#555',
  },
  callButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
