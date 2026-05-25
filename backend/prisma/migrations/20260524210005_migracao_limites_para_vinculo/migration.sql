/*
  Warnings:

  - You are about to drop the column `limite_atencao` on the `Sensor` table. All the data in the column will be lost.
  - You are about to drop the column `limite_critico` on the `Sensor` table. All the data in the column will be lost.
  - Added the required column `limite_atencao` to the `PlantacaoSensor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limite_critico` to the `PlantacaoSensor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlantacaoSensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantacao_id" INTEGER NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "limite_atencao" REAL NOT NULL,
    "limite_critico" REAL NOT NULL,
    CONSTRAINT "PlantacaoSensor_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "Plantacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlantacaoSensor_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlantacaoSensor" ("ativo", "id", "plantacao_id", "sensor_id") SELECT "ativo", "id", "plantacao_id", "sensor_id" FROM "PlantacaoSensor";
DROP TABLE "PlantacaoSensor";
ALTER TABLE "new_PlantacaoSensor" RENAME TO "PlantacaoSensor";
CREATE UNIQUE INDEX "PlantacaoSensor_plantacao_id_sensor_id_key" ON "PlantacaoSensor"("plantacao_id", "sensor_id");
CREATE TABLE "new_Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Sensor" ("criado_em", "id", "nome", "tipo", "unidade") SELECT "criado_em", "id", "nome", "tipo", "unidade" FROM "Sensor";
DROP TABLE "Sensor";
ALTER TABLE "new_Sensor" RENAME TO "Sensor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
