#include "DHT.h"

#define SENSOR_PIN A0
#define LDR_SENSOR A1
#define DHTPIN 2
#define DHTTYPE DHT12

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(SENSOR_PIN, INPUT);
  pinMode(LDR_SENSOR, INPUT);
}

void loop() {
  delay(2000);  // Intervalo necessário para o DHT

  // Leitura LDR
  int leituraLDR = analogRead(LDR_SENSOR);  // Leitura bruta
  int luminosidade = map(leituraLDR, 0, 1023, 0, 100);

  // Leitura DHT
  float umidadeAr = dht.readHumidity();
  float temperatura = dht.readTemperature();

  // Leitura Umidade do Solo
  int leituraSolo = analogRead(SENSOR_PIN);
  int umidadeSolo = map(leituraSolo, 1023, 0, 0, 100);

  // Tratamento de erro simples para o DHT
  if (isnan(umidadeAr) || isnan(temperatura)) {
    umidadeAr = 0;
    temperatura = 0;
  }

  // Saída para o gateway
  Serial.print(umidadeSolo);
  Serial.print(",");
  Serial.print(umidadeAr);
  Serial.print(",");
  Serial.print(temperatura);
  Serial.print(",");
  Serial.println(luminosidade);
}
