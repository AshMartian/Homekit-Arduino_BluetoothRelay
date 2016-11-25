var request = require("request");
var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var serial = require('./bluetooth')(btSerial).serial;

var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-light", "UnoLight", RelayAccessory);
}

function RelayAccessory(log, config) {
    this.log = log;
    this.config = config;
    this.name = config["name"];

    this.service = new Service.Lightbulb(this.name);
    this.service
        .getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this));
}

var light_status = false;

RelayAccessory.prototype.getOn = function(callback) {
    callback(null, light_status);
}

RelayAccessory.prototype.setOn = function(on, callback) {
    var currentOn = on ? '1' : '0';
    var siri_on = currentOn == '1' ? 'on' : 'off';

    console.log("Setting Light ", on, "For status", light_status);
    serial.write(new Buffer(currentOn, 'utf-8'), function(err, bytesWritten) {
        if (err) return console.log(err);
        console.log("Set Light ", siri_on);
        light_status = on;
        callback(null, siri_on);
    });
}

RelayAccessory.prototype.getServices = function() {
    return [this.service];
}

process.on('SIGINT', function() {
  serial.close();
});
