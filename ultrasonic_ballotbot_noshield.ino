int trig = 7;									//declares Arduino pin 7 as “trig”
int echo = 8; 									//declares Arduino pin 8 as “echo”
float v = 331.5 + 0.6 * 20;						//calculates speed of sound at 20 deg c

void setup() {
	Serial.begin(9600);							//starts Serial Monitor at 9600 baud 
	pinMode(trig, OUTPUT);						//initializes trig as output pin
	pinMode(echo, INPUT);						//initializes echo as input pin
        delay(5000);            				//wait 5 seconds for sensor to settle
}

float distance() {
	digitalWrite(trig, LOW);					//set trig pin
	delay(500);									//wait 500ms
	digitalWrite(trig, HIGH);					//initiate a ping!
	delay(500);									//wait 500ms
	digitalWrite(trig, LOW);					//reset trig pin
	float range = pulseIn(echo, HIGH);			//when echo received
	float t = range / 1000.0 / 1000.0 / 2;		//turn echo range into secs
	float d = t * v;							//calculate time * velocity
	return d * 100;								//translate dist into cms
}  

void loop() {
	int d = distance();							//d = distance function
	Serial.print(F("distance in cm: "));   		//print "distance in cm: " text
        	Serial.println(d, DEC);         	//print distance reading
         	 	if (d < 10) {          			//if distance is less than 10cm
	     	Serial.println("ballot detected"); 	//print "ballot detected" text
          		}
}
