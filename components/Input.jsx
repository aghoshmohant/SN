import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { hp } from '../helper/common'

const Input = (props) => {
  return (
    <View style={[styles.container,props.containerStyles && props.containerStyles]}>
      <TextInput style={{flex:1}} placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
      ref={props.inputRef && prpos.inputRef}
      {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:hp(7),
        justifyContent:'center',
        alignItems:'center',
        borderWidth:0.4,
        borderColor:'black',
        borderRadius:10,
        borderCurve:'continuous',
        marginHorizontal:15,
        marginTop:0,
        paddingLeft:10,
        gap:12,  
    }
})