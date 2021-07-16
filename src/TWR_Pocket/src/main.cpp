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
  M5.TP.update();

  bool is_finger_up = M5.TP.isFingerUp();
  if (is_finger_up || (_last_pos_x != M5.TP.readFingerX(0)) || (_last_pos_y != M5.TP.readFingerY(0)))
  {
    _last_pos_x = M5.TP.readFingerX(0);
    _last_pos_y = M5.TP.readFingerY(0);
  }
  if(!is_finger_up){
  // Serial.println("X: " + String(M5.TP.readFinger(0).x) + " Y: " + String(M5.TP.readFinger(0).y));

  display.NewBus(count);
  count++;
  delay(1000);

  }
  M5.TP.flush();
  delay(50);
}