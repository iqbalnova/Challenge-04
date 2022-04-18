import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {avatar} from '../../assets/img';
import {ms} from 'react-native-size-matters';
import Poppins from '../../components/Poppins';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../Login/redux/action';
import {setTheme} from '../../redux/globalAction';

export default function Profile({navigation}) {
  const {name} = useSelector(state => state.login);
  const {tema} = useSelector(state => state.global);

  const dispatch = useDispatch();
  const [mode, setMode] = useState('Dark');

  const logout = () => {
    dispatch(setToken());
    navigation.navigate('Login');
  };

  const changeTheme = () => {
    if (tema === 'light') {
      dispatch(setTheme('dark'));
      setMode('Light');
    } else {
      dispatch(setTheme('light'));
      setMode('Dark');
    }
  };

  return (
    <View flex={1}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: tema === 'light' ? '#a7cbad' : 'black', // #694fad
          paddingVertical: ms(10),
        }}>
        <View style={{marginBottom: ms(10)}}>
          <Image
            style={{width: ms(300), height: ms(150), resizeMode: 'contain'}}
            source={avatar}></Image>
        </View>
        <Poppins size={ms(20)}>{name.toUpperCase()}</Poppins>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tema === 'light' ? '#fff' : '#282e2e',
        }}>
        <TouchableOpacity
          onPress={() => changeTheme()}
          style={{
            backgroundColor: tema === 'light' ? 'black' : '#a7cbad',
            height: ms(50),
            alignItems: 'center',
            justifyContent: 'center',
            width: ms(200),
            borderRadius: ms(30),
            marginVertical: ms(10),
          }}>
          <Text style={{color: '#fff', fontSize: ms(15)}}>{mode} Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logout()}
          style={{
            backgroundColor: 'red',
            height: ms(50),
            alignItems: 'center',
            justifyContent: 'center',
            width: ms(200),
            borderRadius: ms(30),
          }}>
          <Text style={{color: '#fff', fontSize: ms(15)}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
