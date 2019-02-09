import React, { Component } from 'react';
import { Image, View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import  TappableIcon from '../components/TappableIcon';
import { formatCentToDollar } from '../../utils/formatCentToDollar.js'

const optionSize = 27;
const iconContainerSize = 32;
const iconSize = 0.628 * iconContainerSize;


const viewStyles = {
  container: {
    flex: 1,
  },
  backIconContainer: {
    backgroundColor: 'white',
    borderRadius:iconContainerSize,
    height: iconContainerSize,
    width: iconContainerSize,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 17,
    marginTop: 70,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2
  },
  faceContainerStyle: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  productDetailContainer: {
    flex: 2.5,
  },
  productDetailSubContainer: {
    width: '90%',
    height: '96%',
    alignSelf: 'center'
  },
  titleContainerStyle: {
    flex: 1.5,
    justifyContent: 'center',
  },
  priceContainerStyle: {
    flex: 1.2,
  },
  sizeContainerStyle: {
    flex: 3,
  },
  sizeOptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: optionSize,
    width: optionSize,
    borderRadius: optionSize,
    backgroundColor: '#b8cdfa',
    margin: 5
  },
  buttonContainerStyle: {
    flex:3.5,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'white'
  },
  buttonTitleContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#d32441',
    borderRadius: 20,
    height: 40,
    width: 150
  }

};

const textStyles = {
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  price: {
    color: '#c33746'
  },
  button: {
    color: 'white'
  }
};


class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faceSize: '0'
    };
    //get the passed params.
    this.product = this.props.navigation.getParam("data");
  }


  sizeOptionComponent = (size) => {
    return (
      <TouchableOpacity style={viewStyles.sizeOptionContainer}
        onPress={() => this.setState({ faceSize: size })}
      >
        <Text>{size}</Text>
      </TouchableOpacity>
    );
  }

  renderSizeOptions = () => {
    return(
      <View>
        <FlatList
          data={[this.product.size]}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          renderItem={({ item }) => (
            this.sizeOptionComponent(item)
          )}
        />
      </View>
    );
  }

  render() {

    return (
    	<View style={viewStyles.container}>

      {/*cancel icon*/}
      <View style={{ flex: 0.9 }}>
        <View style={viewStyles.backIconContainer} >
          <TappableIcon
            icon={require("../../assets/images/logos-icons/cancel.png")}
            size={iconSize}
            onPress={() => {this.props.navigation.pop()}}
          />
        </View>
      </View>

        {/*Face Block*/}
	    	<View style={viewStyles.faceContainerStyle}>
          <Text style={{ fontSize: parseInt(this.state.faceSize) }}>{this.product.face}</Text>
        </View>

        {/*Product Detail Block*/}
        <View style={viewStyles.productDetailContainer}>
          <View style={viewStyles.productDetailSubContainer}>

            {/*Title Block*/}
            <View style={viewStyles.titleContainerStyle}>
              <Text style={textStyles.title}>{'Cool Ascii Face'}</Text>
            </View>

            {/*Price Block*/}
            <View style={viewStyles.priceContainerStyle}>
              <Text style= {textStyles.price}>{formatCentToDollar(this.product.price)}</Text>
            </View>

              {/*Size Block*/}
            <View style={viewStyles.sizeContainerStyle}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>
                  <Text style={{color: '#bfbcbe'}}>Select Size:</Text>
                </View>
                <View style={{ flex: 6 }}>
                  <Text>{this.state.faceSize}</Text>
                </View>
              </View>
              <View style={{ margin: 20 }}>
                {this.renderSizeOptions()}
              </View>
            </View>

              {/*Footer Button Block*/}
            <View style={viewStyles.buttonContainerStyle}>
              <TouchableOpacity style={viewStyles.buttonTitleContainerStyle}>
                <Text style={textStyles.button}> Add to Bag </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
	   	</View>

    );
  }
}

export default ProductDetailScreen;
