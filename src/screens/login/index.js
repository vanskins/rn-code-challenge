import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Baselayout from '../../components/shared/Baselayout';
const Login = (props) => {
  const {onPress} = props;
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
