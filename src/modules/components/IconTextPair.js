import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import PropTypes from "prop-types";

const viewStyles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: '5%'
  },
  imageStyle: {
    marginRight: 8
  }
};

const textStyles = {};

class IconTextPair extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[viewStyles.container, this.props.containerOverrideStyle]}>
        <Image
          source={this.props.imageSource}
          style={this.props.imageOverrideStyle }
          resizeMode={"contain"}
        />
        <Text style={[this.props.textStyle]}>{this.props.text}</Text>
      </View>
    );
  }
}


IconTextPair.propTypes = {
  imageSource: PropTypes.number,
  size: PropTypes.number,
  imageOverrideStyle: PropTypes.object,
  text: PropTypes.string,
};

IconTextPair.defaultProps = {
  imageOverrideStyle: viewStyles.imageStyle
};


export default IconTextPair;
