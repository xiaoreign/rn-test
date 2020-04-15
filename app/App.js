import React from 'react';
import {Provider} from 'react-redux';
import Router from '@/route';
import models from '@/models';
import dva from '@/utils/dva';
import Orientation from 'react-native-orientation';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
Orientation.lockToLandscape();

const store = dvaApp.getStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
