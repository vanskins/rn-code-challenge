import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import moment from 'moment';

import Baselayout from '../../../components/shared/Baselayout';
import {getWeatherForcast} from '../../../actions/weather';
const style = StyleSheet.create({
  table: {flexDirection: 'row', justifyContent: 'space-around', margin: 10},
  table2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 10,
    marginRight: 10,
  },
  th: {borderWidth: 0.5, flex: 1, padding: 5},
  td: {borderWidth: 0.5, flex: 1, padding: 5},
  text: {textAlign: 'center'},
  title: {textAlign: 'center', fontWeight: '500', fontSize: 20},
});
const Weather = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const forcast = async () => {
      const result = await getWeatherForcast({
        latitude: 8.130604,
        longitude: 125.127655,
      });
      console.log(result, 'result');
      setData(result.data.list);
      return result;
    };

    forcast();
  }, []);
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
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <View style={style.table2}>
              <View style={style.td}>
                <Text style={style.text}>
                  {moment(item.dt_txt).format('LLL')}
                </Text>
              </View>
              <View style={style.td}>
                <Text style={style.text}>{item.main.temp}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.dt}
      />
    </Baselayout>
  );
};

export default Weather;
