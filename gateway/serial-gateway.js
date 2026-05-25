import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const caminhoPortaSerial = '/dev/ttyUSB0';
const urlBackend = 'http://localhost:3000/api/leitura-sensores';

// Inicializa a conexão com a porta serial configurando o caminho e a taxa de transmissão
const serialPort = new SerialPort({
  path: caminhoPortaSerial,
  baudRate: 115200,
});

// Cria um analisador de linha que divide o fluxo de dados sempre que encontra uma quebra de linha
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Executa a função assíncrona sempre que uma linha completa é recebida da porta serial
parser.on('data', async (linha) => {
  const dadosSegmentados = linha.trim().split(',');

  if (dadosSegmentados.length === 4) { // Verifica se a divisão feita por split gerou exatamente 4 elementos
    const dadosSensor = {
      umidadeSolo: parseInt(dadosSegmentados[0], 10),
      umidadeAr: parseFloat(dadosSegmentados[1]),
      temperatura: parseFloat(dadosSegmentados[2]),
      luminosidade: parseInt(dadosSegmentados[3], 10),
    };

    // Validação basica para evitar  NaN no payload JSON
    if (!isNaN(dadosSensor.umidadeSolo) &&
      !isNaN(dadosSensor.umidadeAr) &&
      !isNaN(dadosSensor.temperatura) &&
      !isNaN(dadosSensor.luminosidade)) {

      // Para log independente do server.js
      // console.log('Payload gerado para envio:', dadosSensor);
      // ou nc -l 3000 no terminal

      try {
        await fetch(urlBackend, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosSensor),
        });
      } catch (err) {
        console.error('Erro de conexão:', err.message);
      }
    }
  }
});

console.log(`Gateway iniciado. Enviando para ${urlBackend} usando a porta ${caminhoPortaSerial}`);
