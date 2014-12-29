'use strict';

var FrameHandler = require('devicestack').FrameHandler;
var util = require('util');

function generateChecksum(array) {
  var checksum = array[0];

  for (var i = 0; i < array.length; i++) {
    checksum ^= array[i];
  }

  return ~checksum;
}

function ZWaveFrameHandler(device) {
  FrameHandler.call(this, device);

  this.log = false;
}

util.inherits(ZWaveFrameHandler, FrameHandler);

ZWaveFrameHandler.prototype.analyzeNextFrame = function(incoming) {
  var header = incoming[0];

  if (incoming.length === 0) {
    return null;
  }

  // Handle ACKs, NAKs, and CANs
  if (header !== 0x01) {
    return incoming.splice(0, 1);
  }

  var zwFrameLength = incoming[1];
  var fullFrameLength = zwFrameLength + 2;

  if (incoming.length < fullFrameLength - 1) {
    return null;
  }

  return incoming.splice(0, fullFrameLength);
};

ZWaveFrameHandler.prototype.wrapFrame = function(frame) {
  if (frame.length === 1 && frame[0] === 0x06) {
    return frame;
  }

  frame.unshift(0x00); // request
  frame.unshift(frame.length + 1); // length (+1 for checksum)
  frame.unshift(0x01); // header

  frame.push(generateChecksum(frame));

  return frame;
};

ZWaveFrameHandler.prototype.unwrapFrame = function(frame) {

  var obj = {
    data : frame,
    header : frame[0],
    length : frame[1],
    type : frame[2] === 0x00 ? 'request' : 'response',
    func : frame[3]
  };

  return obj;
};

module.exports = ZWaveFrameHandler;
