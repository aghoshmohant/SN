import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Linking } from 'react-native';
import { wp, hp } from '../helper/common';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton'; // Ensure proper import of BackButton
import { useRouter } from 'expo-router';

const bloodBank = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodBanks, setBloodBanks] = useState([
    // Thiruvananthapuram
    { id: '1', district: 'Thiruvananthapuram', name: 'Women & Children Hospital, Thycaud', number: '0471-2323457' },
    { id: '2', district: 'Thiruvananthapuram', name: 'Taluk Head Quarter Hospital, Chiryinkil', number: '0470-2646565' },
    { id: '3', district: 'Thiruvananthapuram', name: 'Medical College Hospital, Blood Bank', number: '0471-2528230' },
    { id: '4', district: 'Thiruvananthapuram', name: 'Regional Cancer Centre, Thiruvananthapuram', number: '0471-2447202' },
    { id: '5', district: 'Thiruvananthapuram', name: 'Sree Chitra Tirunal Institute for Medical Sciences and Technology', number: '0471-2520547' },
  
    // Kollam
    { id: '6', district: 'Kollam', name: 'Taluk Head Quarters Hospital, Kottakkara', number: '9447223157' },
    { id: '7', district: 'Kollam', name: 'Govt Hospital, Punalur', number: '9387324072' },
    { id: '8', district: 'Kollam', name: 'Kollam District Hospital', number: '0474-2796214' },
    { id: '9', district: 'Kollam', name: 'Kerala Institute of Medical Sciences', number: '0474-2750460' },
    { id: '10', district: 'Kollam', name: 'Sree Chitra Hospital', number: '0474-2740811' },
  
    // Pathanamthitta
    { id: '11', district: 'Pathanamthitta', name: 'General Hospital, Pathanamthitta', number: '9744837560' },
    { id: '12', district: 'Pathanamthitta', name: 'Pathanamthitta District Hospital', number: '0468-2221020' },
    { id: '13', district: 'Pathanamthitta', name: 'Medical College, Kottayam', number: '0481-2599046' },
    { id: '14', district: 'Pathanamthitta', name: 'Pushpagiri Medical College', number: '0469-2675200' },
    { id: '15', district: 'Pathanamthitta', name: 'Karunagappally Taluk Hospital', number: '0476-2632100' },
  
    // Kozhikode
    { id: '16', district: 'Kozhikode', name: 'Govt. General Hospital', number: '0495-2365917' },
    { id: '17', district: 'Kozhikode', name: 'Medical College Hospital Blood Bank', number: '0495-2350216' },
    { id: '18', district: 'Kozhikode', name: 'Baby Memorial Hospital', number: '0495-2720090' },
    { id: '19', district: 'Kozhikode', name: 'MIMS Blood Bank', number: '0495-2383001' },
    { id: '20', district: 'Kozhikode', name: 'Sree Gokulam Medical College', number: '0495-2310011' },
  
    // Palakkad
    { id: '21', district: 'Palakkad', name: 'District Hospital', number: '0491-2534524' },
    { id: '22', district: 'Palakkad', name: 'Palakkad Government Medical College', number: '0491-2553406' },
    { id: '23', district: 'Palakkad', name: 'Karunya Medical College', number: '0491-2902123' },
    { id: '24', district: 'Palakkad', name: 'Lions Blood Bank, Palakkad', number: '0491-2536767' },
    { id: '25', district: 'Palakkad', name: 'PVS Memorial Hospital', number: '0491-2537888' },
  
    // Ernakulam
    { id: '26', district: 'Ernakulam', name: 'Lisie Hospital Blood Bank', number: '0484-2400812' },
    { id: '27', district: 'Ernakulam', name: 'Amrita Institute of Medical Sciences Research Centre Blood Bank', number: '0484-4001234' },
    { id: '28', district: 'Ernakulam', name: 'Medical College Hospital, Ernakulam', number: '0484-2442371' },
    { id: '29', district: 'Ernakulam', name: 'Rajagiri Hospital Blood Bank', number: '0484-2668888' },
    { id: '30', district: 'Ernakulam', name: 'Kochi General Hospital Blood Bank', number: '0484-2368240' },
  
    // Idukki
    { id: '31', district: 'Idukki', name: 'District Hospital, Idukki', number: '04862-229000' },
    { id: '32', district: 'Idukki', name: 'Medical College Hospital, Kottayam', number: '0481-2599046' },
    { id: '33', district: 'Idukki', name: 'Aster MIMS Blood Bank', number: '0484-2402561' },
    { id: '34', district: 'Idukki', name: 'Kolenchery Medical College Hospital', number: '0484-2453499' },
    { id: '35', district: 'Idukki', name: 'Kottayam District Hospital', number: '0481-2585100' },
  
    // Alappuzha
    { id: '36', district: 'Alappuzha', name: 'Alappuzha District Hospital', number: '0477-2250482' },
    { id: '37', district: 'Alappuzha', name: 'Medical College Hospital, Alappuzha', number: '0477-2252110' },
    { id: '38', district: 'Alappuzha', name: 'Asha Hospital, Alappuzha', number: '0477-2235365' },
    { id: '39', district: 'Alappuzha', name: 'Kuttanadu Blood Bank', number: '0477-2285363' },
    { id: '40', district: 'Alappuzha', name: 'Sunrise Hospital Blood Bank', number: '0477-2235355' },
  
    // Kottayam
    { id: '41', district: 'Kottayam', name: 'Kottayam Medical College', number: '0481-2599046' },
    { id: '42', district: 'Kottayam', name: 'Kottayam District Hospital', number: '0481-2585100' },
    { id: '43', district: 'Kottayam', name: 'Pushpagiri Medical College', number: '0481-2239050' },
    { id: '44', district: 'Kottayam', name: 'Mariam Thressia Hospital', number: '0481-2371234' },
    { id: '45', district: 'Kottayam', name: 'St. George’s Medical College Hospital', number: '0481-2275210' },
  
    // Thrissur
    { id: '46', district: 'Thrissur', name: 'Medical College Hospital, Thrissur', number: '0487-2333185' },
    { id: '47', district: 'Thrissur', name: 'District Hospital, Thrissur', number: '0487-2331020' },
    { id: '48', district: 'Thrissur', name: 'Sree Chitra Hospital', number: '0487-2322222' },
    { id: '49', district: 'Thrissur', name: 'Irinjalakuda Taluk Hospital', number: '0480-2821620' },
    { id: '50', district: 'Thrissur', name: 'Holy Cross Hospital', number: '0487-2322892' },
  
    // Malappuram
    { id: '51', district: 'Malappuram', name: 'District Hospital, Malappuram', number: '0483-2737025' },
    { id: '52', district: 'Malappuram', name: 'Medical College Hospital, Manjeri', number: '0483-2760919' },
    { id: '53', district: 'Malappuram', name: 'Aster MIMS, Kottakkal', number: '0483-2840600' },
    { id: '54', district: 'Malappuram', name: 'Malabar Institute of Medical Sciences', number: '0483-2736721' },
   
  
  ]);
  

  // Filtered blood bank data based on search query (excluding number field)
  const filteredData = bloodBanks.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCall = (number) => {
    const phoneNumber = `tel:${number}`;
    Linking.openURL(phoneNumber).catch((err) => console.error('Error while opening caller:', err));
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      {/* Header with Back Button and Logo */}
      <View style={styles.header}>
        <BackButton router={router} />
        <Image resizeMode="contain" source={require('../assets/images/SafeNetText.png')} style={styles.logo} />
      </View>

      <View style={styles.container}>
        {/* Search Input */}
        <TextInput
          style={styles.input}
          placeholder="Search by name, district, or state..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        {/* List of Blood Banks */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.info}>
                <Text style={styles.district}>{item.district}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.number}>{item.number}</Text>
              </View>
              {/* Call Button */}
              <TouchableOpacity style={styles.callButton} onPress={() => handleCall(item.number)}>
                <Text style={styles.callButtonText}>Call</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginRight:10,
    marginLeft:5,
  },
  logo: {
    width: wp(25),
    height: hp(5),
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'column',
    flex: 1,
  },
  district: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  number: {
    fontSize: 14,
    color: 'gray',
  },
  callButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default bloodBank;
