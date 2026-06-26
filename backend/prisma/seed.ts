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

  console.log("🧹 Banco de dados e contadores AUTOINCREMENT limpos.");

  const usuario = await prisma.usuario.create({
    data: {
      nome: "Francisco de Assis",
      email: "francisco.aracuai@ifnmg.edu.br",
      senha: bcrypt.hashSync("senha_receba", 10),
      telefone: "38999998888",
    },
  });

  const sUmidadeSolo01 = await prisma.sensor.create({ data: { nome: "Higrômetro de Solo - Item 01", tipo: tipoSensor.umidade_solo, unidade: "%", status: statusSensor.Ativo } });
  const sUmidadeSolo02 = await prisma.sensor.create({ data: { nome: "Higrômetro de Solo - Item 02", tipo: tipoSensor.umidade_solo, unidade: "%", status: statusSensor.Ativo } });
  const sTemperatura01 = await prisma.sensor.create({ data: { nome: "DHT22 - Temperatura - Item 01", tipo: tipoSensor.temperatura, unidade: "°C", status: statusSensor.Ativo } });
  const sUmidadeAr01 = await prisma.sensor.create({ data: { nome: "DHT22 - Umidade Ar - Item 01", tipo: tipoSensor.umidade_ar, unidade: "%", status: statusSensor.Ativo } });
  const sLuminosidade01 = await prisma.sensor.create({ data: { nome: "LDR 5mm - Item 01", tipo: tipoSensor.luminosidade, unidade: "%", status: statusSensor.Ativo } });

  const disp01 = await prisma.dispositivo.create({ data: { nome: "Arduino Mega - Kit A", tipo: tipoDispositivo.Arduino_Mega, status: statusDispositivo.Ativo } });
  const disp02 = await prisma.dispositivo.create({ data: { nome: "Arduino Mega - Kit B", tipo: tipoDispositivo.Arduino_Mega, status: statusDispositivo.Ativo } });
  const disp03 = await prisma.dispositivo.create({ data: { nome: "Arduino Mega - Kit C", tipo: tipoDispositivo.Arduino_Mega, status: statusDispositivo.Ativo } });
  const disp04 = await prisma.dispositivo.create({ data: { nome: "ESP32 NodeMCU - Protótipo", tipo: tipoDispositivo.ESP32, status: statusDispositivo.Ativo } });

  console.log("Catálogo de sensores e estoque de dispositivos criados.");

  const plantacaoMonitorada = await prisma.plantacao.create({
    data: {
      usuario_id: usuario.id,
      dispositivo_id: disp01.id, // Vinculado obrigatoriamente ao Kit A
      nome: "Lote B - Cereja",
      tipo: "Fruticultura",
      data_inicio: new Date("2026-02-10T08:00:00Z"),
      descricao: "Área experimental de cultivo monitorada por IoT no semiárido.",
    },
  });

  await prisma.plantacaoSensor.create({
    data: {
      plantacao_id: plantacaoMonitorada.id,
      sensor_id: sUmidadeSolo01.id, // Exclusivo do Lote B
      limite_atencao: 40.0,
      limite_critico: 20.0,
    },
  });

  await prisma.plantacaoSensor.create({
    data: {
      plantacao_id: plantacaoMonitorada.id,
      sensor_id: sTemperatura01.id, // Exclusivo do Lote B
      limite_atencao: 35.0,
      limite_critico: 39.0,
    },
  });


  const segundaPlantacao = await prisma.plantacao.create({
    data: {
      usuario_id: usuario.id,
      dispositivo_id: disp02.id,
      nome: "Lote C - Feijão Caupi",
      tipo: "Subsistência",
      data_inicio: new Date("2026-05-01T07:00:00Z"),
      descricao: "Área de monitoramento paralela usando sensores alternativos.",
    },
  });

  // Vincula sensores diferentes para o Lote C (Testando a exclusividade e a distribuição)
  await prisma.plantacaoSensor.create({
    data: {
      plantacao_id: segundaPlantacao.id,
      sensor_id: sUmidadeSolo02.id, // Higrômetro 02 exclusivo do Lote C
      limite_atencao: 30.0,
      limite_critico: 15.0,
    },
  });

  await prisma.plantacaoSensor.create({
    data: {
      plantacao_id: segundaPlantacao.id,
      sensor_id: sLuminosidade01.id, // LDR exclusivo do Lote C
      limite_atencao: 50.0,
      limite_critico: 20.0,
    },
  });


  const leituraNormal = await prisma.leitura.create({
    data: {
      plantacao_id: plantacaoMonitorada.id,
      umidade_solo: 45.5,
      temperatura: 26.2,
      umidade_ar: 62.0,
      luminosidade: 70.0,
      data_hora: new Date(),
    },
  });

  const leituraCritica = await prisma.leitura.create({
    data: {
      plantacao_id: plantacaoMonitorada.id,
      umidade_solo: 42.0,
      temperatura: 40.2, // Quebrou o limite crítico de 39°C
      umidade_ar: 55.0,
      luminosidade: 85.0,
      data_hora: new Date(),
    },
  });

  await prisma.alerta.create({
    data: {
      leitura_id: leituraCritica.id,
      usuario_id: usuario.id,
      plantacao_id: plantacaoMonitorada.id,
      tipo: tipoAlerta.Critico,
      mensagem: `Alerta Crítico: Temperatura severa detectada: (${leituraCritica.temperatura}°C). Risco de quebra de estresse térmico.`,
    },
  });

  console.log("✨ Seeding finalizado com sucesso!.");
}

main()
  .catch((erro) => {
    console.error("❌Erro critico detectado durante a execucao do seed:", erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
