import React from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import FormField from "../components/FormField";
import { useState } from "react";
import CustomButton from "../components/CustomButton"
import {images} from "../../constants";
import { Link } from "expo-router";

const signIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const submit = () => {
    console.log("submit");
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
      <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          extraStyles="mt-7"
          
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          extraStyles="mt-7"
        />
        <CustomButton title="Sign In" handlePress={submit}/>
        <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account ?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
      </View>
    </SafeAreaView>
  );
};

export default signIn;
