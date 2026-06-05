/*
  Warnings:

  - Made the column `dispositivo_id` on table `Plantacao` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plantacao" (
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
    CONSTRAINT "Plantacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Plantacao_dispositivo_id_fkey" FOREIGN KEY ("dispositivo_id") REFERENCES "Dispositivo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Plantacao" ("criado_em", "data_colheita", "data_inicio", "data_proximo_plantio", "descricao", "dispositivo_id", "id", "nome", "tipo", "usuario_id") SELECT "criado_em", "data_colheita", "data_inicio", "data_proximo_plantio", "descricao", "dispositivo_id", "id", "nome", "tipo", "usuario_id" FROM "Plantacao";
DROP TABLE "Plantacao";
ALTER TABLE "new_Plantacao" RENAME TO "Plantacao";
CREATE UNIQUE INDEX "Plantacao_dispositivo_id_key" ON "Plantacao"("dispositivo_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
