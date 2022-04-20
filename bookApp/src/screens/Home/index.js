import {
  FlatList,
  View,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDataMovie, getDetailMovie} from './redux/action';
import {ms} from 'react-native-size-matters';
import Poppins from '../../components/Poppins';
import {Rating} from 'react-native-ratings';
import LottieView from 'lottie-react-native';
import NumberFormat from 'react-number-format';

export default function Home() {
  const {name} = useSelector(state => state.login);
  const {loading, tema} = useSelector(state => state.global);
  const dispatch = useDispatch();
  const {movieDataPopular = []} = useSelector(state => state.home);

  useEffect(() => {
    getDataMovies();
    sortingRecom();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataMovies = () => {
    dispatch(getDataMovie()); // dispatch untuk fetching
  };

  const getMovieByID = item => {
    dispatch(getDetailMovie(item.id));
  };

  const CardMovieRecomen = ({item}) => {
    return (
      <TouchableOpacity onPress={() => getMovieByID(item)}>
        <View
          style={{
            width: ms(130),
            height: ms(220),
            marginVertical: ms(10),
            marginLeft: ms(10),
            borderRadius: ms(5),
            elevation: 5,
            backgroundColor: tema === 'light' ? '#fff' : '#282e2e',
          }}>
          <Image
            source={{uri: `${item.cover_image}`}}
            resizeMode="contain"
            style={{height: ms(120), width: ms(120), marginHorizontal: ms(5)}}
          />
          <View style={{padding: ms(10), alignContent: 'space-around'}}>
            <View>
              <Poppins type="Bold">{item.title}</Poppins>
            </View>
            <View>
              <NumberFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix="Rp "
                renderText={formattedValue => (
                  <Poppins>{formattedValue}</Poppins>
                )}
              />
            </View>
            <View style={{width: ms(60)}}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={ms(12)}
                startingValue={item.average_rating / 2}
                readonly={true}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const sortingRecom = () => {
    const sort = movieDataPopular.sort(function (a, b) {
      return b.average_rating - a.average_rating;
    });
    return sort.slice(0, 6);
  };

  const Header = () => {
    return (
      <View>
        <View style={{margin: ms(10), flexDirection: 'row', marginTop: ms(10)}}>
          <Poppins size={16}>Good Evening, </Poppins>
          <Poppins type="Bold" size={17}>
            {name}!
          </Poppins>
        </View>
        <View style={{marginHorizontal: ms(10), marginTop: ms(10)}}>
          <Poppins size={16}>Recommended</Poppins>
        </View>

        <FlatList
          data={sortingRecom(movieDataPopular)}
          keyExtractor={item => item.id}
          renderItem={CardMovieRecomen}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={{marginHorizontal: ms(10), marginTop: ms(10)}}>
          <Poppins size={16}>Popular</Poppins>
        </View>
      </View>
    );
  };

  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    getDataMovies();
    setRefresh(false);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          style={{flex: 1}}
          source={require('../../assets/animation/readbook.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: tema === 'light' ? '#a7cbad' : 'black'}}
        data={movieDataPopular}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={Header}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: tema === 'light' ? '#fff' : '#282e2e',
              padding: ms(10),
              margin: ms(10),
              elevation: 2,
              borderRadius: ms(10),
            }}
            onPress={() => getMovieByID(item)}>
            <View>
              <Image
                source={{uri: `${item.cover_image}`}}
                style={{resizeMode: 'cover', width: ms(100), height: ms(130)}}
              />
            </View>
            <View
              style={{
                paddingHorizontal: ms(10),
                backgroundColor: tema === 'light' ? '#fff' : '#282e2e',
                width: ms(230),
              }}>
              <View style={{marginBottom: ms(10)}}>
                <Poppins type="Bold" size={15}>
                  {item.title}
                </Poppins>
              </View>

              <Poppins>Author : {item.author}</Poppins>
              <Poppins>Publisher : {item.publisher}</Poppins>
              <View>
                <NumberFormat
                  value={item.price}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix="Rp "
                  renderText={formattedValue => (
                    <Poppins>{formattedValue}</Poppins>
                  )}
                />
              </View>
              <View style={{width: 70}}>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={ms(14)}
                  startingValue={item.average_rating / 2}
                  readonly={true}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}
