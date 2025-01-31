import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helper/common'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import { useRouter } from 'expo-router'



const welcome = () => {

  const router = useRouter();
  return (
    <ScreenWrapper bg="white">
      <StatusBar style='dark' />
      <View style={styles.container}>
        <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/SafeNet.png')} />

        <View style={{gap:20}}>
            <Text style={styles.title}>Explore SafeNet</Text>
            <Text style={styles.punchLine}>Your all-in-one tool for disaster preparedness and response.</Text>
        </View>

        <View style={styles.footer}>
          <SignIn
           title='Sign In'
           buttonStyle={{marginHorizontal:wp(3)}}
           onPress={()=>router.push('login')
          }
           />
           <SignUp
           title='Create Account'
           buttonStyle={{marginHorizontal:wp(3)}}
           onPress={()=>router.push('signup')} />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default welcome

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'#D9F8DB',
        paddingHorizontal: wp(4)
    },
   welcomeImage:{
    height: hp(30),
    width: wp(100),
    alignSelf:'center'
   },
   title:{
    color:'#5EA131',
    fontSize:hp(4),
    fontWeight: "700",
    textAlign:'center'
   },
   punchLine:{
    textAlign:'center',
    paddingHorizontal:wp(10),
    fontSize:hp(1.7),
   },
   footer:{
    width:'100%',
    gap:20,
   },
})