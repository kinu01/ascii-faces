import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import PropTypes from "prop-types";
import { formatCentToDollar } from '../../utils/formatCentToDollar.js'
import { generateRelativeDate } from '../../utils/getRelativeDate.js'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const viewStyles = {
	container: {
		height:deviceHeight * 0.28,
		width: deviceWidth * 0.48,
		marginTop: -8,
		justifyContent: 'center',
		alignItems: 'center',

	},
	fieldLayoutContainer: {
		height: '92%',
		width: '94%',
		backgroundColor: 'white',
		borderRadius: 8,
		shadowColor: "#006",
		shadowColor: '#000',
	    shadowOffset: {
	      width: 0,
	      height: 2
	    },
	    shadowOpacity: 0.2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	poductFieldContainer: {
		height: '90%',
		width: '98%',
	},
	dateFieldContainer: {
		flex: 0.4,
		flexDirection: 'row-reverse',
	},
	imageFieldContainer: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	priceFieldContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
};

const textStyles = {
  headerTitle: {
    fontWeight: '400',
  },
  price: {
  	fontSize: 14,
  	color: 'black',
  	fontWeight: '400',
  },
  date: {
  	fontSize: 10,
    color: '#bfbcbe'
  },
  product: {
  	fontSize: 25
  }
};


class ProductItem extends Component {
  render() {
    return (
      <View style={viewStyles.container} >
        <TouchableOpacity style={viewStyles.fieldLayoutContainer}
          onPress={this.props.onItemTapped}
          >
          <View style={viewStyles.poductFieldContainer} >
            <View style={viewStyles.dateFieldContainer} >
              <Text style={textStyles.date}> {generateRelativeDate(this.props.product.date)} </Text>
          </View>
            <View style={viewStyles.imageFieldContainer} >
              <Text style={textStyles.product}> {this.props.product.face} </Text>
          </View>
            <View style={viewStyles.priceFieldContainer} >
              <Text style={textStyles.price}>{ '$' + formatCentToDollar(this.props.product.price) } </Text>
          </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

ProductItem.propTypes = {
  product: PropTypes.object,
  onItemTapped: PropTypes.func,
};

export default ProductItem;
