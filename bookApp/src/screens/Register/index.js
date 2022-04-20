import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {backdropRegis} from '../../assets/img';
import {ms} from 'react-native-size-matters';
import {Fumi} from 'react-native-textinput-effects';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Poppins from '../../components/Poppins';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/globalAction';
import axios from 'axios';
import {BASE_URL} from '../../helpers/API';

export default function Register({navigation}) {
  const [fullname, setFullName] = useState(''); // Sampe Sahur
  const [password, setPassword] = useState(''); // sampesahur23
  const [email, setEmail] = useState(''); // muhammadiqbal2354@gmail.com

  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.global);

  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const regexPassword = /^[a-z0-9]\w{8,14}$/;

  const postRegister = async () => {
    if (fullname.length === 0) {
      Alert.alert('Warning', 'FullName harus diisi!');
    } else if (email.length === 0) {
      Alert.alert('Warning', 'Email harus diisi!');
    } else if (password.length === 0) {
      Alert.alert('Warning', 'Password harus diisi!');
    } else {
      if (!email.match(regexEmail)) {
        Alert.alert('Error', 'Email tidak valid');
      } else if (!password.match(regexPassword)) {
        Alert.alert(
          'Error',
          'Password tidak valid. Minimal 8 karakter dan 1 angka',
        );
      } else {
        try {
          dispatch(setLoading(true));
          const body = {
            email: email,
            password: password,
            name: fullname,
          };
          const res = await axios.post(`${BASE_URL}/auth/register`, body, {
            validateStatus: status => status < 501,
          });
          // console.log(res);

          if (res.status <= 201) {
            navigation.navigate('Success');
          } else {
            Alert.alert('Error', 'Tidak bisa register');
          }
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setLoading(false));
        }
      }
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={backdropRegis} style={styles.img} />
      </View>
      <View style={{marginHorizontal: ms(20), marginTop: ms(30)}}>
        <Fumi
          label={'Full Name'}
          iconClass={Feather}
          iconName={'user'}
          iconColor={'#f95a25'}
          iconSize={ms(20)}
          iconWidth={ms(40)}
          inputPadding={ms(16)}
          onChangeText={value => setFullName(value)}
        />
      </View>
      <View style={{marginHorizontal: ms(20), marginTop: ms(10)}}>
        <Fumi
          label={'E-mail'}
          iconClass={Ionicons}
          iconName={'mail-outline'}
          iconColor={'#f95a25'}
          iconSize={ms(20)}
          iconWidth={ms(40)}
          inputPadding={ms(16)}
          onChangeText={value => setEmail(value)}
        />
      </View>
      <View style={{marginHorizontal: ms(20), marginTop: ms(10)}}>
        <Fumi
          label={'Password'}
          iconClass={Ionicons}
          iconName={'lock-closed-outline'}
          iconColor={'#f95a25'}
          iconSize={ms(20)}
          iconWidth={ms(40)}
          inputPadding={ms(16)}
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
        />
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => postRegister()}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: ms(16)}}>
            Register
          </Text>
        </TouchableOpacity>
      )}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: ms(10),
          marginBottom: ms(5),
        }}>
        <Poppins size={ms(14)}>Already have an account?</Poppins>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            textAlign: 'center',
            color: 'blue',
            fontSize: ms(16),
            fontWeight: 'bold',
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a7cbad',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ms(20),
    marginTop: ms(50),
  },
  img: {
    width: ms(330),
    height: ms(200),
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#659cff',
    marginTop: ms(10),
    marginHorizontal: ms(20),
    paddingVertical: ms(15),
    borderRadius: ms(5),
  },
});
