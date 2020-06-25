import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Baselayout from '../../components/shared/Baselayout';
const Login = (props) => {
  const {navigation} = props;
  return (
    <Baselayout>
      <Text>Hello world Login</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Landing-page')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </Baselayout>
  );
};

export default Login;
