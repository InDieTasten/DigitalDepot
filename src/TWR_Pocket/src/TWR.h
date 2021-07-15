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


//===============================================================================================

//Stadard canvas height and width used
const int CanvasRotation = 90;
const int CanvasWidth = 540;
const int CanvasHeight = 960;

//This is the update mode used in the DrawPNGImage function. Other modes can be found in ./pio/libdeps/m5stack-fire/M5EPD/src/M5EPD_Driver.h
const m5epd_update_mode_t ImageUpdatemode = UPDATE_MODE_GC16;

//===============================================================================================
//Settings


class TWR_Display{
public:
    TWR_Display();
    ~TWR_Display();

    void NewBus();
    void Update();

private:
    void WasNextPressed();

};

struct RecivedData {

    unsigned int id;
    bool needsWashing;
    bool needsRepair;
};



#endif