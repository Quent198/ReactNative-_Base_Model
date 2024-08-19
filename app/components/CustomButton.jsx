import { TouchableOpacity,Text } from "react-native"

const CustomButton = ({title, extraStyles, handlePress}) => {
    return (
        <TouchableOpacity onPress={handlePress} className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${extraStyles}`}>
            <Text className="text-white">{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton;