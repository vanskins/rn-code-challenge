import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Auth0 from 'react-native-auth0';
import Icon from 'react-native-vector-icons/Ionicons';

const auth0 = new Auth0({
  domain: 'dev-4ccxy-21.us.auth0.com',
  clientId: 'oDJzJKWJA5QiaFqXSrUgAlFsHBROSygE',
});

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  logout: {justifyContent: 'space-between', flexDirection: 'row', padding: 10},
});
const Baselayout = (props) => {
  const {navigation} = props;
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };
  const logout = () => {
    auth0.webAuth
      .clearSession({})
      .then((success) => {
        removeValue();
      })
      .catch((error) => {
        console.log('Log out cancelled');
      });
  };
  const toggle = () => {
    navigation.toggleDrawer();
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {props.logout && (
          <View style={styles.logout}>
            <TouchableOpacity onPress={toggle}>
              <Icon name="md-menu" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
        {props.children}
      </SafeAreaView>
    </>
  );
};

export default Baselayout;
