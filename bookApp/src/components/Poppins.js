import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const Poppins = ({type = 'Regular', children, size = 12, ...all}) => {
  const {tema} = useSelector(state => state.global);
  const style = StyleSheet.create({
    text: {
      fontFamily: `Poppins-${type}`,
      color: tema === 'light' ? 'black' : 'white',
      fontSize: size,
      ...all,
    },
  });
  return <Text style={style.text}>{children}</Text>;
};
export default Poppins;
