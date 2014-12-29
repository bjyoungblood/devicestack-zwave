'use strict';

var Command = require('devicestack').Command;
var util = require('util');

function GetVersion() {
  Command.call(this, arguments);
}

util.inherits(GetVersion, Command);

GetVersion.prototype.initialize = function(connection) {
  this.data = [ 0x15 ];
};

module.exports = GetVersion;
