'use strict';

var Connection = require('devicestack').Connection;
var util = require('util');
var FrameHandler = require('./FrameHandler');

function ZWaveConnection(device) {
  Connection.call(this, device);

  this.frameHandler = new FrameHandler(device);
  this.frameHandler.on('receive', function(frame) {

    // ACK the received frame
    if (frame.header === 0x01) {
      // console.trace();
      this.frameHandler.send([ 0x06 ]);

      if (frame.type === 'response') {
        this.commandQueue[0].callback(frame);
      }
    }

  }.bind(this));
}

util.inherits(ZWaveConnection, Connection);

ZWaveConnection.prototype.sendCommand = function(command, callback) {
  this.frameHandler.send(command.data);
};

module.exports = ZWaveConnection;
