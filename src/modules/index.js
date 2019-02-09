import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation';
import { View, Image, Text } from 'react-native';
import ProductsGridScreen from './screens/ProductsGridScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import AdWebScreen from './screens/AdWebScreen';
import WelcomeScreen from './WelcomeScreen';

const RootStack = (shouldShowWelcomeScreen) => {


    return createStackNavigator ({
      Welcome: {
        screen: WelcomeScreen
      },
      Home: {
        screen: ProductsGridScreen,
      },
      ProductDetail: {
        screen: ProductDetailScreen
      },
      AdWeb: {
        screen: AdWebScreen
      }


    }, {
      mode: "screen",
      initialRouteName: shouldShowWelcomeScreen ? 'Welcome' : 'Home',
      headerMode: 'none',

    });
};

export default RootStack;
