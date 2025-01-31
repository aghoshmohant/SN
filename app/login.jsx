import { Alert, Image, Pressable, StyleSheet, Text, View, } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { hp, wp } from '../helper/common'
import Input from '../components/Input'
import SignIn from '../components/SignIn'




const login = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

const onSubmit = ()=>{

  if (!emailRef.current || !passwordRef.current) {
    Alert.alert('Login',"Please fill all the fields!");
    return;
  }

}

  return (
    <ScreenWrapper>
      <StatusBar style='dark'/>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image resizeMode='contain' source={require('../assets/images/SafeNetText.png')} style={styles.logo}/>
        </View>

        <View>
          <Text style={styles.welcomeText}>Hi, Welcome👋</Text>
        </View>

        <View style={styles.form}>

          <View style={styles.inp}>
            <Text style={styles.text}>Email</Text>
          <Input placeholder='Email Address' 
          onChangeText={value=> emailRef.current = value} keyboardType="email-address"
          />
          </View>
          <View style={styles.inp}>
            <Text style={styles.text}>Password</Text>
          <Input placeholder='Password' secureTextEntry={true}
          onChangeText = {value=>passwordRef.current = value}
          />
          
          </View>
          <View style={styles.button}>
          <SignIn title='Submit' onPress={onSubmit}/>
          </View>
        </View>

        <View style={styles.footer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Pressable onPress={()=>router.push('signup')}>
              <Text style={[styles.signupText,{color:'green'}]}>Sign Up</Text>
       </Pressable>
        </View>
      </View> 
    </ScreenWrapper>
  )
}

export default login

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    justifyContent:'space-between',
    width: wp(100),
    alignItems:'center',  
  },
  logo:{
    width: wp(25),
    height: hp(5),
  },
  welcomeText:{
    fontSize:hp(3.5),
    fontWeight:'bold',
    paddingTop:50,
    paddingLeft:10,
    
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
   

  }

})