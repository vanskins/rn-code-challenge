import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import Baselayout from '../../../components/shared/Baselayout';
import {getUserProfile} from '../../../actions/github';
const styles = StyleSheet.create({
  link: {
    color: '#0645AD',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  username: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 26,
  },
  stretch: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  locationBtn: {
    width: 200,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#0984e3',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginRight: 5,
  },
  location: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});
const LandingPage = (props) => {
  const [userProfile, setUserProfile] = useState({});
  const [location, setLocation] = useState({});
  const [showLocation, setShowLocation] = useState(false);
  const [token, setToken] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('accessToken');
        if (value !== null) {
          setToken(value);
        } else {
          setToken(false);
        }
      } catch (e) {
        setToken(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const profile = async () => {
      const res = await getUserProfile(token);
      setUserProfile(res);
      return res;
    };
    profile();
  }, [token]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('location');
        if (value !== null) {
          setLocation(JSON.parse(value));
        }
      } catch (e) {
        console.log('error');
      }
    };
    getData();
  }, []);

  const showLocationPress = () => {
    setShowLocation(!showLocation);
  };
  return (
    <Baselayout navigation={props.navigation} logout={true}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.stretch}
          source={{uri: userProfile && userProfile.picture}}
        />
      </View>
      <Text style={styles.username}>{userProfile && userProfile.nickname}</Text>
      {userProfile && userProfile.nickname && (
        <TouchableOpacity>
          <Text
            style={
              styles.link
            }>{`https://github.com/${userProfile.nickname}`}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.locationBtn} onPress={showLocationPress}>
        <Text style={styles.locationText}>
          {showLocation ? 'Hide' : 'Display'} Location
        </Text>
        <Icon name="location-arrow" size={20} color="white" />
      </TouchableOpacity>
      {showLocation && (
        <Text style={styles.location}>
          Longitude: {location.longitude} - Latitude: {location.latitude}
        </Text>
      )}
    </Baselayout>
  );
};

export default LandingPage;
