import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ms} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function SuccessRegister({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={{marginVertical: ms(30)}}>
        <Text
          style={{fontSize: ms(20), fontWeight: 'bold', textAlign: 'center'}}>
          Registration Completed!
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: ms(40),
        }}>
        <Ionicons name="checkmark-circle" size={200} color="#39df04" />
      </View>
      <View style={{marginHorizontal: ms(60), marginVertical: ms(20)}}>
        <Text style={{fontSize: ms(18), textAlign: 'center'}}>
          We sent email verification to your email
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            borderRadius: ms(7),
            backgroundColor: '#659cff',
            height: ms(40),
            margin: ms(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: ms(16)}}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
