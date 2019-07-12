import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import thunk from 'redux-thunk';
import reducer from '../src/reducer/reducer';
import Detail from "./detail/Detail";
import Home from "./home/Home";
import OnlineScreen from './app/OnlineScreen';
import OfflineScreen from './app/OfflineScreen';
const AppNavigtor = createAppContainer(
  createStackNavigator({
    OnlineScreen: {
      screen: OnlineScreen,
      navigationOptions: { title: "OnlineScreen" }
    },
    OfflineScreen: {
      screen: OfflineScreen,
      navigationOptions: { title: "OfflineScreen" }
    }
  })
);

const store = createStore(reducer, applyMiddleware(thunk));

export default class Routes extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <AppNavigtor />
    </Provider>
    // <AppNavigtor/>
    );
  }
}
