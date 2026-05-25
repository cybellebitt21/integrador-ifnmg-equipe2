-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Plantacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_colheita" DATETIME,
    "data_proximo_plantio" DATETIME,
    "descricao" TEXT,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Plantacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "limite_atencao" REAL NOT NULL,
    "limite_critico" REAL NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PlantacaoSensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantacao_id" INTEGER NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "PlantacaoSensor_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "Plantacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlantacaoSensor_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Leitura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantacao_sensor_id" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "data_hora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Leitura_plantacao_sensor_id_fkey" FOREIGN KEY ("plantacao_sensor_id") REFERENCES "PlantacaoSensor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alerta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leitura_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "notificacao" BOOLEAN NOT NULL DEFAULT false,
    "gerado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Alerta_leitura_id_fkey" FOREIGN KEY ("leitura_id") REFERENCES "Leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Alerta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PlantacaoSensor_plantacao_id_sensor_id_key" ON "PlantacaoSensor"("plantacao_id", "sensor_id");
