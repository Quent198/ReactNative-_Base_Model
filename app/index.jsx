import { Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import {useState} from "react"



const RootLayout = () => {
  const [user, setUser] = useState(true);
  if (user) return <Redirect href ="/home"/>

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-psemibold text-2xl">Nine Quest !</Text> 
      
    </View>
  );
};

export default RootLayout;
