import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {backdropLogin} from '../../assets/img';
import {ms} from 'react-native-size-matters';
import {Fumi} from 'react-native-textinput-effects';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Poppins from '../../components/Poppins';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/globalAction';
import {BASE_URL} from '../../helpers/API';
import axios from 'axios';
import {navigate} from '../../helpers/navigate';
import {setName, setToken} from './redux/action';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {token} = useSelector(state => state.login);
  const {loading} = useSelector(state => state.global);

  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const postLogins = async () => {
    if (email.length === 0) {
      Alert.alert('Warning', 'Userame harus diisi!');
    } else if (password.length === 0) {
      Alert.alert('Warning', 'Password harus diisi!');
    } else if (!email.match(regexEmail)) {
      Alert.alert('Error', 'Email tidak valid');
    } else {
      try {
        dispatch(setLoading(true));
        const body = {
          email: email, // iqbalnova707@gmail.com
          password: password, // s707
        };
        const res = await axios.post(`${BASE_URL}/auth/login`, body, {
          validateStatus: status => status < 501,
        });
        console.log(email);
        console.log(password);
        console.log(res);

        if (res.status === 200) {
          dispatch(setName(res.data.user.name));
          dispatch(setToken(res.data.tokens.access.token));
          navigate('Main');
        } else {
          Alert.alert('Error', 'Username atau Password Salah!');
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
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

  useEffect(() => {
    if (token) {
      navigation.navigate('Main');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={backdropLogin} style={styles.img} />
      </View>

      <View style={{marginHorizontal: ms(20), marginTop: ms(30)}}>
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
      <View style={{marginHorizontal: ms(20), marginVertical: ms(10)}}>
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
        <TouchableOpacity style={styles.button} onPress={() => postLogins()}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: ms(16)}}>
            Login
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
        <Poppins size={ms(14)}>Dont have an account?</Poppins>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            textAlign: 'center',
            color: 'blue',
            fontSize: ms(16),
            fontWeight: 'bold',
          }}>
          Register
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
