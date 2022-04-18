import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';
// import {  } from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';
// import { Share } from 'react-native-share';
import {notifikasi} from '../../components/Notifikasi';

export default function DetailBook({navigation}) {
  const {detailMovie} = useSelector(state => state.home);
  const {tema} = useSelector(state => state.global);

  const loveFeatured = () => {
    notifikasi.configure();
    notifikasi.buatChannel('1');
    notifikasi.kirimNotif(
      '1',
      'Lope Lope',
      'Makasih sudah memberi hati kepadaku <3',
    );
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Bagikan pengalaman anda ',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
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
      style={{backgroundColor: tema === 'light' ? '#a7cbad' : 'black'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: ms(10),
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons color="#fff" name="chevron-back-outline" size={ms(30)} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={loveFeatured}>
            <Ionicons name="ios-heart-sharp" size={ms(30)} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare}>
            <Ionicons name="ios-share-social" size={ms(30)} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardTop}>
        <View>
          <Image
            source={{uri: `${detailMovie.cover_image}`}}
            style={{resizeMode: 'cover', width: ms(100), height: ms(130)}}
          />
        </View>
        <View style={styles.textBook}>
          <Text
            style={{
              fontSize: ms(15),
              marginBottom: ms(10),
              fontWeight: 'bold',
              color: 'black',
            }}>
            {detailMovie.title}
          </Text>
          <Text>Author : {detailMovie.author}</Text>
          <Text>Publisher : {detailMovie.publisher}</Text>
          <Text>Stock : {detailMovie.stock_available}</Text>
        </View>
      </View>
      <View style={styles.cardMid}>
        <View style={{alignItems: 'center'}}>
          <Text>Rating</Text>
          <View style={{flexDirection: 'row'}}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={ms(14)}
              startingValue={detailMovie.average_rating / 2}
              readonly={true}
            />
          </View>
        </View>
        <View>
          <Text>Total Sale</Text>
          <Text style={{textAlign: 'center'}}>{detailMovie.total_sale}</Text>
        </View>
        <TouchableOpacity style={styles.buttonBuy}>
          <NumberFormat
            value={detailMovie.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix="Buy Rp "
            renderText={formattedValue => (
              <Text style={{color: '#fff'}}>{formattedValue}</Text>
            )}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: ms(10),
          marginTop: ms(20),
          marginBottom: ms(10),
        }}>
        <Text style={{fontSize: ms(14), fontWeight: 'bold'}}>Overview</Text>
      </View>
      <View style={styles.synopsis}>
        <Text style={{textAlign: 'justify', lineHeight: 20}}>
          {detailMovie.synopsis}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardTop: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: ms(10),
    margin: ms(10),
    elevation: 2,
    borderRadius: ms(10),
  },
  textBook: {
    paddingHorizontal: ms(10),
    backgroundColor: 'white',
    width: ms(230),
  },
  cardMid: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: ms(20),
    margin: ms(10),
    elevation: 2,
    borderRadius: ms(10),
    justifyContent: 'space-around',
  },
  buttonBuy: {
    justifyContent: 'center',
    backgroundColor: '#659cff',
    paddingHorizontal: ms(8),
    borderRadius: ms(7),
    height: ms(37),
  },
  synopsis: {
    backgroundColor: '#fff',
    padding: ms(20),
    marginHorizontal: ms(10),
    elevation: 2,
    borderRadius: ms(10),
  },
});
