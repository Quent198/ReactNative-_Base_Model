import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FormField from "../components/FormField";
import { TouchableOpacity } from "react-native";
import { icons } from "../../constants";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createVideo } from "../../lib/appwrite";
import {router} from "expo-router";

const Create = () => {
  const { user } = useGlobalContext();
  let selectType = "video";
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  console.log({ form });
  const openPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Tous les champs doivent être remplis");
    }

    try {
      await createVideo({
        ...form,
        userid: user.$id,
      });
      Alert.alert("Success", "Video ajoutée");
      router.push("/home");
    } catch (error) {
      Alert.alert("erreur", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video title"
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          extraStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload video
          </Text>
          <TouchableOpacity
            onPress={() => ((selectType = "video"), openPicker("video"))}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity
            onPress={() => ((selectType = "image"), openPicker("image"))}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="Prompt"
          value={form.prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          extraStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          extraStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
