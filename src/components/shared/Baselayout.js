import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Baselayout = (props) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>{props.children}</SafeAreaView>
    </>
  );
};

export default Baselayout;
