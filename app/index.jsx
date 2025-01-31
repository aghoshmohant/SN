import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper';


const index = () => {

  const router = useRouter();
  return (
    <ScreenWrapper>
      <Text>index</Text>
      <Button title="Welcome" onPress={()=> router.push('welcome')} />
        <Button title="Organization" onPress={()=>router.push("organization")} />
        <Button title="Vehicle" onPress={()=>router.push("vehicle")} />
        <Button title="Disaster" onPress={()=>router.push("disaster")} />
        <Button title="Volunteer" onPress={()=>router.push("volunteer")} />
        <Button title="Home" onPress={()=>router.push("home")} />
        <Button title="Test" onPress={()=>router.push("test")} />
    </ScreenWrapper>
  )
}

export default index