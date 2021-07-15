#include "TWR.h"

TWR_Display::TWR_Display(){

}

TWR_Display::~TWR_Display(){

}


void TWR_Display::Update(){

}

void TWR_Display::NewBus(){
    DynamicJsonDocument doc(1024);
    deserializeJson(doc, (char *)ExampleResposne);
    RecivedData CurrentData;

    CurrentData.id = doc["id"];
    CurrentData.needsRepair = doc["needsRepair"];
    CurrentData.needsWashing = doc["needsWashing"];

    M5EPD_Canvas canvas(&M5.EPD);
    M5.EPD.SetRotation(CanvasRotation);
    canvas.createCanvas(CanvasWidth, CanvasHeight);
    canvas.drawPngFile(SD, "/Images/BG.png");
    canvas.setTextSize(4);
    canvas.drawString("Bus: " + String(CurrentData.id), 0, 300);



    canvas.pushCanvas(0, 0, ImageUpdatemode);
    delay(450);





}

void TWR_Display::WasNextPressed(){

}