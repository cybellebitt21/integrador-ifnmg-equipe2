import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma.js";
import { tipoSensor, statusSensor, tipoDispositivo, statusDispositivo, tipoAlerta } from "@prisma/client";

async function main() {
  console.log("🌱 Iniciando o seeding do banco de dados...");

  await prisma.alerta.deleteMany();
  await prisma.leitura.deleteMany();
  await prisma.plantacaoSensor.deleteMany();

  await prisma.usuario.deleteMany();
  await prisma.dispositivo.deleteMany();
  await prisma.sensor.deleteMany();

  console.log("🧹 Banco de dados limpo.");

  const user1 = await prisma.usuario.create({
    data: {
      nome: "Carolaine Gamer",
      email: "carolaine@agro.po",
      senha: bcrypt.hashSync("senhaSuperSegura123", 10),
      telefone: "3395785902",
    },
  });

  const user2 = await prisma.usuario.create({
    data: {
      nome: "Cybelle Gamer",
      email: "cybelle@agro.tester",
      senha: bcrypt.hashSync("senhaNadaSegura321", 10),
      telefone: "3399039177",
    },
  });

  const sTemp = await prisma.sensor.create({
    data: { nome: "DHT22 - Sensor de Temperatura", tipo: tipoSensor.temperatura, unidade: "°C", status: statusSensor.Ativo },
  });

  const sSolo = await prisma.sensor.create({
    data: { nome: "HL-69 - Sensor de Umidade do solo", tipo: tipoSensor.umidade_solo, unidade: "%", status: statusSensor.Inativo },
  });

  const sAr = await prisma.sensor.create({
    data: { nome: "DHT22 - Sensor de Umidade do Ar", tipo: tipoSensor.umidade_ar, unidade: "%", status: statusSensor.Inativo },
  });

  const sLuz = await prisma.sensor.create({
    data: { nome: "LDR 8MM - Sensor de luz", tipo: tipoSensor.luminosidade, unidade: "%", status: statusSensor.Ativo },
  });

  const disp01 = await prisma.dispositivo.create({
    data: { nome: "Arduino Mega 2560", tipo: tipoDispositivo.Arduino_Mega, status: statusDispositivo.Ativo },
  });

  const disp02 = await prisma.dispositivo.create({
    data: { nome: "Arduino Uno R3", tipo: tipoDispositivo.Arduino_Uno, status: statusDispositivo.Ativo },
  });

  console.log("Catálogo de sensores e dispositivos criados.");

  const plantacao1 = await prisma.plantacao.create({
    data: {
      usuario_id: user1.id,
      dispositivo_id: disp01.id,
      nome: "Lote B - Weed",
      tipo: "Herbácea",
      data_inicio: new Date("2026-06-01T10:00:00Z"),
      descricao: "Maconha da boa",
    },
  });

  await prisma.plantacaoSensor.create({
    data: {
      plantacao_id: plantacao1.id,
      sensor_id: sLuz.id,
      limite_atencao: 25.0,
      limite_critico: 10.0,
    },
  });

  const plantacao2 = await prisma.plantacao.create({
    data: {
      usuario_id: user2.id,
      dispositivo_id: disp02.id,
      nome: "Lote A - Cereja",
      tipo: "Fruticultura",
      data_inicio: new Date("2026-05-15T08:00:00Z"),
      descricao: "Área experimental de cultivo monitorada",
    },
  });

  await prisma.plantacaoSensor.create({
    data: {
      plantacao_id: plantacao2.id,
      sensor_id: sTemp.id,
      limite_atencao: 30.0,
      limite_critico: 35.0,
    },
  });

  const leitura1 = await prisma.leitura.create({
    data: {
      plantacao_id: plantacao1.id,
      luminosidade: 55.0,
      data_hora: new Date(),
    },
  });

  const leitura2 = await prisma.leitura.create({
    data: {
      plantacao_id: plantacao2.id,
      temperatura: 28.0,
      data_hora: new Date(),
    },
  });

  const leituraCritica = await prisma.leitura.create({
    data: {
      plantacao_id: plantacao2.id,
      temperatura: 36.5,
      data_hora: new Date(),
    },
  });

  await prisma.alerta.create({
    data: {
      leitura_id: leituraCritica.id,
      usuario_id: user2.id,
      plantacao_id: plantacao2.id,
      tipo: tipoAlerta.Critico,
      mensagem: "Alerta Crítico: Temperatura severa detectada: (36.5°C). Risco de quebra de estresse térmico.",
    },
  });

  console.log("✨ Seeding finalizado com sucesso.");
}

main()
  .catch((erro) => {
    console.error("❌ Erro crítico durante o seed:", erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
