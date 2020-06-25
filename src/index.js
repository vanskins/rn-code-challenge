import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from './screens/login';
import LandingPage from './screens/drawer/landing-page';
import Weather from './screens/drawer/weather';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const createDrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Landing-page" component={LandingPage} />
      <Drawer.Screen name="Weather" component={Weather} />
    </Drawer.Navigator>
  );
};
const Index = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
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
