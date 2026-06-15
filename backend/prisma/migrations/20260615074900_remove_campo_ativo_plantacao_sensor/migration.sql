/*
  Warnings:

  - You are about to drop the column `ativo` on the `PlantacaoSensor` table. This field is no longer needed since sensor/device status is now managed via Sensor.status and Dispositivo.status enums.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlantacaoSensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantacao_id" INTEGER NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "limite_atencao" REAL NOT NULL,
    "limite_critico" REAL NOT NULL,
    CONSTRAINT "PlantacaoSensor_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "Plantacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlantacaoSensor_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlantacaoSensor" ("id", "plantacao_id", "sensor_id", "limite_atencao", "limite_critico")
SELECT "id", "plantacao_id", "sensor_id", "limite_atencao", "limite_critico"
FROM "PlantacaoSensor";
DROP TABLE "PlantacaoSensor";
ALTER TABLE "new_PlantacaoSensor" RENAME TO "PlantacaoSensor";
CREATE UNIQUE INDEX "PlantacaoSensor_plantacao_id_sensor_id_key" ON "PlantacaoSensor"("plantacao_id", "sensor_id");
CREATE UNIQUE INDEX "PlantacaoSensor_sensor_id_key" ON "PlantacaoSensor"("sensor_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
