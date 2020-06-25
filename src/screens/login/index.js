import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Baselayout from '../../components/shared/Baselayout';
const PAGE = Dimensions.get('window');
const styles = StyleSheet.create({
  login: {
    borderWidth: 1,
    width: 250,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 3,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    marginLeft: 5,
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '600',
    color: '#000000',
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555555',
    marginTop: 5,
  },
  buttonContainer: {
    height: PAGE.height / 2,
  },
  headerContainer: {
    height: PAGE.height / 2,
    justifyContent: 'center',
  },
});

const Login = (props) => {
  const {onPress} = props;
  return (
    <Baselayout>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subTitle}>Weather App powered by RN</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <TouchableOpacity style={styles.login} onPress={onPress}>
            <Icon name="github" size={30} color="white" />
            <Text style={styles.text}>LOGIN WITH GITHUB</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Baselayout>
  );
};

export default Login;
