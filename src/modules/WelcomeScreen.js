import React from 'react';
import { Image, Alert } from 'react-native';
import { ENV, WELCOME_MESSAGE } from '../Constants';

import Onboarding from 'react-native-onboarding-swiper';

const styles = {
  ImageStyle: {
     height: 495,
     width:  350
   }
}

const Welcome = (props) => (
  <Onboarding
    onSkip={() => props.navigation.replace('Home')}
    onDone={() => props.navigation.replace('Home')}
    imageContainerStyles={{height: '60%'}}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image
                resizeMode="contain"
  	            style={styles.ImageStyle}
                source={require('../assets/images/AsciiFace1.png')}
              />,
        title: WELCOME_MESSAGE.SCREEN_ONE_TITLE,
        subtitle: WELCOME_MESSAGE.SCREEN_ONE_SUBTITLE,
      },
      {
        backgroundColor: '#fff',
        image: <Image
                  resizeMode="contain"
                  style={styles.ImageStyle}
                  source={require('../assets/images/AsciiFace2.jpg')}
                />,
        title: WELCOME_MESSAGE.SCREEN_TWO_TITLE,
        subtitle: WELCOME_MESSAGE.SCREEN_TWO_SUBTITLE,
      },
      {
        backgroundColor: '#999',
        image: <Image
                  resizeMode="contain"
                  style={styles.ImageStyle}
                  source={{uri:ENV.AD_PARAMS}}
                />,
        title: WELCOME_MESSAGE.SCREEN_THREE_TITLE,
        subtitle: WELCOME_MESSAGE.SCREEN_THREE_SUBTITLE,
      }
    ]}
  />
);

export default Welcome;
