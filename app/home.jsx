import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { hp, wp } from '../helper/common'
import { useRouter } from 'expo-router'

const home = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image source={require('../assets/images/SafeNetText.png')} resizeMode='contain' style={styles.logo}/>
        <View style={styles.header}>
          <Image source={require('../assets/images/SafeNet.png')} resizeMode='contain' style={styles.image}/>
        </View>
        <View style={styles.home}>
          <Pressable onPress={()=>router.push('contacts')} style={({ pressed }) => [
              styles.icon,
              pressed && { opacity: 0.5 },
            ]}>
          <View style={styles.icon}><Text>Emergency Contacts</Text></View>
          </Pressable>

          <Pressable onPress={()=>router.push('disasterTab')} style={({ pressed }) => [
              styles.icon,
              pressed && { opacity: 0.5 },
            ]}>
          <View style={styles.icon}><Text>Disaster</Text></View>
          </Pressable>

          <Pressable onPress={()=>router.push('requirements')} style={({ pressed }) => [
              styles.icon,
              pressed && { opacity: 0.5 },
            ]}>
          <View style={styles.icon}><Text>Essential supplies</Text></View>
          </Pressable>
          
          <Pressable onPress={()=>router.push('bloodTab')} style={({ pressed }) => [
              styles.icon,
              pressed && { opacity: 0.5 },
            ]}>
          <View style={styles.icon}><Text>Blood Bank</Text></View>
          </Pressable>
          
          <Pressable onPress={()=>router.push('volunteerTab')} style={({ pressed }) => [
              styles.icon,
              pressed && { opacity: 0.5 },
            ]}>
          <View style={styles.icon}><Text>Volunteer</Text></View>
          </Pressable>
          
          <Pressable onPress={()=>router.push('vehicleTab')} style={({ pressed }) => [
              styles.icon,
              pressed && { opacity: 0.5 },
            ]}>
          <View style={styles.icon}><Text>Vehicle</Text></View>
          </Pressable>
          
          <Pressable onPress={()=>router.push('shelter')} style={({ pressed }) => [
              styles.icon,
              pressed && { opacity: 0.5 },
            ]}>
          <View style={styles.icon}><Text>Shelter</Text></View>
          </Pressable>

          <Pressable onPress={()=>router.push('safeguide')} style={({ pressed }) => [
              styles.icon,
              pressed && { opacity: 0.5 },
            ]}>
          <View style={styles.icon}><Text>SafeGuide</Text></View>
          </Pressable>
          
          <Pressable onPress={()=>router.push('doDont')} style={({ pressed }) => [
              styles.icon,
              pressed && { opacity: 0.5 },
            ]}>
          <View style={styles.icon}><Text>Do,Dont</Text></View>
          </Pressable>
          
          
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default home

const styles = StyleSheet.create({
  logo:{
    width: wp(25),
    height: hp(5),
    marginBottom:20,
    marginLeft:5,
  },
  image:{
    width:wp(95),
    height:200,
    backgroundColor:'#D9F8DB',
    marginLeft:wp(2.5)
  },
  home:{
    flex: 1,
    flexDirection: 'row', // Place boxes in a row
    flexWrap: 'wrap',     // Wrap rows when space is insufficient
    justifyContent: 'space-around', // Center horizontally
    alignContent: 'center',
    marginTop:230

  },
  icon:{
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

  }
})