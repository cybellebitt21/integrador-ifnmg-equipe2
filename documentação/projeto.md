# AgroSensor - Monitoramento Climático para Agricultura Familiar no Vale do Jequitinhonha

---

# Tema do Projeto

Sistema de monitoramento climático utilizando IoT e visualização de dados para apoio à agricultura familiar no Vale do Jequitinhonha.

---

# Proposta

O projeto AgroSensor consiste no desenvolvimento de uma plataforma de monitoramento climático voltada para agricultura familiar, utilizando sensores ambientais conectados a uma placa Arduino Mega 2560.

O sistema será responsável por coletar dados ambientais em tempo real, como:

- temperatura;
- umidade do ar;
- umidade do solo;
- luminosidade;
- incidência de chuva.

As informações coletadas serão transmitidas por meio de um gateway intermediário para uma aplicação web responsável pelo armazenamento, processamento e visualização dos dados.

A plataforma permitirá que produtores rurais acompanhem as condições ambientais da plantação, auxiliando na tomada de decisões relacionadas à irrigação, plantio, colheita e manejo agrícola.

---

# Contexto Regional

O projeto foi idealizado com foco na realidade do município de Araçuaí e do Vale do Jequitinhonha, região caracterizada pelo clima semiárido, altas temperaturas e períodos prolongados de seca.

A agricultura familiar representa uma importante fonte de renda local, porém enfrenta desafios relacionados à escassez hídrica, dificuldade de monitoramento ambiental e acesso limitado a tecnologias agrícolas.

O AgroSensor busca oferecer uma solução acessível e de baixo custo para monitoramento climático, contribuindo para o uso racional da água e apoio à produção agrícola regional.

---

# Objetivo Geral

Desenvolver um sistema IoT de monitoramento climático capaz de coletar, transmitir e visualizar dados ambientais em tempo real para auxiliar produtores rurais na tomada de decisões agrícolas.

---

# Objetivos Específicos

- Coletar dados ambientais utilizando sensores conectados ao Arduino Mega 2560;
- Transmitir os dados por meio de comunicação serial USB;
- Desenvolver um gateway para envio das informações ao backend;
- Criar uma API REST para gerenciamento dos dados;
- Desenvolver dashboards para visualização dos dados climáticos;

---

# Tecnologias Envolvidas

- Arduino Mega 2560
- Sensores ambientais: Sensor De Umidade E Temperatura Am2302 Dht22, Sensor Umidade Solo Arduino Montimport HW-080 e Sensor de Luminosidade LDR - Genérico
- Gateway serial USB
- API REST
- Banco de dados
- Dashboard web
- IoT
- Visualização de dados
