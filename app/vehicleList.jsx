import { Alert, Image, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import axios from '../config/axiosConfig';  // Ensure axios is properly imported and configured

const VehicleList = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch vehicles data from the API
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://192.168.215.52:5000/api/vehicle');
        
        // Sort vehicles by id in descending order (latest first)
        const sortedVehicles = response.data.sort((a, b) => b.id - a.id);
        
        setVehicles(sortedVehicles); // Set the sorted data to the state
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        if (error.response && error.response.status === 404) {
          setError('No vehicles found.');
        } else {
          setError('Failed to fetch vehicle data. Please try again later.');
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchVehicles();
  }, []);

  const filterVehicles = () => {
    return vehicles.filter((vehicle) =>
      vehicle.district.toLowerCase().includes(searchText.toLowerCase()) ||
      searchText === ''
    );
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ScreenWrapper>
    );
  }

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
              onChangeText={(text) => setSearchText(text)} // Updating state on text change
            />

            <ScrollView style={styles.listContainer}>
              {filterVehicles().map((vehicle, index) => (
                <View key={index} style={styles.vehicleCard}>
                  <View style={styles.vehicleInfo}>
                    <Text style={styles.vehicleName}>{vehicle.vehicle_model} ({vehicle.vehicle_type})</Text>
                    <Text style={styles.vehicleDetails}>Owner: {vehicle.owner_name}</Text>
                    <Text style={styles.vehicleDetails}>District: {vehicle.district}</Text>
                    <Text style={styles.vehicleDetails}>{vehicle.phone_number}</Text>
                  </View>
                  <TouchableOpacity style={styles.callButton} onPress={() => handleCall(vehicle.phone_number)}>
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

export default VehicleList;

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});