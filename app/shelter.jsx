import { Alert, Image, Pressable, StyleSheet, Text, View, Linking, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { hp, wp } from '../helper/common';
import axios from 'axios'; // Import Axios

const shelter = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [allCamps, setAllCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch camp data from the API using Axios
  useEffect(() => {
    const fetchCampData = async () => {
      try {
        const response = await axios.get('http://192.168.215.52:5000/api/camps'); // Replace with your API URL
        setAllCamps(response.data); // Store the original data
        setFilteredCamps(response.data); // Initially display all camps
      } catch (err) {
        setError('Error fetching camp data');
        Alert.alert('Error', 'Could not fetch camp data');
      } finally {
        setLoading(false);
      }
    };

    fetchCampData();
  }, []);

  // Filter camps based on the search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = allCamps.filter(camp => camp.district.toLowerCase().includes(query.toLowerCase()));
      setFilteredCamps(filtered);
    } else {
      // If the search query is empty, display all camps
      setFilteredCamps(allCamps);
    }
  };

  const handleMapPress = (mapLink) => {
    Linking.openURL(mapLink).catch(err => Alert.alert("Couldn't load page", err));
  };

  const handleCallPress = (contactNumber) => {
    Linking.openURL(`tel:${contactNumber}`).catch(err => Alert.alert("Couldn't make a call", err));
  };

  // Loading state rendering
  if (loading) {
    return (
      <ScreenWrapper>
        <StatusBar style='dark' />
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </ScreenWrapper>
    );
  }

  // Error state rendering
  if (error) {
    return (
      <ScreenWrapper>
        <StatusBar style='dark' />
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <StatusBar style='dark' />
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image resizeMode='contain' source={require('../assets/images/SafeNetText.png')} style={styles.logo} />
        </View>

        <View>
          <Text style={styles.Heading}>Camp List</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by district"
            value={searchQuery}
            onChangeText={handleSearch} // Filter camps on text change
          />
        </View>

        {/* Camp List */}
        <View style={styles.listContainer}>
          {filteredCamps.map((camp) => (
            <View key={camp.id} style={styles.campContainer}>
              <Text style={styles.campText}><Text style={styles.boldText}>Camp Name:</Text> {camp.camp_name}</Text>
              <Text style={styles.campText}><Text style={styles.boldText}>Current People:</Text> {camp.current_people}</Text>
              <Text style={styles.campText}><Text style={styles.boldText}>Max Capacity:</Text> {camp.max_capacity}</Text>
              <Text style={styles.campText}><Text style={styles.boldText}>Location:</Text> {camp.location}</Text>
              <Text style={styles.campText}><Text style={styles.boldText}>District:</Text> {camp.district}</Text>

              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => handleMapPress(camp.map_link)}>
                  <Text style={styles.buttonText}>View on Map</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => handleCallPress(camp.contact_number)}>
                  <Text style={styles.buttonText}>Call Camp</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default shelter;

const styles = StyleSheet.create({
  // Same styles as before, with minor updates
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
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
  Heading: {
    fontSize: hp(3),
    fontWeight: 'bold',
    paddingTop: 50,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  container: {
    backgroundColor: '#D9F8DB',
    height: '100%',
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  searchInput: {
    height: hp(6),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
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
