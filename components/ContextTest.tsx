import { Button, Text, View } from "react-native";
import Auth from "./Auth";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";


export default function ContextTest(): JSX.Element 
{
    let authContext = useContext(AuthContext);
    let content: JSX.Element = <Auth />;

    if (authContext.isAuth)
    {
        content = <View>
            <Text>The context says you are now auth'd!</Text>
            <Button title="Log Out" onPress={authContext.logout}></Button>
        </View>;
    }

    return content;
}