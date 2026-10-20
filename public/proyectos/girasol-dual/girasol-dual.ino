#include <LiquidCrystal.h>
#include <Servo.h>

// ======================================================
// CONEXIONES
// ======================================================

// LCD: RS, E, D4, D5, D6, D7
LiquidCrystal lcd(12, 8, 5, 4, 3, 2);

Servo servo;

// Servo
const int PIN_SERVO = 7;

// Fotoresistor
const int PIN_LDR = A0;

// LEDs PWM
const int PIN_LED_AZUL = 6;
const int PIN_LED_AMARILLO = 11;


// ======================================================
// CALIBRACION DEL FOTORESISTOR
// ======================================================

// Oscuridad total
const float LDR_MIN = 0;

// Luz maxima aproximada en Tinkercad
const float LDR_MAX = 300;


// ======================================================
// SERVO
// ======================================================

const float ANG_MIN = 0;
const float ANG_MAX = 180;

// Posicion inicial
float angulo = 90;
float objetivo = 90;


// ======================================================
// FILTRO Y MOVIMIENTO
// ======================================================

const int N_MUESTRAS = 16;

// Suavizado de lectura
const float ALFA = 0.20;

// Velocidad de seguimiento
const float KP = 0.15;

// Maximo movimiento por ciclo
const float MAX_PASO = 3.0;

// Evita movimientos pequeños innecesarios
const float ZONA_MUERTA = 2.0;


// ======================================================
// VARIABLES
// ======================================================

float luzF = 0;
float errorGrados = 0;

unsigned long ultimoLCD = 0;


// ======================================================
// LEER FOTORESISTOR
// ======================================================

float leerLDR() {

  long suma = 0;

  for (int i = 0; i < N_MUESTRAS; i++) {
    suma += analogRead(PIN_LDR);
  }

  return (float)suma / N_MUESTRAS;
}


// ======================================================
// CALCULAR NIVEL DE LUZ
//
// 0.0 = oscuridad total
// 1.0 = luz maxima
// ======================================================

float calcularNivelLuz(float lectura) {

  float nivel =
    (lectura - LDR_MIN) /
    (LDR_MAX - LDR_MIN);

  nivel = constrain(nivel, 0.0, 1.0);


  // Si hay menos de 5% de luz,
  // considerar oscuridad total
  if (nivel <= 0.05) {
    nivel = 0.0;
  }


  // Si supera 95%,
  // considerar luz maxima
  if (nivel >= 0.95) {
    nivel = 1.0;
  }

  return nivel;
}


// ======================================================
// CONTROL DE LEDS
//
// OSCURIDAD:
// Azul     = 100%
// Amarillo = 0%
//
// 50% LUZ:
// Azul     = 50%
// Amarillo = 50%
//
// LUZ MAXIMA:
// Azul     = 0%
// Amarillo = 100%
// ======================================================

void actualizarLEDs(float nivelLuz) {

  int brilloAmarillo =
    (int)(nivelLuz * 255.0);

  int brilloAzul =
    255 - brilloAmarillo;


  brilloAzul =
    constrain(brilloAzul, 0, 255);

  brilloAmarillo =
    constrain(brilloAmarillo, 0, 255);


  analogWrite(
    PIN_LED_AZUL,
    brilloAzul
  );

  analogWrite(
    PIN_LED_AMARILLO,
    brilloAmarillo
  );
}


// ======================================================
// SETUP
// ======================================================

void setup() {

  Serial.begin(9600);


  // ----------------------------------------------------
  // LEDs
  // ----------------------------------------------------

  pinMode(PIN_LED_AZUL, OUTPUT);

  pinMode(PIN_LED_AMARILLO, OUTPUT);


  // ----------------------------------------------------
  // LCD
  // ----------------------------------------------------

  lcd.begin(16, 2);

  lcd.setCursor(0, 0);
  lcd.print("Girasol Dual");

  lcd.setCursor(0, 1);
  lcd.print("Iniciando...");


  // ----------------------------------------------------
  // Servo
  // ----------------------------------------------------

  servo.attach(PIN_SERVO);

  servo.write(90);


  // LEDs inicialmente al 50%
  analogWrite(PIN_LED_AZUL, 127);

  analogWrite(PIN_LED_AMARILLO, 127);


  delay(1000);


  // Lectura inicial
  luzF = leerLDR();


  lcd.clear();
}


// ======================================================
// LOOP
// ======================================================

void loop() {

  // ====================================================
  // 1. LEER FOTORESISTOR
  // ====================================================

  float lectura = leerLDR();


  // Filtro para suavizar cambios
  luzF =
    ALFA * lectura +
    (1.0 - ALFA) * luzF;


  // ====================================================
  // 2. NIVEL DE LUZ
  // ====================================================

  float nivelLuz =
    calcularNivelLuz(luzF);


  // Porcentaje 0 - 100
  int porcentajeLuz =
    (int)(nivelLuz * 100.0);


  // ====================================================
  // 3. ACTUALIZAR LEDS
  // ====================================================

  actualizarLEDs(nivelLuz);


  // ====================================================
  // 4. CONVERTIR LUZ A ANGULO
  // ====================================================

  objetivo =
    ANG_MIN +
    nivelLuz *
    (ANG_MAX - ANG_MIN);


  objetivo =
    constrain(
      objetivo,
      ANG_MIN,
      ANG_MAX
    );


  // ====================================================
  // 5. MOVIMIENTO DEL SERVO
  // ====================================================

  errorGrados =
    objetivo - angulo;


  if (fabs(errorGrados) > ZONA_MUERTA) {

    float paso =
      KP * errorGrados;


    paso =
      constrain(
        paso,
        -MAX_PASO,
        MAX_PASO
      );


    angulo += paso;


    angulo =
      constrain(
        angulo,
        ANG_MIN,
        ANG_MAX
      );


    servo.write(
      (int)angulo
    );
  }


  // ====================================================
  // 6. PORCENTAJE DE LOS LEDS
  // ====================================================

  int porcentajeAmarillo =
    porcentajeLuz;


  int porcentajeAzul =
    100 - porcentajeLuz;


  // ====================================================
  // 7. LCD
  // ====================================================

  if (millis() - ultimoLCD >= 250) {

    ultimoLCD = millis();


    char linea[17];


    // Primera linea
    snprintf(
      linea,
      sizeof(linea),
      "Ang:%3d Luz:%3d",
      (int)angulo,
      porcentajeLuz
    );


    lcd.setCursor(0, 0);

    lcd.print("                ");

    lcd.setCursor(0, 0);

    lcd.print(linea);


    // Segunda linea
    snprintf(
      linea,
      sizeof(linea),
      "Az:%3d Am:%3d",
      porcentajeAzul,
      porcentajeAmarillo
    );


    lcd.setCursor(0, 1);

    lcd.print("                ");

    lcd.setCursor(0, 1);

    lcd.print(linea);
  }


  // ====================================================
  // 8. MONITOR SERIAL
  // ====================================================

  Serial.print("LDR: ");
  Serial.print(luzF);


  Serial.print(" | Luz: ");
  Serial.print(porcentajeLuz);
  Serial.print("%");


  Serial.print(" | Objetivo: ");
  Serial.print(objetivo);


  Serial.print(" | Angulo: ");
  Serial.print(angulo);


  Serial.print(" | Azul: ");
  Serial.print(porcentajeAzul);
  Serial.print("%");


  Serial.print(" | Amarillo: ");
  Serial.print(porcentajeAmarillo);
  Serial.println("%");


  delay(30);
}