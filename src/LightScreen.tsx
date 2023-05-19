import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Text, View, Switch } from "react-native";
import { useState } from "react";


type Props = NativeStackScreenProps<RootStackParamList, 'LightScreen'>;

export default function LightScreen({ route, navigation }: Props): JSX.Element
{
    const [isEnabled, setIsEnabled] = useState(false);

    function toggleSwitchHandler()
    {
        setIsEnabled(previousState => !previousState);
    }

    const color: string = isEnabled ? "white" : "black";
    return (
        <View style={{ flex: 1, width: "100%", height: "100%", position: "absolute", bottom: 0, backgroundColor: color }}>
            <Text>Light Screen!</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchHandler}
                value={isEnabled}
            />
        </View>
    );
}