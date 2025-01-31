import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View, } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { hp, wp } from '../helper/common'
import Input from '../components/Input'
import SignIn from '../components/SignIn'
import { Picker } from '@react-native-picker/picker'




const vehicle = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    
    <ScreenWrapper>
      <StatusBar style='dark'/>
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image resizeMode='contain' source={require('../assets/images/SafeNetText.png')} style={styles.logo}/>
        </View>

        <View>
            <Text style={styles.Heading}>Vehicle Registration</Text>
        </View>
        <View style={styles.form}>

          <View style={styles.inp}>
            <Text style={styles.text}>Owner Name</Text>
          <Input placeholder='Owner Name' 
          />
          </View>

          <View style={styles.inp}>
          <Text style={styles.text}>Vehicle Type</Text>
          <View style={styles.pic}>
          <Picker
            selectedValue={selectedLanguage}
             onValueChange={(itemValue, itemIndex) =>
             setSelectedLanguage(itemValue)
             }>
              <Picker.Item label="Vehicle Type" value="null" style={{color:'rgba(0, 0, 0, 0.5)'}} />
              <Picker.Item label="Ambulance" value="Ambulance" />
                <Picker.Item label="Fire Truck" value="Fire Truck" />
                <Picker.Item label="Rescue Vehicle" value="Rescue Vehicle" />
                <Picker.Item label="Utility Truck" value="Utility Truck" />
                <Picker.Item label="Water Tanker" value="Water Tanker" />
                <Picker.Item label="4x4 Off-road Vehicle" value="4x4 Off-road Vehicle" />
                <Picker.Item label="Dump Truck" value="Dump Truck" />
                <Picker.Item label="Logistics Vehicle" value="Logistics Vehicle" />
                <Picker.Item label="Command Vehicle" value="Command Vehicle" />
          </Picker>
          </View>
          </View>

          <View style={styles.inp}>
            <Text style={styles.text}>Vehicle Model</Text>
          <Input placeholder='Vehicle Model' 
          />
          </View>

          <View style={styles.inp}>
            <Text style={styles.text}>Phone Number</Text>
          <Input placeholder='Phone Number' 
          />
          </View>

          <View style={styles.inp}>
            <Text style={styles.text}>Email</Text>
          <Input placeholder='Email' 
          />
          </View>
             
          <View style={styles.inp}>
          <Text style={styles.text}>District</Text>
          <View style={styles.pic}>
          <Picker
            selectedValue={selectedLanguage}
             onValueChange={(itemValue, itemIndex) =>
             setSelectedLanguage(itemValue)
             }>
              <Picker.Item label="District" value="null" style={{color:'rgba(0, 0, 0, 0.5)'}} />
              <Picker.Item label="Thiruvananthapuram" value="Thiruvananthapuram" />
              <Picker.Item label="Kollam" value="Kollam" />
              <Picker.Item label="Pathanamthitta" value="Pathanamthitta" />
              <Picker.Item label="Alappuzha" value="Alappuzha" />
              <Picker.Item label="Kottayam" value="Kottayam" />
              <Picker.Item label="Idukki" value="Idukki" />
              <Picker.Item label="Ernakulam" value="Ernakulam" />
              <Picker.Item label="Thrissur" value="Thrissur" />
              <Picker.Item label="Palakkad" value="Palakkad" />
              <Picker.Item label="Malappuram" value="Malappuram" />
              <Picker.Item label="Kozhikode" value="Kozhikode" />
              <Picker.Item label="Wayanad" value="Wayanad" />
              <Picker.Item label="Kannur" value="Kannur" />
              <Picker.Item label="Kasaragod" value="Kasaragod" />
          </Picker>
          </View>
          </View>

          <View style={styles.button}>
          <SignIn title='Submit' />
          </View>
        </View>
      </View> 
      </ScrollView>
    </ScreenWrapper>
    
  )
}

export default vehicle

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    justifyContent:'space-between',
    width: wp(100),
    alignItems:'center',
    flex:1,
  },
  logo:{
    width: wp(25), // Adjust width of the logo
    height: hp(5),
  },
  Heading:{
    fontSize:hp(3),
    fontWeight:'bold',
    paddingTop:50,
    textAlign:'center',
    textDecorationLine:'underline'
    
  },
  
  form:{
    color:'red',
    paddingTop:20,
  },
  inp:{
    marginTop:25,
  },
  button:{
    paddingTop:35,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:30
  },
  container:{
    backgroundColor:'#D9F8DB',
    height:hp(100),
  },
  text:{
    fontSize:15,
    paddingLeft:17,
    paddingBottom:5,
    fontWeight:'bold'
  },
  footer:{ 
    flex:1,
    flexDirection:'row',
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
    
   

  },
  signupText:{
   fontSize:wp(3.5),
   paddingTop:200,
   

  },
  pic:{
    height:hp(7),
    borderWidth:0.4,
    borderColor:'black',
    borderRadius:10,
    borderCurve:'continuous',
    marginHorizontal:15,
    marginTop:0,
    gap:12,  


        

  },
  container:{
    height:'100%',
    backgroundColor:'#D9F8DB',

  }

  
  

})