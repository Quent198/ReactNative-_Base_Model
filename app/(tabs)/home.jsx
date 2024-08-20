import { Alert, FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../lib/appwrite";
import VideoItem from "../components/VideoItem";

const Home = () => {
  const [datas, setDatas] = useState([]);
  console.log(datas);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getAllPosts();
        setDatas(response);
        console.log(datas, "ffgfgffggfgzzzzzzzzzzzzzzzzzzzzz");
      } catch (error) {
        Alert.alert("erreur", error.message);
      }
    };
    fetchdata();
  }, []);
  return (
    <SafeAreaView className="bg-primary h-screen"> 
      <FlatList
        data={datas}
        keyExtractor={(post) => post.$id}
        className="px-4"
        renderItem={({ item }) => <AllVideos item={item} />}
        ListHeaderComponent={() => {
          <View className="my-6 space-Y-6">
            <View className="w-dull flex-1 pt-5 pb-8">
              <AllVideos posts={datas} />
            </View>
          </View>;
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
