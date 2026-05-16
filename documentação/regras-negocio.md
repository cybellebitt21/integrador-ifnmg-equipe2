# Regras de Negócio — AgroSensor

## Objetivo

Este documento descreve as regras de negócio aplicadas ao sistema AgroSensor para monitoramento climático e apoio à agricultura familiar.

---

# Regras de Negócio

| Código | Regra |
|---|---|
| RN01 | O sistema deve registrar leituras ambientais automaticamente |
| RN02 | O sistema deve atualizar os dados dos sensores em tempo real |
| RN03 | Caso a umidade do solo esteja abaixo do nível ideal, o sistema deve indicar necessidade de irrigação |
| RN04 | Caso a umidade do solo esteja muito elevada, o sistema deve alertar excesso de umidade |
| RN05 | Caso a temperatura ambiente esteja acima do limite ideal, o sistema deve alertar calor excessivo |
| RN06 | Caso a temperatura ambiente esteja abaixo do limite ideal, o sistema deve alertar baixa temperatura |
| RN07 | Caso a umidade do ar esteja muito baixa, o sistema deve alertar condição de clima seco |
| RN08 | Caso a luminosidade esteja abaixo do esperado, o sistema deve informar baixa incidência de luz |
| RN09 | Caso a luminosidade esteja muito elevada, o sistema deve alertar excesso de exposição solar |
| RN10 | O sistema deve armazenar histórico das medições ambientais |
| RN11 | O sistema deve permitir visualização dos dados em dashboards |
| RN12 | O usuário deve realizar login para acessar o sistema |
| RN13 | O gateway deve receber os dados enviados pela porta serial USB |
| RN14 | O backend deve tratar os dados recebidos antes do armazenamento |
| RN15 | O sistema deve permitir integração entre Arduino, gateway e backend |
