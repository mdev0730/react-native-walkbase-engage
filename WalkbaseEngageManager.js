'use strict';
var React = require('react-native');
var weManager = React.NativeModules.WalkbaseEngageManager;

class WalkbaseEngageManager  {

  constructor() {
    this.isPeripheralConnected = this.isPeripheralConnected.bind(this);
  }

  isPeripheralConnected(peripheralId, serviceUUIDs) {
    return this.getConnectedPeripherals(serviceUUIDs).then((result) => {
      if (result.find((p) => { return p.id === peripheralId; })) {
        return true;
      } else {
        return false;
      }
    });
  }
}

module.exports = new WalkbaseEngageManager();
