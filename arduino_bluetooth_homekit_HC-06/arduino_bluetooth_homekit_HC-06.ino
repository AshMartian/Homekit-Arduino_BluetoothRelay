String message; //string that stores the incoming message

String state = "on";

void setup()
{
  pinMode(12, OUTPUT);
  pinMode(3, OUTPUT);

  Serial.begin(9600); //set baud rate
}

void turnOn() {
  digitalWrite(12, HIGH);   // turn the LED on
  digitalWrite(3, HIGH);   // turn the LED on
  state = "on";
}

void turnOff() {
  digitalWrite(12, LOW);   // turn the LED off;lk'p9
  digitalWrite(3, LOW);   // turn the LED on
  state = "off";
}

void loop()
{
  while(Serial.available()) {//while there is data available on the serial monitor
    message=char(Serial.read());//store string from serial command
  }
  
  if(!Serial.available()) {
     if (message=="1") {
        if (state!="on") {
          turnOn();
        }
     }
     
     if (message=="0") {
        if (state!="off") {
          turnOff();
        }
     }
  }
  
  delay(500);
}


