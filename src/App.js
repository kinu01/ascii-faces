
import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {createAppContainer} from "react-navigation";
import { Provider, connect } from 'react-redux';
import configureStore from './store';
import NavigationRoot from './modules';
import ProductsGridScreen from './modules/screens/ProductsGridScreen';
import { SHOULD_SHOW_WELCOME_SCREEN } from './Constants';
import { showWelcomeScreen } from './actions'


const store = configureStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
        shouldShowWelcomeScreen: false,
    };
  }

  componentDidMount() {

    //get shouldShowWelcomeScreen from storage to determine if welcome screen has once been displayed.
    //if it doesn't exist that means app has never been launched
    //set showWelcomeScreen to true and display the welcome screen.
     AsyncStorage.getItem(SHOULD_SHOW_WELCOME_SCREEN).then(value => {
       if(value == null){
        AsyncStorage.setItem(SHOULD_SHOW_WELCOME_SCREEN, "false");
        this.setState({shouldShowWelcomeScreen: true});
      }});
   }

  renderInitialView () {
    const AppNavigation = createAppContainer(NavigationRoot(this.state.shouldShowWelcomeScreen));
    return (
      <Provider store={ store }>
      <AppNavigation />
    </Provider>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderInitialView()}
      </View>
    );
  }
}


export default App;
