import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../context/auth-context';

type Props = {};

export default function Auth(props: Props): JSX.Element
{
    const authContext = useContext(AuthContext);

    function loginHandler()
    {
        authContext.login();
    }

    return (
        <View>
            <Text>This is a test of useContext</Text>
            <Text>You are not authenticated!</Text>
            <Text>Please press the login button to continue.</Text>
            <Button title="Log In" onPress={loginHandler}></Button>
        </View>
    );
}