import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Baselayout from '../../../components/shared/Baselayout';
import {getWeatherForcast} from '../../../actions/weather';
const style = StyleSheet.create({
  table: {flexDirection: 'row', justifyContent: 'space-around', margin: 10},
  th: {borderWidth: 1, flex: 1, padding: 5},
  text: {textAlign: 'center'},
  title: {textAlign: 'center', fontWeight: '500', fontSize: 20}
});
const Weather = (props) => {
  // useEffect(() => {
  //   const forcast = async () => {
  //     const result = await getWeatherForcast({
  //       latitude: 8.130604,
  //       longitude: 125.127655,
  //     });
  //     return result;
  //   };

  //   // const result = forcast();
  // }, []);
  return (
    <Baselayout>
      <Text style={style.title}>Weather Forecast</Text>
      <View style={style.table}>
        <View style={style.th}>
          <Text style={style.text}>Date(mm/dd/yyyy)</Text>
        </View>
        <View style={style.th}>
          <Text style={style.text}>Temperature(F)</Text>
        </View>
      </View>
    </Baselayout>
  );
};

export default Weather;
