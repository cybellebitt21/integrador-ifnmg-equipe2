import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma.js";
import { tipoSensor, statusSensor, tipoDispositivo, statusDispositivo } from "@prisma/client";

const INTERVALO_MINUTOS = 2;
const DIAS_SIMULADOS = 90;
const TOTAL_CICLOS = (DIAS_SIMULADOS * 24 * 60) / INTERVALO_MINUTOS;
const TAMANHO_BLOCO = 5000;

function gerarValorMetricoAleatorio(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

async function main() {
  console.log("🌱 Iniciando seeding de performance...");

  await prisma.alerta.deleteMany();
  await prisma.leitura.deleteMany();
  await prisma.plantacaoSensor.deleteMany();
  await prisma.plantacao.deleteMany();
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
    data: { nome: "HL-69 - Sensor de Umidade do solo", tipo: tipoSensor.umidade_solo, unidade: "%", status: statusSensor.Ativo },
  });

  const sAr = await prisma.sensor.create({
    data: { nome: "DHT22 - Sensor de Umidade do Ar", tipo: tipoSensor.umidade_ar, unidade: "%", status: statusSensor.Ativo },
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

  await prisma.plantacaoSensor.createMany({
    data: [
      { plantacao_id: plantacao1.id, sensor_id: sLuz.id, limite_atencao: 25.0, limite_critico: 10.0 },
      { plantacao_id: plantacao1.id, sensor_id: sSolo.id, limite_atencao: 40.0, limite_critico: 20.0 },
    ],
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

  await prisma.plantacaoSensor.createMany({
    data: [
      { plantacao_id: plantacao2.id, sensor_id: sTemp.id, limite_atencao: 30.0, limite_critico: 35.0 },
      { plantacao_id: plantacao2.id, sensor_id: sAr.id, limite_atencao: 60.0, limite_critico: 80.0 },
    ],
  });

  const idsPlantacoes = [plantacao1.id, plantacao2.id];
  const dataInicioSimulacao = new Date();
  dataInicioSimulacao.setDate(dataInicioSimulacao.getDate() - DIAS_SIMULADOS);

  console.log("\nMétricas de Carga Calculadas:");
  console.log(`- Registros por plantação: ${TOTAL_CICLOS}`);
  console.log(`- Carga consolidada total na tabela Leitura: ${TOTAL_CICLOS * idsPlantacoes.length} registros.`);

  for (const plantacaoId of idsPlantacoes) {
    console.log(`\nInjetando dados em lote para Plantacao ID: ${plantacaoId}...`);
    const blocoDeDados: any[] = [];

    for (let i = 0; i < TOTAL_CICLOS; i++) {
      const dataHoraLeitura = new Date(dataInicioSimulacao.getTime() + i * INTERVALO_MINUTOS * 60 * 1000);

      const leitura: any = { plantacao_id: plantacaoId, data_hora: dataHoraLeitura };
      if (plantacaoId === plantacao1.id) {
        leitura.luminosidade = gerarValorMetricoAleatorio(10, 100);
        leitura.umidade_solo = gerarValorMetricoAleatorio(12, 88);
      } else {
        leitura.temperatura = gerarValorMetricoAleatorio(16, 41);
        leitura.umidade_ar = gerarValorMetricoAleatorio(15, 80);
      }
      blocoDeDados.push(leitura);

      if (blocoDeDados.length === TAMANHO_BLOCO || i === TOTAL_CICLOS - 1) {
        await prisma.leitura.createMany({ data: blocoDeDados });
        console.log(`Bloco de ${blocoDeDados.length} leituras inserido.`);
        blocoDeDados.length = 0;
      }
    }
  }

  console.log("✨ Seeding de performance finalizado com sucesso.");
}

main()
  .catch((erro) => {
    console.error("❌ Erro crítico durante o seed:", erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
