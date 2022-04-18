const initialState = {
  movieDataRecomen: [],
  movieDataPopular: [],
  detailMovie: {},
  refreshing: false,
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_MOVIE_RECOMEN':
      return {
        ...state,
        movieDataRecomen: action.payload,
      };

    case 'SET_DATA_MOVIE_POPULAR':
      return {
        ...state,
        movieDataPopular: action.payload,
      };

    case 'DETAIL_MOVIE':
      return {
        ...state,
        detailMovie: action.detail,
      };

    case 'SET_REFRESHING':
      return {
        ...state,
        refreshing: action.payload,
      };

    default:
      return state;
  }
};
export default HomeReducer;
