import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {icons} from "../../constants"
import { useGlobalContext } from "../../context/GlobalProvider";
import { signOut } from "../../lib/appwrite";
import {router} from "expo-router"


const RootLayout = () => {
  const {setUser} = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    router.replace("sign-in")
  }
  return (
    <SafeAreaView className="bg-primary h-screen ">
      <View className="w-full justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity onPress={logout}>
          <Image source={icons.logout} resizeMode="contain" className="w-6 h-6"/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RootLayout;
