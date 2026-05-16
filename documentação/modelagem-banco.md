# Modelagem Conceitual do Banco de Dados — AgroSensor

## Objetivo

Este documento apresenta a modelagem conceitual inicial do banco de dados do sistema AgroSensor.

---

# Entidades do Sistema

## Usuário

| Atributo | Tipo |
|---|---|
| id_usuario | Inteiro |
| nome | Texto |
| email | Texto |
| senha | Texto |

---

## Sensor

| Atributo | Tipo |
|---|---|
| id_sensor | Inteiro |
| tipo_sensor | Texto |
| modelo | Texto |
| status | Texto |

---

## LeituraSensor

| Atributo | Tipo |
|---|---|
| id_leitura | Inteiro |
| temperatura | Decimal |
| umidade_ar | Decimal |
| umidade_solo | Decimal |
| luminosidade | Decimal |
| data_hora | Data/Hora |

---

# Relacionamentos

- Um usuário pode visualizar várias leituras ambientais.
- Um sensor pode gerar várias leituras.
- As leituras ambientais são armazenadas no sistema para consulta e análise.
  
---

## Sensores Utilizados no Projeto

- DHT22 — Temperatura e Umidade do Ar
- HW-080 — Umidade do Solo
- LDR — Luminosidade
