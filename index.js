'use strict';

var Device = require('./lib/zwave/Device');

var device = new Device('/tmp/cu.SLAB_USBtoUART');

var GetVersion = require('./lib/commands/GetVersion');

device.on('connect', function() {
  device.connection.executeCommand(new GetVersion(), function(response) {
    console.log(response);
  });
});

device.connect();

