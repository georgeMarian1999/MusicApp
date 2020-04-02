import React ,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Asset} from 'expo-asset'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {AppLoading} from 'expo'
import LoginScreen from './components/LoginScreen';
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class App extends Component{
  constructor(props){
    super(props)
    this.state ={
      isReady: false
    }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('../MusicApp/assets/apple.png')]);
    await Promise.all([...imageAssets]);
  }


  render(){

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return(
      <LoginScreen />
    )
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
