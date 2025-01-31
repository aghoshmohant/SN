import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size={25} color={'white'} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})