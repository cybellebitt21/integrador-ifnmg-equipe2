import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let dadosSensor = {
  temperatura: 0.0,
  umidadeAr: 0.0,
  umidadeSolo: 0,
  luminosidade: 0,
  timestamp: null
};

// Endpoint para leitura dos dados (GET)
app.get('/api/leitura-sensores', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(dadosSensor);
});

// Endpoint para atualização dos dados pelo Gateway (POST)
app.post('/api/leitura-sensores', (req, res) => {
  const { temperatura, umidadeAr, umidadeSolo, luminosidade } = req.body;

  if (temperatura !== undefined &&
    umidadeAr !== undefined &&
    umidadeSolo !== undefined &&
    luminosidade !== undefined) {
    dadosSensor = {
      temperatura,
      umidadeAr,
      umidadeSolo,
      luminosidade,
      // Força o fuso horário de Brasilia no formato ISO
      timestamp: new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T')
    };
    return res.status(200).json({
      mensagem: 'Dados atualizados com sucesso.',
      dados: dadosSensor
    });
  }

  res.status(400).json({ erro: 'Dados incompletos ou formato inválido.' });
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});
