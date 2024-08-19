import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import { icons } from "../../constants";

const FormField = ({ title, value, handleChangeText, extraStyles }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`${extraStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row focus:border-secondary">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={title === "Email" ? "email-address" : "default"}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
