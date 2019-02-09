import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { ENV } from '../../Constants';
import { loadAd } from '../../actions'

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
	sponsorAdFieldContainer: {
		height: '99%',
		width: '88%',
		borderRadius: 8,
		shadowColor: "#006",
		elevation: 2,
		shadowColor: '#000',
	    shadowOffset: {
	      width: 0,
	      height: 2
	    },
	    shadowOpacity: 0.2,
		justifyContent: 'center',
		alignItems: 'center'
	},
  imageStyle: {
    height: '90%',
    width: '98%'
  }

};

const textStyles = {
};


class AdItem extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {

    const { previousAd, loadAd } = this.props
    const maximumAd = 10

    let generatedRandomAd;

    do {
      generatedRandomAd = Math.floor(Math.random() * 1000)
      generatedRandomAd = generatedRandomAd % maximumAd
    } while (previousAd === generatedRandomAd)

    loadAd(generatedRandomAd)

    this.adUrl = ENV.AD_PARAMS + generatedRandomAd
  }

  render() {

    return (
        <View style={viewStyles.container}>
  	    	<TouchableOpacity style={viewStyles.sponsorAdFieldContainer}
            onPress={this.props.onItemTapped}
          >
            <Image
              style={viewStyles.imageStyle}
              source={{uri: this.adUrl }}
            />
  	    	</TouchableOpacity>
        </View>

    );
  }
}

AdItem.propTypes = {
  onItemTapped: PropTypes.func
};

const mapStateToProps = (state) => {
  const { previousAd } = state.app
  return { previousAd }
};

export default connect(mapStateToProps, { loadAd })(AdItem)
