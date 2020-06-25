import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});
const Baselayout = (props) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}> */}
        <SafeAreaView>{props.children}</SafeAreaView>
      {/* </ScrollView> */}
    </>
  );
};

export default Baselayout;
