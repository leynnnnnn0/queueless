#include <Arduino.h>
#include <ESP32Servo.h>
#include <WebServer.h>
#include <WiFi.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "config.h"
WebServer server(80); Adafruit_SSD1306 display(128,64,&Wire,-1); Servo catcher,pickup,trashDoor;
struct ServoConfig{const char* name;Servo* servo;int closedAngle;int openAngle;bool open;};
ServoConfig servos[]={{"catcher",&catcher,CATCHER_CLOSED_ANGLE,CATCHER_OPEN_ANGLE,false},{"pickup",&pickup,PICKUP_CLOSED_ANGLE,PICKUP_OPEN_ANGLE,false},{"trash",&trashDoor,TRASH_CLOSED_ANGLE,TRASH_OPEN_ANGLE,false}}; bool lockerOccupied=false;
void renderDisplay(){display.clearDisplay();display.setTextColor(SSD1306_WHITE);display.setTextSize(1);display.setCursor(0,0);display.printf("Locker 1: %s\n\n",lockerOccupied?"OCCUPIED":"AVAILABLE");display.printf("Catcher: %s\n",servos[0].open?"OPEN":"CLOSED");display.printf("Pickup:  %s\n",servos[1].open?"OPEN":"CLOSED");display.printf("Dropper: %s",servos[2].open?"OPEN":"CLOSED");display.display();}
bool authorized(){if(server.header("X-API-Key")==API_KEY)return true;server.send(401,"application/json","{\"success\":false,\"message\":\"Unauthorized\"}");return false;}
void moveServo(ServoConfig& item,bool open){if(!authorized())return;int angle=open?item.openAngle:item.closedAngle;item.servo->write(angle);item.open=open;renderDisplay();Serial.printf("%s -> %s (%d degrees)\n",item.name,open?"open":"closed",angle);String json="{\"success\":true,\"servo\":\""+String(item.name)+"\",\"state\":\""+(open?"open":"closed")+"\",\"angle\":"+angle+"}";server.send(200,"application/json",json);}
void setLockerState(bool occupied){if(!authorized())return;lockerOccupied=occupied;renderDisplay();server.send(200,"application/json",occupied?"{\"success\":true,\"locker\":1,\"state\":\"occupied\"}":"{\"success\":true,\"locker\":1,\"state\":\"available\"}");}
void registerServoRoutes(ServoConfig* item){String o="/api/servo/"+String(item->name)+"/open",c="/api/servo/"+String(item->name)+"/close";server.on(o.c_str(),HTTP_POST,[item](){moveServo(*item,true);});server.on(c.c_str(),HTTP_POST,[item](){moveServo(*item,false);});}
void registerRoutes(){for(auto& item:servos)registerServoRoutes(&item);server.on("/api/locker/occupied",HTTP_POST,[](){setLockerState(true);});server.on("/api/locker/available",HTTP_POST,[](){setLockerState(false);});server.on("/api/status",HTTP_GET,[](){if(!authorized())return;server.send(200,"application/json","{\"success\":true,\"online\":true,\"locker\":\""+String(lockerOccupied?"occupied":"available")+"\"}");});server.onNotFound([](){server.send(404,"application/json","{\"success\":false,\"message\":\"Not found\"}");});}
void setup(){Serial.begin(115200);Wire.begin(OLED_SDA_PIN,OLED_SCL_PIN);if(!display.begin(SSD1306_SWITCHCAPVCC,OLED_I2C_ADDRESS))Serial.println("SSD1306 display not found");catcher.attach(CATCHER_PIN);pickup.attach(PICKUP_PIN);trashDoor.attach(TRASH_PIN);catcher.write(CATCHER_CLOSED_ANGLE);pickup.write(PICKUP_CLOSED_ANGLE);trashDoor.write(TRASH_CLOSED_ANGLE);renderDisplay();WiFi.begin(WIFI_SSID,WIFI_PASSWORD);Serial.print("Connecting");while(WiFi.status()!=WL_CONNECTED){delay(300);Serial.print('.');}Serial.printf("\nReady at http://%s\n",WiFi.localIP().toString().c_str());const char* headers[]={"X-API-Key"};server.collectHeaders(headers,1);registerRoutes();server.begin();}
void loop(){server.handleClient();delay(2);}
