import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ListView,
  Dimensions,
} from 'react-native';
import WalkbaseEngageManager from 'react-native-walkbase-engage';

const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const WalkbaseEngageManagerModule = NativeModules.WalkbaseEngageManager;
const weManagerEmitter = new NativeEventEmitter(WalkbaseEngageManagerModule);

export default class App extends Component {
  constructor(){
    super()

    this.handleEvent1 = this.handleEvent1.bind(this);
    this.handleEvent2 = this.handleEvent2.bind(this);
    this.handleEvent3 = this.handleEvent3.bind(this);
    this.handleEvent4 = this.handleEvent4.bind(this);
    this.handleEvent5 = this.handleEvent5.bind(this);
    this.handleEvent6 = this.handleEvent6.bind(this);
    this.handleEvent7 = this.handleEvent7.bind(this);
  }

  componentDidMount() {
    this.handlerDiscover1 = weManagerEmitter.addListener('WBEngageManagerStateNotDetermined', this.handleEvent1 );
    this.handlerDiscover2 = weManagerEmitter.addListener('WBEngageManagerStateInitializing', this.handleEvent2 );
    this.handlerDiscover3 = weManagerEmitter.addListener('WBEngageManagerStatePaused', this.handleEvent3 );
    this.handlerDiscover4 = weManagerEmitter.addListener('WBEngageManagerStateScanning', this.handleEvent4 );
    this.handlerDiscover5 = weManagerEmitter.addListener('WBEngageManagerStateFailed', this.handleEvent5 );
    this.handlerDiscover6 = weManagerEmitter.addListener('WBEngageManagerReceivedAdvertisement', this.handleEvent6 );
    this.handlerDiscover7 = weManagerEmitter.addListener('WBEngageManagerOff', this.handleEvent7 );

  }

  handleEvent1(data) {
    alert(JSON.stringify(data));
  }
  handleEvent2(data) {
    alert(JSON.stringify(data));
  }
  handleEvent3(data) {
    alert(JSON.stringify(data));
  }
  handleEvent4(data) {
    alert(JSON.stringify(data));
  }
  handleEvent5(data) {
    alert(JSON.stringify(data));
  }
  handleEvent6(data) {
    alert(JSON.stringify(data));
    // alert(JSON.stringify(data));
  }
  handleEvent7(data) {
    alert(JSON.stringify(data));
    // alert(JSON.stringify(data));
  }
  

  componentWillUnmount() {
    this.handlerDiscover1.remove();
    this.handlerDiscover2.remove();
    this.handlerDiscover3.remove();
    this.handlerDiscover4.remove();
    this.handlerDiscover5.remove();
    this.handlerDiscover6.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
});
