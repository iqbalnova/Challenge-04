import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from '../redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const ContainerTesting = screen => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{screen}</PersistGate>
    </Provider>
  );
};

export default ContainerTesting;
