import { env } from '../env/index.js';

export async function enviarWhatsApp(mensagem: string): Promise<void> {
  const url = `https://api.callmebot.com/whatsapp.php?phone=${env.CALLMEBOT_PHONE}&text=${encodeURIComponent(mensagem)}&apikey=${env.CALLMEBOT_APIKEY}`;
  const res = await fetch(url);
  if (!res.ok) console.error('WhatsApp falhou:', res.status, await res.text());
}

const isMain = process.argv[1]?.includes('whatsapp.service');
if (isMain) {
  enviarWhatsApp('Receba pai 🙅‍♀️')
    .then(() => console.log('OK'))
    .catch(console.error);
}
