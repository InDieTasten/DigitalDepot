#include "TWR.h"

TWR_Display display;


void setup() {

  M5.begin(true,true,true,false,false);

  Serial.println("Starting AP...");
  WiFi.softAP(SSID, Pass);
  Serial.println("Started AP");
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP adress: ");
  Serial.println(IP);

  M5.TP.SetRotation(CanvasRotation);


  M5.EPD.Clear(true);


  display.NewBus();

}

void loop() {
  M5.TP.update();
  Serial.println("X: " + String(M5.TP.readFinger(M5.TP.getFingerNum()).x) + " Y: " + String(M5.TP.readFinger(M5.TP.getFingerNum()).y));
  delay(50);
}