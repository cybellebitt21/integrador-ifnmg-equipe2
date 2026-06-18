-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_alerta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leitura_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "plantacao_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "notificacao" BOOLEAN NOT NULL DEFAULT false,
    "gerado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "alerta_leitura_id_fkey" FOREIGN KEY ("leitura_id") REFERENCES "leitura" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "alerta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "alerta_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "plantacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_alerta" ("gerado_em", "id", "leitura_id", "mensagem", "notificacao", "plantacao_id", "tipo", "usuario_id") SELECT "gerado_em", "id", "leitura_id", "mensagem", "notificacao", "plantacao_id", "tipo", "usuario_id" FROM "alerta";
DROP TABLE "alerta";
ALTER TABLE "new_alerta" RENAME TO "alerta";
CREATE TABLE "new_leitura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantacao_id" INTEGER NOT NULL,
    "data_hora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "luminosidade" REAL,
    "temperatura" REAL,
    "umidade_ar" REAL,
    "umidade_solo" REAL,
    CONSTRAINT "leitura_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "plantacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_leitura" ("data_hora", "id", "luminosidade", "plantacao_id", "temperatura", "umidade_ar", "umidade_solo") SELECT "data_hora", "id", "luminosidade", "plantacao_id", "temperatura", "umidade_ar", "umidade_solo" FROM "leitura";
DROP TABLE "leitura";
ALTER TABLE "new_leitura" RENAME TO "leitura";
CREATE TABLE "new_plantacao" (
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
    CONSTRAINT "plantacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "plantacao_dispositivo_id_fkey" FOREIGN KEY ("dispositivo_id") REFERENCES "dispositivo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_plantacao" ("criado_em", "data_colheita", "data_inicio", "data_proximo_plantio", "descricao", "dispositivo_id", "id", "nome", "tipo", "usuario_id") SELECT "criado_em", "data_colheita", "data_inicio", "data_proximo_plantio", "descricao", "dispositivo_id", "id", "nome", "tipo", "usuario_id" FROM "plantacao";
DROP TABLE "plantacao";
ALTER TABLE "new_plantacao" RENAME TO "plantacao";
CREATE UNIQUE INDEX "plantacao_dispositivo_id_key" ON "plantacao"("dispositivo_id");
CREATE TABLE "new_plantacao_sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantacao_id" INTEGER NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "limite_atencao" REAL NOT NULL,
    "limite_critico" REAL NOT NULL,
    CONSTRAINT "plantacao_sensor_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "plantacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plantacao_sensor_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_plantacao_sensor" ("id", "limite_atencao", "limite_critico", "plantacao_id", "sensor_id") SELECT "id", "limite_atencao", "limite_critico", "plantacao_id", "sensor_id" FROM "plantacao_sensor";
DROP TABLE "plantacao_sensor";
ALTER TABLE "new_plantacao_sensor" RENAME TO "plantacao_sensor";
CREATE UNIQUE INDEX "plantacao_sensor_sensor_id_key" ON "plantacao_sensor"("sensor_id");
CREATE UNIQUE INDEX "plantacao_sensor_plantacao_id_sensor_id_key" ON "plantacao_sensor"("plantacao_id", "sensor_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
