import { Tabs } from "expo-router";
import { Image, View, Text } from "react-native";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 ">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor:"#FFA001",
          tabBarInactiveTintColor:"#CDCDE0",
          tabBarStyle : {
            backgroundColor :"#161633",
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="Home" color="blue" icon={icons.home} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="Create" color="blue" icon={icons.plus} focused={focused} />
            ),
          }}
        /><Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Profile" color="blue" icon={icons.profile} focused={focused} />
          ),
        }}
      />
      </Tabs>
    </>
  );
};
export default TabsLayout;
