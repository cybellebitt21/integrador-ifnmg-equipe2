import prisma from "../src/lib/prisma.js";

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
  await prisma.plantacaoSensor.deleteMany();
  await prisma.leitura.deleteMany();
  await prisma.sensor.deleteMany();
  await prisma.plantacao.deleteMany();
  await prisma.dispositivo.deleteMany();
  await prisma.usuario.deleteMany();

  await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence;`);
  console.log("🧹 Banco de dados limpo com sucesso.");

  console.log("Criando usuarios para teste...");
  const usuarioA = await prisma.usuario.create({
    data: {
      nome: "Carlos Alberto",
      email: "carlos.teste@ifnmg.edu.br",
      senha: "hash_seguro_aqui",
      telefone: "38999991111"
    }
  });
  const usuarioB = await prisma.usuario.create({
    data: {
      nome: "Maria Eduarda",
      email: "maria.teste@ifnmg.edu.br",
      senha: "hash_seguro_aqui",
      telefone: "38999992222"
    }
  });

  console.log("Cadastrando os Dispositivos de Borda (Edge Devices)...");
  const dispositivoAlfa = await prisma.dispositivo.create({
    data: { nome: "Kit Arduino Mega 2560 - Lote A", tipo: "Arduino Mega", status: "ATIVO" }
  });
  const dispositivoBeta = await prisma.dispositivo.create({
    data: { nome: "Kit ESP32 NodeMCU - Lote B", tipo: "ESP32", status: "ATIVO" }
  });

  console.log("Mapeando plantações)...");
  const plantacaoAlfa = await prisma.plantacao.create({
    data: {
      usuario_id: usuarioA.id,
      dispositivo_id: dispositivoAlfa.id,
      nome: "Cultura Massiva de Feijao - Lote A",
      tipo: "Graos",
      data_inicio: new Date("2026-01-01T00:00:00Z"),
      descricao: "Area de monitoramento intensivo para agricultura familiar no Vale do Jequitinhonha."
    }
  });
  const plantacaoBeta = await prisma.plantacao.create({
    data: {
      usuario_id: usuarioB.id,
      dispositivo_id: dispositivoBeta.id,
      nome: "Horta Comunitaria - Lote B",
      tipo: "Olericultura",
      data_inicio: new Date("2026-01-01T00:00:00Z"),
      descricao: "Cultivo de hortalicas com foco em economia hidrica."
    }
  });

  console.log("Cadastrando e vinculando o Catalogo de Sensores Fisicos...");
  const sensorClimaA = await prisma.sensor.create({
    data: { nome: "Sensor de Clima DHT22", tipo: "TEMPERATURA", unidade: "degC", status: "ATIVO" }
  });
  const sensorSoloA = await prisma.sensor.create({
    data: { nome: "Higrometro de Solo Capacitivo", tipo: "UMIDADE_SOLO", unidade: "%", status: "ATIVO" }
  });

  await prisma.plantacaoSensor.createMany({
    data: [
      { plantacao_id: plantacaoAlfa.id, sensor_id: sensorClimaA.id, limite_atencao: 35.0, limite_critico: 39.0, ativo: true },
      { plantacao_id: plantacaoAlfa.id, sensor_id: sensorSoloA.id, limite_atencao: 40.0, limite_critico: 25.0, ativo: true }
    ]
  });

  const idsPlantacoes = [plantacaoAlfa.id, plantacaoBeta.id];
  const dataInicioSimulacao = new Date();
  dataInicioSimulacao.setDate(dataInicioSimulacao.getDate() - DIAS_SIMULADOS);

  console.log("\nMetricas de Carga Calculadas:");
  console.log(`- Registros por plantação: ${TOTAL_CICLOS}`);
  console.log(`- Carga consolidada total na tabela Leitura: ${TOTAL_CICLOS * idsPlantacoes.length} registros.`);

  for (const plantacaoId of idsPlantacoes) {
    console.log(`\nInjetando dados em lote para Plantacao ID: ${plantacaoId}...`);
    let blocoDeDados: any[] = [];

    for (let i = 0; i < TOTAL_CICLOS; i++) {
      const dataHoraLeitura = new Date(dataInicioSimulacao.getTime() + i * INTERVALO_MINUTOS * 60 * 1000);

      const luminosidade = gerarValorMetricoAleatorio(10, 100);
      const temperatura = gerarValorMetricoAleatorio(16, 41);
      const umidadeAr = gerarValorMetricoAleatorio(15, 80);
      const umidadeSolo = gerarValorMetricoAleatorio(12, 88);

      blocoDeDados.push({
        plantacao_id: plantacaoId,
        temperatura,
        umidade_ar: umidadeAr,
        umidade_solo: umidadeSolo,
        luminosidade,
        data_hora: dataHoraLeitura,
      });

      if (blocoDeDados.length === TAMANHO_BLOCO || i === TOTAL_CICLOS - 1) {
        await prisma.leitura.createMany({
          data: blocoDeDados,
        });
        console.log(`Bloco de ${blocoDeDados.length} leituras inserido no banco.`);
        blocoDeDados = [];
      }
    }
  }

  console.log("✨ Seeding finalizado com sucesso.");
}

main()
  .catch((erro) => {
    console.error("❌Erro critico detectado durante a execucao do seed:", erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
