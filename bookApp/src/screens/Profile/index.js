import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {avatar} from '../../assets/img';
import {ms} from 'react-native-size-matters';
import Poppins from '../../components/Poppins';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../Login/redux/action';
import {setTheme} from '../../redux/globalAction';
import ImageCropPicker from 'react-native-image-crop-picker';

export default function Profile({navigation}) {
  const {name} = useSelector(state => state.login);
  const {tema} = useSelector(state => state.global);

  const dispatch = useDispatch();
  const [mode, setMode] = useState('Dark');

  const [photo, setPhoto] = useState(
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  );

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

  const chooseAvatar = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPhoto(image.path);
    });
  };

  return (
    <View flex={1}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: tema === 'light' ? '#a7cbad' : 'black', // #694fad
          paddingVertical: ms(10),
        }}>
        <View
          style={{
            marginBottom: ms(10),
            height: ms(120),
            width: ms(120),
            borderRadius: ms(60),
          }}>
          <Image
            style={{height: ms(120), width: ms(120), borderRadius: ms(60)}}
            source={{uri: photo}}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#5198e4',
            paddingHorizontal: ms(20),
            paddingVertical: ms(5),
            borderRadius: ms(15),
            marginBottom: ms(10),
          }}
          onPress={chooseAvatar}>
          <Text style={{color: 'white'}}>Change Avatar</Text>
        </TouchableOpacity>
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
