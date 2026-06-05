import express from 'express';
import routes from './routes/index.route.js'
import { env } from './env/index.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log('API Rodando com sucesso!')
  console.log(`localhost: http://localhost:${env.PORT}`);
})
