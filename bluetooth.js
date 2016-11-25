module.exports = function(btSerial) {
  btSerial.on('found', function(address, name) {
    console.log("Found object: ", address, name)
    if (address == '20-14-08-14-19-88') {
      btSerial.findSerialPortChannel(address, function(channel) {
          var connectToUno = function() {
            btSerial.connect(address, channel, function() {
                console.log('connected');
                /*btSerial.on('data', function(buffer) {
                    console.log(buffer.toString('utf-8'));
                });*/
                module.exports.connected = true;
            }, function () {
                console.log('cannot connect');
                connectToUno();
            });
          }

          connectToUno();
      }, function() {
          console.log('found nothing');
      });
    }
  });

  btSerial.inquire();

  return {
    serial: btSerial,
    connected: false
  }
};
