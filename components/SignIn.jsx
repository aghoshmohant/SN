import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../helper/common'
import Loading from './Loading'

const SignIn = (
    {
    buttonStyle,
    textStyle,
    title='',
    onPress=()=>{},
    loading = false,
    hasShadow = true,
    }
) => {

    const shadowStyle = {
      shadowColor:'dark',
      shadowOffset: {width: 0 ,height:10},
      shadowOpacity:0.2,
      shadowRadius: 8,
      elevation:4,
        }
      
if(loading){
  return(
    <View style={[styles.button,buttonStyle,]}>
    <Loading />
    </View>
  )
}

  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle]} >
        <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  )
}

export default SignIn

const styles = StyleSheet.create({
    button:{
       backgroundColor:'#2E7039',
        height:hp(6),
        justifyContent:'center',
        alignItems:'center',
        borderCurve:'continuous',
        borderRadius:10,
    },
    text:{
        color:'white',
        fontWeight:'bold',
        fontSize:hp(1.8)}
})