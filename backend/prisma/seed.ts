import prisma from "../src/lib/prisma";

async function main() {
  console.log("🌱 Iniciando o seeding do banco de dados...");

  // Limpeza
  await prisma.alerta.deleteMany();
  await prisma.leitura.deleteMany();
  await prisma.plantacaoSensor.deleteMany();
  await prisma.sensor.deleteMany();
  await prisma.plantacao.deleteMany();
  await prisma.dispositivo.deleteMany();
  await prisma.usuario.deleteMany();

  // Resetar os contadores de AUTOINCREMENT no SQLite para reatar do ID 1
  await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence;`);
  console.log("🧹 Banco de dados e contadores AUTOINCREMENT limpos.");

  // Criar Usuário Demo (Produtor Rural)
  const usuario = await prisma.usuario.create({
    data: {
      nome: "Francisco de Assis",
      email: "francisco.aracuai@ifnmg.edu.br",
      senha: "senha_criptografada_aqui", //
      telefone: "38999998888",
    },
  });

  // Catalogo de Sensores Disponiveis
  const sUmidadeSolo01 = await prisma.sensor.create({ data: { nome: "Higrômetro de Solo - Item 01", tipo: "UMIDADE_SOLO", unidade: "%", status: "ATIVO" } });
  const sUmidadeSolo02 = await prisma.sensor.create({ data: { nome: "Higrômetro de Solo - Item 02", tipo: "UMIDADE_SOLO", unidade: "%", status: "ATIVO" } });
  const sTemperatura01 = await prisma.sensor.create({ data: { nome: "DHT22 - Temperatura - Item 01", tipo: "TEMPERATURA", unidade: "°C", status: "ATIVO" } });
  const sLuminosidade01 = await prisma.sensor.create({ data: { nome: "LDR 5mm - Item 01", tipo: "LUMINOSIDADE", unidade: "%", status: "ATIVO" } });

  // Criando um sensor em manutencao para testar filtros do estoque
  await prisma.sensor.create({ data: { nome: "DHT22 - Umidade Ar - Danificado", tipo: "UMIDADE_AR", unidade: "%", status: "MANUTENCAO" } });

  // Inventário de Dispositivos (Estoque da Associação)
  // 3 Arduinos e 1 ESP32 para simular a contagem do menu do frontend
  const disp01 = await prisma.dispositivo.create({ data: { nome: "Arduino Mega - Kit A", tipo: "Arduino Mega", status: "ATIVO" } });
  const disp02 = await prisma.dispositivo.create({ data: { nome: "Arduino Mega - Kit B", tipo: "Arduino Mega", status: "ATIVO" } });
  const disp03 = await prisma.dispositivo.create({ data: { nome: "Arduino Mega - Kit C", tipo: "Arduino Mega", status: "ATIVO" } });
  const disp04 = await prisma.dispositivo.create({ data: { nome: "ESP32 NodeMCU - Protótipo", tipo: "ESP32", status: "ATIVO" } });

  // Dispositivo em manutenção para testar filtros
  await prisma.dispositivo.create({ data: { nome: "Arduino Nano - Danificado", tipo: "Arduino Nano", status: "MANUTENCAO" } });

  console.log("📦 Catálogo de sensores e estoque de dispositivos criados.");

  // FLUXO A: Plantação com dispositivo instalado e sensores monitorando
  const plantacaoMonitorada = await prisma.plantacao.create({
    data: {
      usuario_id: usuario.id,
      dispositivo_id: disp01.id, // Vinculado ao primeiro Arduino Mega
      nome: "Lote B - Cereja",
      tipo: "Fruticultura",
      data_inicio: new Date("2026-02-10T08:00:00Z"),
      descricao: "Área experimental de cultivo monitorada por IoT no semiárido.",
    },
  });

  // Vincula os sensores físicos à Plantação Monitorada
  await prisma.plantacaoSensor.create({
    data: {
      plantacao_id: plantacaoMonitorada.id,
      sensor_id: sUmidadeSolo01.id, // Vincula o item fisico unico 01
      limite_atencao: 40.0,
      limite_critico: 20.0,
    },
  });

  await prisma.plantacaoSensor.create({
    data: {
      plantacao_id: plantacaoMonitorada.id,
      sensor_id: sTemperatura01.id, // Vincula o item fisico unico 01
      limite_atencao: 35.0,
      limite_critico: 39.0,
    },
  });

  // FLUXO B: Plantação sem dispositivo (Apenas o planejamento no Frontend)
  await prisma.plantacao.create({
    data: {
      usuario_id: usuario.id,
      dispositivo_id: null, // Livre, sem dispositivo ainda
      nome: "Lote C - Feijão Caupi",
      tipo: "Subsistência",
      data_inicio: new Date("2026-05-01T07:00:00Z"),
      descricao: "Planejamento de plantio para o próximo ciclo de chuvas.",
    },
  });

  // Cria uma leitura normal contendo todas as variaveis coletadas pelo Arduino simultaneamente
  const leituraNormal = await prisma.leitura.create({
    data: {
      plantacao_id: plantacaoMonitorada.id,
      umidade_solo: 45.5, // Acima do limite de atencao, esta saudavel
      temperatura: 26.2, // Temperatura aceitavel
      luminosidade: 70.0,
      data_hora: new Date(),
    },
  });

  // Cria uma leitura critica para simular o comportamento de estresse termico
  const leituraCritica = await prisma.leitura.create({
    data: {
      plantacao_id: plantacaoMonitorada.id,
      umidade_solo: 42.0,
      temperatura: 40.2, // Quebrou o limite critico de 39C do Vale do Jequitinhonha
      luminosidade: 85.0,
      data_hora: new Date(),
    },
  });

  // Geração automática do Alerta decorrente da leitura crítica capturada na tabela consolidada
  await prisma.alerta.create({
    data: {
      leitura_id: leituraCritica.id,
      usuario_id: usuario.id,
      plantacao_id: plantacaoMonitorada.id,
      tipo: "CRITICO",
      mensagem: `Alerta Crítico: Temperatura severa detectada no Lote B (${leituraCritica.temperatura}°C). Risco de quebra de estresse térmico.`,
    },
  });

  console.log("✨ Seeding finalizado com sucesso! Dados prontos para os testes.");
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
