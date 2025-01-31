import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../helper/common'
import Loading from './Loading'

const SignUp = (
    {
    buttonStyle,
    textStyle,
    title='',
    onPress=()=>{},
    loading = false,
    hasShadow = true,
    }
) => {

    
      
if(loading){
  return(
    <View style={[styles.button,buttonStyle, {backgroundColor:'white'}]}>
    <Loading />
    </View>
  )
}

  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow]} >
        <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  )
}

export default SignUp

const styles = StyleSheet.create({
    button:{
        borderColor:'#2E7039',
        borderWidth:1.5,
        height:hp(6),
        width:wp(),
        justifyContent:'center',
        alignItems:'center',
        borderCurve:'continuous',
        borderRadius:10,
        backgroundColor:'none'
    },
    text:{
        color:'#46A56C',
        fontWeight:'bold',
        fontSize:hp(1.8)}
})