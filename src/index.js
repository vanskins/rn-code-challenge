import React, {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';

import Login from './screens/login';
import LandingPage from './screens/drawer/landing-page';
import Weather from './screens/drawer/weather';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-4ccxy-21.us.auth0.com',
  clientId: 'oDJzJKWJA5QiaFqXSrUgAlFsHBROSygE',
});

const Drawer = createDrawerNavigator();

const Index = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [locGranted, setGranted] = useState(false);
  useEffect(() => {
    const auth = async () => {
      const result = await Geolocation.requestAuthorization('always');
      setGranted(true);
      return result;
    };
    const askAndroid = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      setGranted(true);
      return granted;
    };

    if (Platform.OS === 'ios') {
      auth();
    } else {
      askAndroid();
    }
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const {longitude, latitude} = position.coords;
        storeData('location', JSON.stringify({longitude, latitude}));
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, [locGranted]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('accessToken');
        if (value !== null) {
          setIsInitializing(false);
          setIsSignedIn(true);
        } else {
          setIsInitializing(false);
        }
      } catch (e) {
        setIsInitializing(false);
      }
    };
    getData();
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const login = () => {
    auth0.webAuth
      .authorize({scope: 'openid profile email'})
      .then((credentials) => {
        const {accessToken} = credentials;
        storeData('accessToken', accessToken);
        setIsSignedIn(true);
      })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    auth0.webAuth
      .clearSession({})
      .then((success) => {
        console.log(success, 'logout');
      })
      .catch((error) => {
        console.log('Log out cancelled');
      });
  };
  if (isInitializing) {
    return null;
  }
  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Landing-page" component={LandingPage} />
          <Drawer.Screen name="Weather" component={Weather} />
        </Drawer.Navigator>
      ) : (
        <Login onPress={login} logout={logout} />
      )}
    </NavigationContainer>
  );
};

export default Index;
