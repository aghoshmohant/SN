import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Linking, Image } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';

const organizationList = () => {
  const organizations = [
    { name: 'Red Cross', phone: '9876543210', email: 'contact@redcross.org', district: 'Manhattan' },
    { name: 'Disaster Relief Fund', phone: '9123456789', email: 'help@drf.org', district: 'Downtown' },
    { name: 'Global Aid', phone: '9012345678', email: 'support@globalaid.org', district: 'South Side' },
    { name: 'Relief Corps', phone: '9871234567', email: 'info@reliefcorps.org', district: 'East End' },
    { name: 'Humanitarian Help', phone: '9543216789', email: 'assistance@humanhelp.org', district: 'North Gate' },
  ];

  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const filterOrganizations = () => {
    return organizations.filter((org) =>
      org.district.toLowerCase().includes(searchText.toLowerCase()) || searchText === ''
    );
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
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
              {filterOrganizations().map((org, index) => (
                <View key={index} style={styles.orgCard}>
                  <View style={styles.buttonContainer}><TouchableOpacity onPress={() => handleEmail(org.email)}>
                      <Image source={require('../assets/images/email.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCall(org.phone)}>
                      <Image source={require('../assets/images/phone.png')} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.orgInfo}>
                    <Text style={styles.orgName}>{org.name}</Text>
                    <Text style={styles.orgDetails}>District: {org.district}</Text>
                    <Text style={styles.orgDetails}>{org.phone}</Text>
                    <Text style={styles.orgDetails}>{org.email}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default organizationList;

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
    backgroundColor: '#eaeaea',
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 15,
  },
  listContainer: {
    marginTop: 10,
  },
  orgCard: {
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
  },
  orgInfo: {
    marginLeft: 15,
  },
  orgName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orgDetails: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
