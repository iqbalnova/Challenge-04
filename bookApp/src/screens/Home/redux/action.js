import axios from "axios";
import { BASE_URL } from "../../../helpers/API";
import { navigate } from "../../../helpers/navigate";
import { setLoading } from "../../../redux/globalAction";
import {store} from '../../../redux/store'


const token = store.getState().login.token;

axios.defaults.headers.Authorization = `Bearer ${token}`;

// get movie recomen

export const getDataMovieRecomen = () => async dispatch => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${BASE_URL}/books`);
      console.log(res);
  
      if (res.status === 200) {
        return dispatch(setDataMovieRecomen(res.data.results));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      console.log('ini token',token)
    }
  };
  
  export const setDataMovieRecomen = payload => {
    return {
      type: 'SET_DATA_MOVIE_RECOMEN',
      payload,
    };
  };

  // get movie popular
  export const getDataMoviePopular = () => async dispatch => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${BASE_URL}/books?_sort=average_rating&_order=DESC`);
      console.log(res);
  
      if (res.status === 200) {
        return dispatch(setDataMovieRecomen(res.data.results));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
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
        console.log(res)
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


  export const setRefreshing = (payload) => {
    return {
      type: "SET_REFRESHING",
      payload,
    };
  } 