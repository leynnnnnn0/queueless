#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>
#include "config.h"

WebServer server(80); Servo catcher, pickup, trashDoor;
struct ServoConfig { const char* name; Servo* servo; int closedAngle; int openAngle; };
ServoConfig servos[]={{"catcher",&catcher,CATCHER_CLOSED_ANGLE,CATCHER_OPEN_ANGLE},{"pickup",&pickup,PICKUP_CLOSED_ANGLE,PICKUP_OPEN_ANGLE},{"trash",&trashDoor,TRASH_CLOSED_ANGLE,TRASH_OPEN_ANGLE}};

bool authorized(){if(server.header("X-API-Key")!=API_KEY){server.send(401,"application/json","{\"success\":false,\"message\":\"Unauthorized\"}");return false;}return true;}
void sendState(ServoConfig &item,const char* state,int angle){String json="{\"success\":true,\"servo\":\""+String(item.name)+"\",\"state\":\""+state+"\",\"angle\":"+angle+"}";server.send(200,"application/json",json);}
void moveServo(ServoConfig &item,bool open){if(!authorized())return;int angle=open?item.openAngle:item.closedAngle;item.servo->write(angle);Serial.printf("%s -> %s (%d degrees)\n",item.name,open?"open":"closed",angle);sendState(item,open?"open":"closed",angle);}
void registerServoRoutes(ServoConfig* item){String openPath="/api/servo/"+String(item->name)+"/open";String closePath="/api/servo/"+String(item->name)+"/close";server.on(openPath.c_str(),HTTP_POST,[item](){moveServo(*item,true);});server.on(closePath.c_str(),HTTP_POST,[item](){moveServo(*item,false);});}
void registerRoutes(){for(auto &item:servos)registerServoRoutes(&item);server.on("/api/status",HTTP_GET,[](){if(!authorized())return;server.send(200,"application/json","{\"success\":true,\"online\":true}");});server.onNotFound([](){server.send(404,"application/json","{\"success\":false,\"message\":\"Not found\"}");});}
void setup(){Serial.begin(115200);catcher.attach(CATCHER_PIN);pickup.attach(PICKUP_PIN);trashDoor.attach(TRASH_PIN);catcher.write(CATCHER_CLOSED_ANGLE);pickup.write(PICKUP_CLOSED_ANGLE);trashDoor.write(TRASH_CLOSED_ANGLE);WiFi.begin(WIFI_SSID,WIFI_PASSWORD);Serial.print("Connecting");while(WiFi.status()!=WL_CONNECTED){delay(300);Serial.print('.');}Serial.printf("\nReady at http://%s\n",WiFi.localIP().toString().c_str());server.collectHeaders(new const char*[1]{"X-API-Key"},1);registerRoutes();server.begin();}
void loop(){server.handleClient();delay(2);}
