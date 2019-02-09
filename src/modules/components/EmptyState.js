import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import PropTypes from "prop-types";

const viewStyles = {
  container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f7f7f7'
	},
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionMessageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyStateImageStyle: {
    height: 350,
    width:  200
  },
  okButton: {
    marginTop: 15,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
};

const textStyles = {
  noProducts: {
    padding: 50,
    color: '#c33746'
  },
  actionTitle: {
    color: 'blue',
    marginTop: 5
  }
};


class EmptyState extends Component {

  render() {

    return (
      <View style={viewStyles.container}>
  			<View style={viewStyles.subContainer}>
          <View style={viewStyles.imageContainer}>
            <Image
              resizeMode="contain"
              style={viewStyles.emptyStateImageStyle}
              source={require("../../assets/images/sad.png")}
            />
          </View>

          <View style={viewStyles.messageContainer} >
            <Text style={textStyles.noProducts}>
              {this.props.message}
            </Text>
          </View>

  				<View style={viewStyles.actionMessageContainer}>
            <TouchableHighlight activeOpacity={0.7} underlayColor={'rgba(0,0,0,0)'} style={viewStyles.okButton} onPress={this.props.onRefresh}>
              <Text style={textStyles.actionTitle}>Refresh</Text>
            </TouchableHighlight>
  				</View>
  			</View>
      </View>


    );
  }
}

EmptyState.propTypes = {
  onRefresh: PropTypes.func,
  message: PropTypes.string
};

export default EmptyState;
