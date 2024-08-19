import { Text, View, Image,ScrollView } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import {router} from "expo-router";
import { images } from "../constants";
import CustomButton from "./components/CustomButton";

const RootLayout = () => {
  const [user, setUser] = useState(true);
  if (user) return <Redirect href="/sign-up" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full px-4 items-center justify-center bg-black">
          <Image source={images.logo} resizeMode="contain" className="w-[130px] h-[84px]" />
          <Image source={images.cards} resizeMode="contain" className="max-w-[380px] h-[300px]" />
          <View className="relative mt-5">
            <Text className="text-3xl text-center text-white font-pbol">
              Découvrez des nouvelles possibilités avec{" "}
              <Text className="text-secondary-200">Nine Quest !</Text>
            </Text>
            <CustomButton title="Continue with Email"
            handlePress={()=> router.push("sign-in")}
            extraStyles="w-full mt-5"/>
          </View>
         
        </View>
        <StatusBar backgroundColor="#161622" style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RootLayout;
