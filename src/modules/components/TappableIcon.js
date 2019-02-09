import React, { Component } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import PropTypes from "prop-types";

const viewStyles = {};

const textStyles = {};

class TappableIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        activeOpacity={0.7}
        underlayColor={"transparent"}
        style={[
          { width: this.props.size, height: this.props.size },
          this.props.containerOverrideStyle
        ]}
      >
        <Image
          resizeMode={"cover"}
          source={this.props.icon}
          style={{ flex: 1, width: this.props.size, height: this.props.size }}
        />
      </TouchableHighlight>
    );
  }
}

TappableIcon.propTypes = {
  icon: PropTypes.number,
  size: PropTypes.number,
  containerOverrideStyle: PropTypes.object,
  onPress: PropTypes.func,
};


export default TappableIcon;
