import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Text, View } from "react-native";


type Props = NativeStackScreenProps<RootStackParamList, 'LightScreen'>;

export default function LightScreen({ route, navigation }: Props): JSX.Element
{

    return (
        <View style={{ flex: 1, width: "100%", height: "100%", position: "absolute", bottom: 0 }}>
            <Text>Light Screen!</Text>
        </View>
    );
}