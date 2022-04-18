import axios from 'axios';
import {BASE_URL} from '../../../helpers/API';
import {navigate} from '../../../helpers/navigate';
import {setLoading} from '../../../redux/globalAction';
import {store} from '../../../redux/store';
import {setToken} from '../../Login/redux/action';

const token = store.getState().login.token;

axios.defaults.headers.Authorization = `Bearer ${token}`;

// get movie recomen

export const getDataMovie = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get(`${BASE_URL}/books`);
    // console.log(res);

    if (res.status === 200) {
      return dispatch(setDataMoviePopular(res.data.results));
    }
    if (res.status === 401) {
      setToken();
      navigate('Login');
    }
  } catch (error) {
    console.log(error);
    return dispatch(setToken(''));
  } finally {
    dispatch(setLoading(false));
    // console.log('ini token',token)
  }
};

export const setDataMovieRecomen = payload => {
  return {
    type: 'SET_DATA_MOVIE_RECOMEN',
    payload,
  };
};

export const setDataMoviePopular = payload => {
  return {
    type: 'SET_DATA_MOVIE_POPULAR',
    payload,
  };
};

// action get byId

export const getDetailMovie = id => async dispatch => {
  try {
    dispatch(setLoading(true));

    const res = await axios.get(`${BASE_URL}/books/${id}`);
    if (res.status === 200) {
      // console.log(res)
      dispatch(setDetailMovie(res.data));
      navigate('Detail');
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setDetailMovie = payload => {
  return {
    type: 'DETAIL_MOVIE',
    detail: payload,
  };
};

export const setRefreshing = payload => {
  return {
    type: 'SET_REFRESHING',
    payload,
  };
};
