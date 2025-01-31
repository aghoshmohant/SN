import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import BackIcon from '../assets/icons/BackIcon'

const BackButton = ({router}) => {
  return (
    <Pressable onPress={()=>router.back()} style={styles.button}>
      <BackIcon/>
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button:{
    padding:5,
    borderRadius:10,
    backgroundColor:'rgba(0,0,0,0.07)'

  }
})