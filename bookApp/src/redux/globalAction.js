export const setTheme = payload => {
  return {
    type: 'SET_THEME',
    payload,
  };
};

export const setLoading = payload => {
  return {
    type: 'SET_LOADING',
    payload,
  };
};
