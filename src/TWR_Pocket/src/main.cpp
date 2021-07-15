#include "TWR.h"

TWR_Display test;


void setup() {

  M5.begin(true,true,true,false,false);

  Serial.println("Starting AP...");
  WiFi.softAP(SSID, Pass);
  Serial.println("Started AP");
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP adress: ");
  Serial.println(IP);


  test.NewBus();

}

void loop() {
  // put your main code here, to run repeatedly:
}