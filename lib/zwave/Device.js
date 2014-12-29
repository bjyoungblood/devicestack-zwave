'use strict';

var util = require('util');
var SerialDevice = require('devicestack').SerialDevice;
var Connection = require('./Connection');

function ZWaveSerialDevice(port) {
  SerialDevice.call(this, port, {
    baudrate : 115200,
    databits : 8,
    stopbits : 1,
    parity : 'none',
  }, Connection);
}

util.inherits(ZWaveSerialDevice, SerialDevice);

module.exports = ZWaveSerialDevice;
