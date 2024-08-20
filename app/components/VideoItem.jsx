import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../constants";

export const VideoItem = ({ item }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="mr-5">
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity onPress={() => setPlay(true)}>
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMethod="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function AllVideos({ posts }) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.$id}
      className="px-4"
      renderItem={({ post }) => <VideoItem item={post}  />}
      horizontal
    />
  );
}
