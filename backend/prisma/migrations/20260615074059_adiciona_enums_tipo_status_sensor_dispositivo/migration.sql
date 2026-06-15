-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dispositivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Inativo',
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Dispositivo" ("criado_em", "id", "nome", "status", "tipo") SELECT "criado_em", "id", "nome", "status", "tipo" FROM "Dispositivo";
DROP TABLE "Dispositivo";
ALTER TABLE "new_Dispositivo" RENAME TO "Dispositivo";
CREATE TABLE "new_Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Inativo',
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Sensor" ("criado_em", "id", "nome", "status", "tipo", "unidade") SELECT "criado_em", "id", "nome", "status", "tipo", "unidade" FROM "Sensor";
DROP TABLE "Sensor";
ALTER TABLE "new_Sensor" RENAME TO "Sensor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
