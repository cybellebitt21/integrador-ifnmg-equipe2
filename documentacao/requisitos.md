# Requisitos do Sistema — AgroSensor

## Objetivo

O AgroSensor é um sistema de monitoramento climático voltado para agricultura familiar no Vale do Jequitinhonha. O sistema utiliza sensores conectados ao Arduino Mega 2560 para coletar dados ambientais e disponibilizá-los em dashboards para apoio à tomada de decisão agrícola.

---
## Requisitos Funcionais

| Nº | Requisito Funcional |
|---|---|
| RF01 | O usuário deve poder se cadastrar no sistema informando nome, e-mail, senha, CPF e telefone |
| RF02 | O usuário deve poder fazer login com e-mail e senha |
| RF03 | O usuário deve poder fazer logout |
| RF04 | O usuário deve poder editar e excluir seu perfil |
| RF05 | O usuário deve poder cadastrar um ou mais tipos de plantação |
| RF06 | O usuário deve poder editar e excluir suas plantações |
| RF07 | O usuário deve poder escolher quais sensores serão associados a cada plantação |
| RF08 | O usuário deve poder definir os limites de atenção e crítico de cada sensor por plantação |
| RF09 | O sistema deve exibir os dados dos sensores em tempo real no dashboard |
| RF10 | O sistema deve classificar cada leitura como "ideal", "atenção" ou "crítico" automaticamente com base nos limites definidos pelo usuário |
| RF11 | O sistema deve gerar um alerta quando uma leitura atingir o limite de atenção ou crítico |
| RF12 | O sistema deve notificar o usuário via WhatsApp quando um alerta crítico for gerado; caso o WhatsApp não esteja disponível, a notificação deve ser enviada via notificação push no dispositivo do usuário |
| RF13 | O usuário deve visualizar gráficos diários, semanais e mensais dos dados coletados por sensor |
| RF14 | O usuário deve poder visualizar o histórico completo de alertas recebidos |
| RF16 | O sistema deve suportar o cadastro de novos tipos de sensores sem necessidade de alteração estrutural |
| RF17 | O usuário deve poder visualizar a lista de dispositivos e sensores disponíveis no momento do cadastro de uma plantação |
---

## Requisitos Não Funcionais

| Nº | Requisito Não Funcional |
|---|---|
| RNF01 | O sistema deve atualizar os dados dos sensores a cada 2 minutos |
| RNF02 | O sistema deve ser responsivo, funcionando em dispositivos móveis e desktop |
| RNF03 | As senhas dos usuários devem ser armazenadas com criptografia |
| RNF04 | O sistema deve ser capaz de armazenar até 5.040 leituras por semana sem degradação de desempenho |
| RNF05 | O banco de dados SQLite deve ser capaz de realizar consultas no histórico de leituras em menos de 5 segundos |
| RNF06 | O sistema deve registrar data e hora precisas de todas as leituras realizadas |
| RNF07 | O backend deve ser desenvolvido em Node.js seguindo arquitetura em camadas |
| RNF08 | O sistema deve ser escalável para suportar múltiplos dispositivos Arduino e novos tipos de sensores |
| RNF09 | O frontend deve ser desenvolvido em React garantindo compatibilidade com navegadores modernos |
| RNF10 | O sistema deve ser executado localmente sem necessidade de conexão com internet, exceto para envio de notificações |
| RNF11 | As notificações de alerta devem ser enviadas ao usuário assim que o sistema identificar uma leitura crítica, respeitando o tempo de resposta do serviço de notificação utilizado |
| RNF12 | O gateway deve receber os dados do Arduino pela porta serial e enviá-los para o backend via API REST |
