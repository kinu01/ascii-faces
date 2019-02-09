export * from './action-types'

export const PRODUCTS_BEFORE_AD = 20;
export const FETCH_LIMIT = 10;
export const DEFAULT_SORT_VALUE = 'id';

//Action should show welcome screen
export const SHOULD_SHOW_WELCOME_SCREEN ='shoulWelcomeScreen';

export const WELCOME_MESSAGE = {
  SCREEN_ONE_TITLE: 'Cool Ascii Face',
  SCREEN_ONE_SUBTITLE: "Here you're sure to find a bargain on some of the finest Ascii available to purchase.",
  SCREEN_TWO_TITLE: "",
  SCREEN_TWO_SUBTITLE: "Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices. But first, a word from our sponsors: ",
  SCREEN_THREE_TITLE: "Sponsor Ad",
  SCREEN_THREE_SUBTITLE: ""
};



export const API_ENDPOINT = '/products'
const DEV = {
  API: {
    baseURL: 'http://localhost:3000/',
    timeout: 9000,
  },
  AD_PARAMS: 'https://unsplash.it/',
  AD_URL: 'https://unsplash.it'
}

const PRODUCTION = {
  API: {

   }
}


export const ENV = (process.env.NODE_ENV === 'production') ? PRODUCTION : DEV ;
