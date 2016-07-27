#include <ESP8266WiFi.h>
#include <MQTTClient.h>

const char* ssid     = "your_wifi_network_id";
const char* password = "your_wifi_network_password";
const char* host =     "www.boxpop.me";
String url = "/test.html";

WiFiClient net;
const int httpPort = 80;
MQTTClient client;

int calibrationTime = 30;  //the time for sensor to calibrate
long unsigned int lowIn;   //the time when the sensor outputs a low impulse         
long unsigned int pause = 100;  //the amount of milliseconds sensor has to be low before we assume all motion has stopped
boolean lockLow = true;
boolean takeLowTime;  
int i = 1;
int pirPin = 16;    //the digital pin connected to the PIR sensor's output

void connect();     

void setup() {
  Serial.begin(115200);
  pinMode(pirPin, INPUT);
  delay(100);

//initialize WIFI 
  WiFi.begin(ssid, password);
//initialize MQTT 
  client.begin("broker.shiftr.io", net);
  connect();

  Serial.println("calibrating sensor ");     //give the sensor some time to calibrate
    for(int i = 0; i < calibrationTime; i++){
      Serial.print(".");
      delay(1000);
      }
      Serial.println(" done");
      Serial.println("SENSOR ACTIVE");
      delay(50);
}

void connect() {
  Serial.print("trying to connect to ");
  Serial.println(ssid);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.print("successfully connected to ");  
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (!net.connect(host, httpPort)) {
    Serial.println("could not connect :(");
    return;
  }
  
  net.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");
  delay(500);
  
  while(net.available()){
    String line = net.readStringUntil('\r');
    Serial.print(line);
  }
  
  while(!client.connect("minipir", "try", "try")) {   //1st arg = client id, 2nd + 3rd = usr + pwd
    Serial.print(".");
    delay(1000);
  }
}
   
void loop() {
  client.loop();
 
  if(digitalRead(pirPin) == HIGH) {
      if(lockLow) {      //makes sure we wait for transition to LOW before any further OUTPUT
        lockLow = false;
        Serial.print(i++);
        Serial.print(", ");
        Serial.println("motion detected");
        client.publish("/ballotbots", "motion detected");
      }
    }
    
  if(digitalRead(pirPin) == LOW) {    
      if(takeLowTime) {
        lowIn = millis();     //save time of transition from HIGH to LOW
        takeLowTime = false;  //make sure this is done a start of LOW phase
      } //if sensor LOW for more than pause time, assume no more motion is happening
      
      if(!lockLow && millis() - lowIn > pause) { //ensures codeblock is executed only after new motion
        lockLow = true;
      }
    }
}

void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
    Serial.print("incoming: ");
    Serial.print(topic);
    Serial.print(" - ");
    Serial.print(payload);
    Serial.println();
}
 

    
