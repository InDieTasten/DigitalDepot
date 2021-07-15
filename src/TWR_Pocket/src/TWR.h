#include <Arduino.h>
#include <M5EPD.h>
#include <WiFi.h>
#include <ArduinoJson.h>

#ifndef _TWR_
#define _TWR_

#define SSID "TWR_Network"
#define Pass "123456789"

#define ServerIP "10.25.10.2"

#define ExampleResposne '{"id":0,"isMaxi":false,"isElectric":true,"length":18,"needsWashing":true,"needsRepair":false}'


class TWR_Display{
public:
    TWR_Display();
    ~TWR_Display();

    void NewBus();
    void Update();

private:
    void WasNextPressed();

};



#endif