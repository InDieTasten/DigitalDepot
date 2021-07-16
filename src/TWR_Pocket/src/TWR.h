#include <Arduino.h>
#include <M5EPD.h>
#include <WiFi.h>
#include <ArduinoJson.h>

#ifndef _TWR_
#define _TWR_

#define SSID "TWR_Network"
#define Pass "123456789"

#define ServerIP "192.168.4.2"



//===============================================================================================

//Stadard canvas height and width used
const int CanvasRotation = 90;
const int CanvasWidth = 540;
const int CanvasHeight = 960;

//This is the update mode used in the DrawPNGImage function. Other modes can be found in ./pio/libdeps/m5stack-fire/M5EPD/src/M5EPD_Driver.h
const m5epd_update_mode_t ImageUpdatemode = UPDATE_MODE_GC16;

//===============================================================================================




class TWR_Display{
public:

    void NewBus(int run);
    void loop();

private:
    //Function returns 0 if nothing was pressed
    //Returns 1 If Erfühlt was pressed
    //Returns 2 If Störug was pressed
    uint8_t WasButtonPressed();


    //last pos of the finger to make sure the click isn't registered more than once
    uint16_t _last_pos_x;
    uint16_t _last_pos_y;

};

extern TWR_Display display;


struct RecivedData {

    unsigned int id;
    bool needsWashing;
    bool needsRepair;
};



#endif