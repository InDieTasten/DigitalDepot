#include "TWR.h"

void TWR_Display::loop()
{
    uint8_t ButtonCallBack = WasButtonPressed();
    Serial.println("Update return value is: " + String(ButtonCallBack));

    if(ButtonCallBack == 1){
        //sendSuccess to server
        display.NewBus(1);
        delay(500);
    }
    else if(ButtonCallBack == 2){
        display.NewBus(0);
        delay(500);
    }

    M5.TP.flush();
}

String ConvertBool_Ja_Nein(bool value)
{
    if (value)
    {
        return String("Ja");
    }
    else
    {
        return String("Nein");
    }
}

void TWR_Display::NewBus(int run)
{
    DynamicJsonDocument doc(1024);
    // deserializeJson(doc, (char *)ExampleResposne);

    if (run == 0)
    {
        doc["id"] = 123;
        doc["needsRepair"] = false;
        doc["needsWashing"] = true;
    }
    else if (run == 1)
    {
        doc["id"] = 154;
        doc["needsRepair"] = true;
        doc["needsWashing"] = false;
    }
    else
    {
        doc["id"] = 167;
        doc["needsRepair"] = true;
        doc["needsWashing"] = true;
    }

    RecivedData CurrentData;

    CurrentData.id = doc["id"];
    CurrentData.needsRepair = doc["needsRepair"];
    CurrentData.needsWashing = doc["needsWashing"];

    M5EPD_Canvas canvas(&M5.EPD);
    M5.EPD.SetRotation(CanvasRotation);
    canvas.createCanvas(CanvasWidth, CanvasHeight);
    canvas.drawPngFile(SD, "/Images/BG.png");
    canvas.setTextSize(4);

    // canvas.loadFont("/Fonts/impact.ttf", SD); //Fonts will not load for some reason
    canvas.drawString("Bus Nummer: " + String(CurrentData.id), 20, 300);
    canvas.drawString("Wasch: " + ConvertBool_Ja_Nein(CurrentData.needsWashing), 20, 350);
    canvas.drawString("Wartung: " + ConvertBool_Ja_Nein(CurrentData.needsRepair), 20, 400);

    canvas.pushCanvas(0, 0, ImageUpdatemode);
    delay(450);
}

//Function to check if the location of the finger is within a range
bool IsInRange(tp_finger_t Finger_Coord, uint16_t X_Min, uint16_t X_Max, uint16_t Y_Min, uint16_t Y_max){
    if(Finger_Coord.x < X_Max && Finger_Coord.x > X_Min && Finger_Coord.y < Y_max && Finger_Coord.y > Y_Min){
        return true;
    }
    else{
        return false;
    }
}


uint8_t TWR_Display::WasButtonPressed()
{
    M5.TP.update();

    bool is_finger_up = M5.TP.isFingerUp();
    if (is_finger_up || (_last_pos_x != M5.TP.readFingerX(0)) || (_last_pos_y != M5.TP.readFingerY(0)))
    {
        _last_pos_x = M5.TP.readFingerX(0);
        _last_pos_y = M5.TP.readFingerY(0);
    }
    if (!is_finger_up)
    {
        // Serial.println("X: " + String(M5.TP.readFinger(0).x) + " Y: " + String(M5.TP.readFinger(0).y));
        

        //Here we need to check if the press was registerd on one of the two buttons
        //Erfüllt: 60,670 -> 450,720
        //Störung: 60,815 -> 450,875
        if(IsInRange(M5.TP.readFinger(0), 60, 450, 670, 720)){
            return 1;
        }
        else if(IsInRange(M5.TP.readFinger(0), 60, 450, 815, 875)){
            return 2;
        }
        else{
            return 0;
        }


    }
    M5.TP.flush();

    return 0;
}