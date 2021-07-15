#include "TWR.h"

void setup() {

  M5.begin(true,false,true,false,false);

  Serial.println("Starting AP...");
  WiFi.softAP(SSID, Pass);
  Serial.println("Started AP");
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP adress: ");
  Serial.println(IP);

}

void loop() {
  // put your main code here, to run repeatedly:
}