import prisma from "../src/lib/prisma";

// Esse default insere 64.800 linhas por plantação (129.600 linhas)
const INTERVALO_MINUTOS = 2; // simula o delay(120000) do arduino, não precisa alterar
const DIAS_SIMULADOS = 90; // 3 meses, pode alterar para outro valor menor ou maior
const TOTAL_CICLOS = (DIAS_SIMULADOS * 24 * 60) / INTERVALO_MINUTOS; // Não altere!
const TAMANHO_BLOCO = 5000; // Mantenha esse valor para não estourar limite do SQL (SQLITE_MAX_VARIABLE_NUMBER)!
// Cada query envia 5 campos para a tabela leitura

// Função auxiliar para gerar números decimais aleatórios dentro de uma faixa
function gerarValorAleatorio(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

async function main() {
  console.log("🚀 Iniciando Seed de Carga com Math.random...");

  // Delete as tabelas filhas que apontam para outras tabelas
  await prisma.alerta.deleteMany();
  await prisma.plantacaoSensor.deleteMany();
  await prisma.leitura.deleteMany();

  // Delete as tabelas intermediárias e pais
  await prisma.sensor.deleteMany();
  await prisma.plantacao.deleteMany();
  await prisma.dispositivo.deleteMany();
  await prisma.usuario.deleteMany();

  await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence;`);
  console.log("Banco de dados limpo. Iniciando inserções...");

  // 1. Criar múltiplos usuários
  console.log("Criando usuários de teste...");
  const user1 = await prisma.usuario.create({
    data: { nome: "Carlos Alberto", email: "carlos.teste@ifnmg.edu.br", senha: "hash", telefone: "38999991111" }
  });
  const user2 = await prisma.usuario.create({
    data: { nome: "Maria Eduarda", email: "maria.teste@ifnmg.edu.br", senha: "hash", telefone: "38999992222" }
  });

  // 2. Criar Dispositivos adicionais
  const dispA = await prisma.dispositivo.create({ data: { nome: "Nó Experimental Alfa", tipo: "ESP32", status: "ATIVO" } });
  const dispB = await prisma.dispositivo.create({ data: { nome: "Nó Experimental Beta", tipo: "Arduino Mega", status: "ATIVO" } });

  // 3. Criar Plantações que receberão a carga massiva
  console.log("Criando plantações para stress-test...");
  const plantacaoA = await prisma.plantacao.create({
    data: { usuario_id: user1.id, dispositivo_id: dispA.id, nome: "Cultura Massiva A", tipo: "Grãos", data_inicio: new Date("2026-01-01T00:00:00Z") }
  });
  const plantacaoB = await prisma.plantacao.create({
    data: { usuario_id: user2.id, dispositivo_id: dispB.id, nome: "Cultura Massiva B", tipo: "Olericultura", data_inicio: new Date("2026-01-01T00:00:00Z") }
  });

  const idsPlantacoes = [plantacaoA.id, plantacaoB.id];

  const dataInicioSimulacao = new Date();
  dataInicioSimulacao.setDate(dataInicioSimulacao.getDate() - DIAS_SIMULADOS);

  console.log(`Total de registros calculados por plantação: ${TOTAL_CICLOS}`);
  console.log(`Total consolidado na tabela Leitura: ${TOTAL_CICLOS * idsPlantacoes.length} linhas.`);

  // 4. Geração de massa de dados estruturada em blocos
  for (const plantacaoId of idsPlantacoes) {
    console.log(`\n Gerando dados para a Plantação ID: ${plantacaoId}...`);
    let blocoDeDados: any[] = [];

    for (let i = 0; i < TOTAL_CICLOS; i++) {
      const dataHoraLeitura = new Date(dataInicioSimulacao.getTime() + i * INTERVALO_MINUTOS * 60 * 1000);

      // Valores aleatórios diretos dentro de faixas comuns para cada sensor
      const luminosidade = gerarValorAleatorio(0, 100);    // 0% a 100%
      const temperatura = gerarValorAleatorio(15, 42);    // 15°C a 42°C
      const umidadeSolo = gerarValorAleatorio(10, 90);    // 10% a 90%

      blocoDeDados.push({
        plantacao_id: plantacaoId,
        temperatura,
        umidade_solo: umidadeSolo,
        luminosidade,
        data_hora: dataHoraLeitura,
      });

      if (blocoDeDados.length === TAMANHO_BLOCO || i === TOTAL_CICLOS - 1) {
        await prisma.leitura.createMany({
          data: blocoDeDados,
        });
        process.stdout.write(`• Inseridas ${blocoDeDados.length} linhas...\n`);
        blocoDeDados = [];
      }
    }
  }

  console.log("\n Seed de performance finalizado!");
}

main()
  .catch((erro) => {
    console.error("❌ Erro durante o seed:", erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
