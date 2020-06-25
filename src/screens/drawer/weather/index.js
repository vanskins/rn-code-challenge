import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
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
  text: {textAlign: 'center', fontSize: 13},
  title: {textAlign: 'center', fontWeight: '500', fontSize: 20},
});
const PAGE = Dimensions.get('window');
const Weather = (props) => {
  const [data, setData] = useState([]);
  const [windowScreen, setWindowScreen] = useState(PAGE);
  useEffect(() => {
    const forcast = async () => {
      const result = await getWeatherForcast({
        latitude: 8.130604,
        longitude: 125.127655,
      });
      setData(result.data.list);
      return result;
    };

    forcast();
  }, []);
  const onChange = ({window}) => {
    setWindowScreen({...window});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

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
        {windowScreen && windowScreen.width > 375 && (
          <>
            <View style={style.th}>
              <Text style={style.text}>Description</Text>
            </View>
            <View style={style.th}>
              <Text style={style.text}>Main</Text>
            </View>
            <View style={style.th}>
              <Text style={style.text}>Pressure</Text>
            </View>
            <View style={style.th}>
              <Text style={style.text}>Humidity</Text>
            </View>
          </>
        )}
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
              {windowScreen && windowScreen.width > 375 && (
                <>
                  <View style={style.td}>
                    <Text style={style.text}>
                      {item.weather[0].description}
                    </Text>
                  </View>
                  <View style={style.td}>
                    <Text style={style.text}>{item.weather[0].main}</Text>
                  </View>
                  <View style={style.td}>
                    <Text style={style.text}>{item.main.pressure}</Text>
                  </View>
                  <View style={style.td}>
                    <Text style={style.text}>{item.main.humidity}</Text>
                  </View>
                </>
              )}
            </View>
          );
        }}
        keyExtractor={(item) => item.dt}
      />
    </Baselayout>
  );
};

export default Weather;
