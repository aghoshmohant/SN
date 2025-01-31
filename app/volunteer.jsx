import { StyleSheet, Text, View, Image, Pressable, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helper/common';
import Input from '../components/Input';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import SignIn from '../components/SignIn';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker'

const volunteer = () => {
    const [image, setImage] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState();


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      const formatted = currentDate.toLocaleDateString('en-GB');
      setFormattedDate(formatted);
      toggleDatePicker();
    } else {
      toggleDatePicker();
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image resizeMode="contain" source={require('../assets/images/SafeNetText.png')} style={styles.logo} />
        </View>
          
          <View>
            <Text style={styles.Heading}>Volunteer Registration</Text>
          </View>
        <View style={styles.form}>
        <View style={styles.inp}>
          <Text style={styles.text}>Prefered Role</Text>
          <View style={styles.pic}>
          <Picker
            selectedValue={selectedLanguage}
             onValueChange={(itemValue, itemIndex) =>
             setSelectedLanguage(itemValue)
             }>
              <Picker.Item label="Prefered Role" value="null" style={{color:'rgba(0, 0, 0, 0.5)'}} />
              <Picker.Item label="Rescue Assistance" value="" />
              <Picker.Item label="Shelter Assistance" value=""/>
          </Picker>
          </View>
          </View>
          
          <Pressable 
         onPress={pickImage} 
            style={({ pressed }) => [
             styles.button,
            pressed && { opacity: 0.6 }, 
            ]}
            >
          <View style={styles.img}>
            <Text style={styles.buttonText}>Upload Certificate</Text>
            
            {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
            </Pressable>

            <View style={styles.inp}>
            <Text style={styles.text}>Please provide any certificate</Text>
          </View>

          <View style={styles.btn}>
            <SignIn title="Submit" />
          </View>

        </View>
      </View>
    </ScreenWrapper>
  );
};

export default volunteer;

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
  Heading:{
    fontSize:hp(3),
    fontWeight:'bold',
    paddingTop:50,
    textAlign:'center',
    textDecorationLine:'underline'
    
  },
  form: {
    color: 'red',
    paddingTop: 20,
  },
  btn: {
    paddingTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom:50,
  
  },
  container: {
    backgroundColor: '#D9F8DB',
    height:hp(100)
    
  },
  text: {
    fontSize: 15,
    paddingLeft: 17,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  inp: {
    marginTop: 25,
  },
  img:{
        backgroundColor:'#37b33f',
        height:hp(6),
        justifyContent:'center',
        alignItems:'center',
        borderCurve:'continuous',
        borderRadius:10,
        marginTop: 35,
        marginLeft: 50,
        marginRight: 50,
        

  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:hp(1.8),
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

});
