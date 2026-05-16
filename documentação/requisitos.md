# Requisitos do Sistema — AgroSensor

## Objetivo

O AgroSensor é um sistema de monitoramento climático voltado para agricultura familiar no Vale do Jequitinhonha. O sistema utiliza sensores conectados ao Arduino Mega 2560 para coletar dados ambientais e disponibilizá-los em dashboards para apoio à tomada de decisão agrícola.

---

# Requisitos Funcionais (RF)

| Código | Descrição |
|---|---|
| RF01 | O sistema deve registrar leituras dos sensores ambientais |
| RF02 | O sistema deve exibir temperatura ambiente |
| RF03 | O sistema deve exibir umidade do ar |
| RF04 | O sistema deve exibir umidade do solo |
| RF05 | O sistema deve exibir luminosidade ambiente |
| RF06 | O sistema deve armazenar histórico das leituras |
| RF07 | O usuário deve conseguir visualizar os dados em dashboard |
| RF08 | O sistema deve permitir cadastro de usuários |
| RF09 | O sistema deve permitir login e logout |

---

# Requisitos Não Funcionais (RNF)

| Código | Descrição |
|---|---|
| RNF01 | O sistema deve utilizar comunicação serial USB |
| RNF02 | O sistema deve utilizar Arduino Mega 2560 |
| RNF03 | O backend deve utilizar arquitetura em camadas |
| RNF04 | O sistema deve utilizar API REST |
| RNF05 | O sistema deve possuir interface responsiva |
| RNF06 | O projeto deve utilizar versionamento Git/GitHub |
| RNF07 | O sistema deve permitir integração entre Arduino, gateway e backend |
