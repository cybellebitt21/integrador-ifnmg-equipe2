import prisma from "./src/lib/prisma";

async function main() {
  console.log("🌱 Iniciando o seeding do banco de dados...");

  // 1. Limpar o banco de dados antes do seeding
  await prisma.alerta.deleteMany();
  await prisma.leitura.deleteMany();
  await prisma.plantacaoSensor.deleteMany();
  await prisma.sensor.deleteMany();
  await prisma.plantacao.deleteMany();
  await prisma.usuario.deleteMany();

  console.log("🧹 Banco de dados limpo com sucesso.");

  // 2. Criar um Usuário de Teste (Produtor Rural)
  const usuario = await prisma.usuario.create({
    data: {
      nome: "Produtor Demo AgroSensor",
      email: "demo@agrosensor.com.br",
      senha: "senha_criptografada",
      telefone: "33999676767",
    },
  });

  console.log(`👤 Usuário criado: ${usuario.email}`);

  // 3. Criar Plantações para este Usuário
  const plantacaoAlface = await prisma.plantacao.create({
    data: {
      usuario_id: usuario.id,
      nome: "Estufa 01 - Alface Hidropônica",
      tipo: "Hortaliça",
      data_inicio: new Date("2026-05-01"),
      descricao: "Área de monitoramento crítico de umidade e pH.",
    },
  });

  const plantacaoTomate = await prisma.plantacao.create({
    data: {
      usuario_id: usuario.id,
      nome: "Lote Norte - Tomate Cereja",
      tipo: "Frutífera",
      data_inicio: new Date("2026-05-10"),
    },
  });

  console.log("🥬 Plantações de teste criadas.");

  // 4. Criar os Modelos de Sensores de IoT
  const sensorUmidadeSolo = await prisma.sensor.create({
    data: {
      nome: "Sensor de Umidade do Solo (Higrômetro)",
      tipo: "UmidadeSolo",
      unidade: "%",
    },
  });

  const sensorUmidadeAr = await prisma.sensor.create({
    data: {
      nome: "Sensor de Umidade do Ar (DHT22)",
      tipo: "UmidadeAr",
      unidade: "%",
    }
  })

  const sensorTemperatura = await prisma.sensor.create({
    data: {
      nome: "Sensor de Temperatura do Ar (DHT22)",
      tipo: "TemperaturaAr",
      unidade: "ºC",
    },
  });

  const sensorLuminosidade = await prisma.sensor.create({
    data: {
      nome: "Sensor de Luminosidade (LDR)",
      tipo: "Luminosidade",
      unidade: "%",
    },
  });

  console.log("🤖 Catálogo de Sensores registrado.");

  // 5. Vincular os Sensores às Plantações (Muitos para Muitos)
  const vinculoAlfaceUmidadeSolo = await prisma.plantacaoSensor.create({
    data: {
      plantacao_id: plantacaoAlface.id,
      sensor_id: sensorUmidadeSolo.id,
      ativo: true,
      limite_atencao: 40.0,
      limite_critico: 20.0,
    },
  });

  console.log("💯 Sensores vinculados às respectivas plantações.");

  // 6. Gerar uma Leitura Fictícia (Simulando o Arduino enviando um dado crítico)
  const leituraCritica = await prisma.leitura.create({
    data: {
      plantacao_sensor_id: vinculoAlfaceUmidadeSolo.id,
      valor: 15.5, // Valor crítico (Abaixo dos 20% configurados no sensor)
    },
  });

  // 7. Gerar o Alerta correspondente à leitura crítica
  await prisma.alerta.create({
    data: {
      leitura_id: leituraCritica.id,
      usuario_id: usuario.id,
      tipo: "CRÍTICO",
      mensagem: `Atenção! A umidade na '${plantacaoAlface.nome}' caiu para ${leituraCritica.valor}%. Risco de perda de manejo!`,
      notificacao: false, // Começa como não lido/não visualizado
    },
  });

  console.log("✅ Leituras e Alertas de simulação gerados com sucesso!");
  console.log("✨ Banco de dados semeado com sucesso!.");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
