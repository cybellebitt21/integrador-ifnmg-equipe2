/*
  Warnings:

  - You are about to drop the column `plantacao_sensor_id` on the `Leitura` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Leitura` table. All the data in the column will be lost.
  - Added the required column `plantacao_id` to the `Alerta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plantacao_id` to the `Leitura` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alerta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leitura_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "plantacao_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "notificacao" BOOLEAN NOT NULL DEFAULT false,
    "gerado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Alerta_leitura_id_fkey" FOREIGN KEY ("leitura_id") REFERENCES "Leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Alerta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Alerta_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "Plantacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Alerta" ("gerado_em", "id", "leitura_id", "mensagem", "notificacao", "tipo", "usuario_id") SELECT "gerado_em", "id", "leitura_id", "mensagem", "notificacao", "tipo", "usuario_id" FROM "Alerta";
DROP TABLE "Alerta";
ALTER TABLE "new_Alerta" RENAME TO "Alerta";
CREATE TABLE "new_Leitura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantacao_id" INTEGER NOT NULL,
    "data_hora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "luminosidade" REAL,
    "temperatura" REAL,
    "umidade_ar" REAL,
    "umidade_solo" REAL,
    CONSTRAINT "Leitura_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "Plantacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Leitura" ("data_hora", "id") SELECT "data_hora", "id" FROM "Leitura";
DROP TABLE "Leitura";
ALTER TABLE "new_Leitura" RENAME TO "Leitura";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
