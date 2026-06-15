#include "DHT.h"

#define SOLO_SENSOR A0
#define LDR_SENSOR A1
#define DHTPIN 3
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(SOLO_SENSOR, INPUT);
  pinMode(LDR_SENSOR, INPUT);
}

void loop() {
  delay(120000);

  unsigned int leitura_ldr = analogRead(LDR_SENSOR);  // Leitura bruta
  unsigned int luminosidade = map(leitura_ldr, 0, 1023, 0, 100);

  float umidade_ar = dht.readHumidity();
  float temperatura = dht.readTemperature();

  unsigned int leitura_solo = analogRead(SOLO_SENSOR);
  unsigned int umidade_solo = map(leitura_solo, 1023, 0, 0, 100);

  if (isnan(umidade_ar) || isnan(temperatura)) {
    umidade_ar = 0;
    temperatura = 0;
  }

  // Saída para o gateway
  Serial.print(umidade_solo);
  Serial.print(F(","));
  Serial.print(umidade_ar);
  Serial.print(F(","));
  Serial.print(temperatura);
  Serial.print(F(","));
  Serial.println(luminosidade);
}
