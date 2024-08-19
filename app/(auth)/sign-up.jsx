import React from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import FormField from "../components/FormField";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { images } from "../../constants";
import { Link } from "expo-router";
import { createUser } from "../../lib/appwrite";

const signUp = () => {
  const [form, setForm] = useState({
    username: "Quent",
    email: "quentingraj@gmail.com",
    password: "Azertggggggggy",
  });

  const submit = () => {
    createUser(form.email, form.password, form.username);
  };
  return (
    <SafeAreaView className="h-full bg-primary ">
      <View>
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[115px] h-[35px]"
        />
        <Text className="mt-10 text-2xl font-semibold text-white font-psemibold">
          Log in to Aora
        </Text>
        <FormField
          title="Pseudo"
          value={form.username}
          extraStyles="mt-7"
          handleChangeText={(e) => setForm({ ...form, username: e })}
        />
        <FormField
          title="Email"
          value={form.email}
          extraStyles="mt-7"
          handleChangeText={(e) => setForm({ ...form, email: e })}
        />
        <FormField
          title="Password"
          value={form.password}
          extraStyles="mt-7"
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />
        <CustomButton title="Se connecter" handlePress={submit} />
        <View className="flex flex-row justify-center gap-2 pt-5">
          <Text className="text-lg text-gray-100 font-pregular">
            Déjà un compte ?
          </Text>
          <Link
            href="/sign-in"
            className="text-lg font-psemibold text-secondary"
          >
            Connectez-vous
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signUp;
