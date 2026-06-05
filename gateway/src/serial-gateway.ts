import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { env } from './env/index.js';

const caminhoPortaSerial = env.SERIAL_PORT;
const urlBackend = env.BACKEND_URL;
const taxaBaud = env.SERIAL_BAUD;

const serialPort = new SerialPort({
  path: caminhoPortaSerial,
  baudRate: taxaBaud,
});

serialPort.on('error', (erro) => {
  console.error(`Erro critico na porta serial (${caminhoPortaSerial}):`, erro.message);
  console.log('Você conectou o arduino ao USB?');
});

serialPort.on('close', () => {
  console.warn(`Alerta: A conexão física com o Arduino em ${caminhoPortaSerial} foi interrompida!`);
  console.warn('O cabo USB provavelmente foi desconectado.');
  process.exit(1);
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', async (linha) => {
  const dadosSegmentados = linha.trim().split(',');

  if (dadosSegmentados.length !== 4) {
    console.warn(`Esperado 4 colunas, recebido: ${dadosSegmentados.length}).`);
    return;
  }

  const dadosSensor = {
    umidadeSolo: parseInt(dadosSegmentados[0], 10),
    umidadeAr: parseFloat(dadosSegmentados[1]),
    temperatura: parseFloat(dadosSegmentados[2]),
    luminosidade: parseInt(dadosSegmentados[3], 10),
  };

  const dadosValidos =
    !isNaN(dadosSensor.umidadeSolo) &&
    !isNaN(dadosSensor.umidadeAr) &&
    !isNaN(dadosSensor.temperatura) &&
    !isNaN(dadosSensor.luminosidade);

  if (!dadosValidos) {
    console.warn('Dados ignorados: Conversão gerou valores não numericos (NaN).');
    return;
  }

  try {
    console.log(`Enviando dados: Solo: ${dadosSensor.umidadeSolo}%, Ar: ${dadosSensor.umidadeAr}%, Temp: ${dadosSensor.temperatura}C, Luz: ${dadosSensor.luminosidade}%`);

    const resposta = await fetch(urlBackend, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosSensor),
    });

    if (!resposta.ok) {
      const dadosErro = await resposta.json() as Error;
      console.error(`O Servidor rejeitou os dados (Status ${resposta.status}):`, dadosErro.message || 'Erro desconhecido');
    } else {
      console.log('Dados processados e salvos no banco SQLite com sucesso.');
    }

  } catch (err) {
    if (err instanceof Error)
      console.error('Erro de conexao com a API Backend:', err.message);
  }
});

console.log('Gateway iniciado com sucesso!');
console.log(`Escutando arduino em: ${caminhoPortaSerial} @ ${taxaBaud} bps`);
console.log(`Enviando JSON para: ${urlBackend}`);
