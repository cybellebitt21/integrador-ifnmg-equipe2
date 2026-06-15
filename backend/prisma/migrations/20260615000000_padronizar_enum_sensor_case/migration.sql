-- Migration: Padronizar enum tipoSensor para snake_case

UPDATE Sensor SET tipo = 'temperatura' WHERE tipo = 'Temperatura';
UPDATE Sensor SET tipo = 'luminosidade' WHERE tipo = 'Luminosidade';
