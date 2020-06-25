import React, {useEffect} from 'react';
import {Text, TouchableOpacity, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Baselayout from '../../components/shared/Baselayout';
Geolocation.setRNConfiguration({skipPermissionRequests: true});
const Login = (props) => {
  const {onPress} = props;
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
    <Baselayout>
      <Text>Hello world Login</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>Login</Text>
      </TouchableOpacity>
    </Baselayout>
  );
};

export default Login;
