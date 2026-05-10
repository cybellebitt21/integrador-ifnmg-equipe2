#include "DHT.h"

#define SENSOR_PIN A0
#define LDR_SENSOR A1
#define DHTPIN 2
#define DHTTYPE DHT22

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
  unsigned int leituraLDR = analogRead(LDR_SENSOR);  // Leitura bruta
  unsigned int luminosidade = map(leituraLDR, 0, 1023, 0, 100);

  // Leitura DHT
  float umidadeAr = dht.readHumidity();
  float temperatura = dht.readTemperature();

  // Leitura Umidade do Solo
  unsigned int leituraSolo = analogRead(SENSOR_PIN);
  unsigned int umidadeSolo = map(leituraSolo, 1023, 0, 0, 100);

  // Tratamento de erro simples para o DHT
  if (isnan(umidadeAr) || isnan(temperatura)) {
    umidadeAr = 0;
    temperatura = 0;
  }

  // Saída para o gateway
  Serial.print(umidadeSolo);
  Serial.print(F(","));
  Serial.print(umidadeAr);
  Serial.print(F(","));
  Serial.print(temperatura);
  Serial.print(F(","));
  Serial.println(luminosidade);
}
