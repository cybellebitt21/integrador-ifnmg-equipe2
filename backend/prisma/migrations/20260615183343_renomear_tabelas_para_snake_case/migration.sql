/*
  Warnings:

  - You are about to drop the `Alerta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dispositivo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Leitura` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plantacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlantacaoSensor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sensor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Alerta";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Dispositivo";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Leitura";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Plantacao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PlantacaoSensor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Sensor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "dispositivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Inativo',
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "plantacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "dispositivo_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_colheita" DATETIME,
    "data_proximo_plantio" DATETIME,
    "descricao" TEXT,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "plantacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plantacao_dispositivo_id_fkey" FOREIGN KEY ("dispositivo_id") REFERENCES "dispositivo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Inativo',
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "plantacao_sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantacao_id" INTEGER NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "limite_atencao" REAL NOT NULL,
    "limite_critico" REAL NOT NULL,
    CONSTRAINT "plantacao_sensor_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "plantacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plantacao_sensor_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "leitura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantacao_id" INTEGER NOT NULL,
    "data_hora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "luminosidade" REAL,
    "temperatura" REAL,
    "umidade_ar" REAL,
    "umidade_solo" REAL,
    CONSTRAINT "leitura_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "plantacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "alerta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leitura_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "plantacao_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "notificacao" BOOLEAN NOT NULL DEFAULT false,
    "gerado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "alerta_leitura_id_fkey" FOREIGN KEY ("leitura_id") REFERENCES "leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "alerta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "alerta_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "plantacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "plantacao_dispositivo_id_key" ON "plantacao"("dispositivo_id");

-- CreateIndex
CREATE UNIQUE INDEX "plantacao_sensor_sensor_id_key" ON "plantacao_sensor"("sensor_id");

-- CreateIndex
CREATE UNIQUE INDEX "plantacao_sensor_plantacao_id_sensor_id_key" ON "plantacao_sensor"("plantacao_id", "sensor_id");
