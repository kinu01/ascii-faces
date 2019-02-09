import React, { Component } from 'react';
import {  Image, View, Text, WebView } from 'react-native';
import { Header, Left, Body, Right, Title } from 'native-base';
import TappableIcon from '../components/TappableIcon';

const viewStyles = {
  container: {
    flex: 1
  }
}


class AdWebScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //get the passed params.
    this.AdUrl = this.props.navigation.getParam('data');
  }

  goBackButton = () => {

      return (
        <TappableIcon
          icon={require("../../assets/images/logos-icons/cancel.png")}
          size={20}
          onPress={this.onBack}
        />
      );

  };

  onBack = () => {
    this.props.navigation.replace('Home');
  }


  render() {

    return (

      <View style={viewStyles.container}>
        <Header>
          <Left>
            {this.goBackButton()}
          </Left>
          <Body>
            <Title>Sponsored Ad</Title>
          </Body>
          <Right />
        </Header>
        <WebView
          source={{ uri: this.AdUrl }}
          startInLoadingState={true}
        />
    </View>

    );
  }
}

export default AdWebScreen;
