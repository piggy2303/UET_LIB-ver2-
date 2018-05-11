import React, { Component } from "react";
import { View, Text } from "react-native";

import { createStackNavigator } from "react-navigation";

import Home from "./Home";
import Detail from "./Detail";
import FormAddBook from './FormAddBook';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Detail: {
      screen: Detail
    },
    FormAddBook:{
      screen: FormAddBook
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      header: null
    }
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
