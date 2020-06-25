import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Geolocation from 'react-native-geolocation-service';

import Login from './screens/login';
import LandingPage from './screens/drawer/landing-page';
import Weather from './screens/drawer/weather';

const Drawer = createDrawerNavigator();

const Index = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const auth = async () => {
      const result = await Geolocation.requestAuthorization('always');
      return result;
    };
    Platform.OS === 'ios' && auth();

    Geolocation.getCurrentPosition(
      (position) => {
        const {longitude, latitude} = position.coords;
        console.log({longitude, latitude});
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);
  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Landing-page" component={LandingPage} />
          <Drawer.Screen name="Weather" component={Weather} />
        </Drawer.Navigator>
      ) : (
        <Login onPress={() => setIsSignedIn(true)} />
      )}
    </NavigationContainer>
  );
};

export default Index;
