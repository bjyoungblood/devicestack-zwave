# devicestack-zwave

This is a Node.JS module that implements the Z-Wave protocol. The goal of this
project is to supply a robust interface to administer and control a Z-Wave
network.

I do not intend to offer any home automation functionality in this module beyond
the Z-Wave protocol. My intention is to build a home automation library as a separate
project, such that it is not protocol-dependent.

**Disclaimer:** this project does not use and cannot accept any input (documentation,
code, or even advice) from individuals or entities under NDA with Sigma Designs.

### Development Notes

[`interceptty`](http://www.suspectclass.com/sgifford/interceptty/) has been an incredibly useful tool so far.

If you are using the Aeon Labs Z-Stick, you can use the following command to create
a mirrored serial port (on OSX, at least).

`interceptty -s 'ispeed 115200 ospeed 115200' /dev/cu.SLAB_USBtoUART /tmp/cu.SLAB_USBtoUART`

Be sure to connect to `/tmp/cu.SLAB_USBtoUART` and not the `/dev/` device.

### References
 - Incredibly helpful compilation of Z-Wave data - https://github.com/yepher/RaZBerry
 - OpenZWave - https://code.google.com/p/open-zwave/
