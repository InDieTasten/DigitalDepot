#include "TWR.h"

TWR_Display display;


void setup()
{

  M5.begin(true, true, true, false, false);

  Serial.println("Starting AP...");
  WiFi.softAP(SSID, Pass);
  Serial.println("Started AP");
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP adress: ");
  Serial.println(IP);

  M5.TP.SetRotation(CanvasRotation);

  M5.EPD.Clear(true);

  display.NewBus(0);
}

uint16_t _last_pos_x;
uint16_t _last_pos_y;

int count = 1;

void loop()
{
  display.loop();
  delay(100);
}