#include <Wire.h>                     //to communicate with board I2C 
#include <RTClib.h>                   //to communicate with shield RTC
#include <SD.h>                       //to communicate with shield SD card

const int sdpow = 3;                  //sets power for SD  
const int sdpin = 10;                 //default tx for SD 
const int rtcpow = A3;                //sets power for rtc 
const int rtcgnd = A2;                //sets ground for rtc
int trig = 7;            
int echo = 8;            
float v = 331.3 + 0.606 * 20;   
int i = 1;                            //start point for Serial count++
int x = 1;                            //start point for SD card count++

RTC_DS1307 rtc;                       //initialize use of rtc 

void setup() {
  Serial.begin(9600);
  pinMode(sdpow, OUTPUT);    
  digitalWrite(sdpow, HIGH); 
  pinMode(sdpin, OUTPUT);
  pinMode(rtcpow, OUTPUT);
  digitalWrite(rtcpow, HIGH);
  pinMode(rtcgnd, OUTPUT);
  digitalWrite(rtcgnd, LOW);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  delay(5000);
  
  if(!SD.begin(sdpin)) {              //if card comm fail
    Serial.println("Card Fail");
    return;
  }
  
  Serial.println("Card Success");     //else 

  Wire.begin();                       //start I2C comm
  
  rtc.begin();                        //start rtc comm

  if(!rtc.begin()) {                  //if rtc start fails
    Serial.println("RTC Fail");
    return;
  }
  
  Serial.println("RTC Success");      //else
  
  //open SD card, create & open csv, write CSV header, close file:
  File logFile = SD.open("counter.csv", FILE_WRITE);
    if(logFile) {
        String header = "label,reading,date,time,value,unit,cm";
        logFile.println(header);
        logFile.close();
        Serial.println(header);       //also print to Serial Monitor 
    }
    
    else {
        Serial.println("Error - Not Writing to Card");   
    }
}

float distance() {
  digitalWrite(trig, LOW);
  delay(500);
  digitalWrite(trig, HIGH);
  delay(500);
  digitalWrite(trig, LOW);
  float range = pulseIn(echo, HIGH);
  float t = range / 1000.0 / 1000.0 / 2;
  float d = t * v;
  return d * 100;
}

void loop() {
  DateTime now = rtc.now();         //to use now command

//for only readings < 10 print to Serial & log to SD card
  int d = distance(); 
    if(d < 10) {
       File logFile = SD.open("counter.csv", FILE_WRITE);
         if(logFile) {
           Serial.print(i++);      
           logFile.print(x++);     
           Serial.print(", ");              
           logFile.print(",");    
           Serial.print("Ballot Detected");
           logFile.print("Ballot Detected");
           Serial.print(", ");
           logFile.print(",");
           Serial.print(now.month(), DEC);
           logFile.print(now.month(), DEC);
           Serial.print("/");
           logFile.print("/");
           Serial.print(now.day(), DEC);
           logFile.print(now.day(), DEC);
           Serial.print("/");
           logFile.print("/");
           Serial.print(now.year(), DEC);
           logFile.print(now.year(), DEC);
           Serial.print(", ");
           logFile.print(",");
           Serial.print(now.hour(), DEC);
           logFile.print(now.hour(), DEC);
           Serial.print(":");
           logFile.print(":");
           Serial.print(now.minute(), DEC);
           logFile.print(now.minute(), DEC);
           Serial.print(":");
           logFile.print(":");
           Serial.print(now.second(), DEC);
           logFile.print(now.second(), DEC);
           Serial.print(", ");
           logFile.print(",");
           Serial.print(now.unixtime());
           logFile.print(now.unixtime());
           Serial.print(", ");
           logFile.print(",");
           Serial.print("distance");
           logFile.print("distance");
           Serial.print(", ");
           logFile.print(",");
           Serial.println(d, DEC);
           logFile.println(d, DEC);
           logFile.close();
         }
       else {
         Serial.println("not logging");
       }
    }
}  
