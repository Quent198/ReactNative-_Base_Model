import {Tabs} from "expo-router";
import { View, Text } from "react-native";
import {icons} from "../../constants"

const TabIcon = ({icon,color, name, focused}) => {
    return (
        <View>
            <Text>{name}</Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
        <Tabs>
            <Tabs.Screen 
            name= "home" 
            options={{
                title: "Home",
                headerShown:false,
                tabBarIcon: ({color,focused}) => 
                    <TabIcon name="Home" icon={icons.home}/>,
                
            }}/>
        </Tabs>
        </>
    )
}
export default TabsLayout;