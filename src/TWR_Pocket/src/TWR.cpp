#include "TWR.h"

void TWR_Display::Update(){

}

String ConvertBool_Ja_Nein(bool value){
    if(value){
        return String("Ja");
    }
    else{
        return String("Nein");
    }
}


void TWR_Display::NewBus(){
    DynamicJsonDocument doc(1024);
    // deserializeJson(doc, (char *)ExampleResposne);

    doc["id"] = 123;
    doc["needsRepair"] = false;
    doc["needsWashing"] = true;


    RecivedData CurrentData;

    CurrentData.id = doc["id"];
    CurrentData.needsRepair = doc["needsRepair"];
    CurrentData.needsWashing = doc["needsWashing"];

    M5EPD_Canvas canvas(&M5.EPD);
    M5.EPD.SetRotation(CanvasRotation);
    canvas.createCanvas(CanvasWidth, CanvasHeight);
    canvas.drawPngFile(SD, "/Images/BG.png");
    canvas.setTextSize(4);
    canvas.drawString("Bus Nummer: " + String(CurrentData.id), 20, 300);
    canvas.drawString("Wasch: " + ConvertBool_Ja_Nein(CurrentData.needsWashing), 20, 350);
    canvas.drawString("Wartung: " + ConvertBool_Ja_Nein(CurrentData.needsRepair), 20, 400);




    canvas.pushCanvas(0, 0, ImageUpdatemode);
    delay(450);





}

void TWR_Display::WasNextPressed(){

}