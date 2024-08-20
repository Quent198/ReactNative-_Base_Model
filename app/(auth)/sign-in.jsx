import React from "react";
import { SafeAreaView, Text, View, Image, Alert } from "react-native";
import FormField from "../components/FormField";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { images } from "../../constants";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser } = useGlobalContext();
  const [form, setForm] = useState({
    email: "quentingrajyy@gmail.com",
    password: "Azertyyy",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
    }
    setIsSubmitting(true);

    try {
      const result = await signIn(form.email, form.password, form.username);
      setUser(result);
      Alert.alert("Success", "User loggé avec succès");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Erreur", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
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
        <CustomButton title="Sign In" handlePress={submit} />
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

export default SignIn;
