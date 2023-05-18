import {useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {COLORS, icons, images, SIZES} from '../constants';
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

const Home = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.profile} dimension="100%" />
          ),
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
