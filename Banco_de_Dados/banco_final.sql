CREATE DATABASE Cellara;
USE Cellara;


CREATE TABLE empresa (
id_empresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(14) UNIQUE NOT NULL,
nome VARCHAR (50) NOT NULL,
data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
status_contrato TINYINT,
CONSTRAINT chk_contrato CHECK(status_contrato IN(0,1))
);


CREATE TABLE usuario (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
email VARCHAR (50) NOT NULL,
telefone VARCHAR (20),
senha VARCHAR (20) NOT NULL, 
nivel_permissao TINYINT,
id_empresa INT NOT NULL,
CONSTRAINT chk_permissao CHECK(nivel_permissao BETWEEN 1 AND 5)
);


CREATE TABLE contrato (
id_contrato INT PRIMARY KEY AUTO_INCREMENT,
data_contrato DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
tipo_contrato  TINYINT NOT NULL,
data_final_contrato DATE NOT NULL,
id_empresa INT NOT NULL,
id_usuario INT NOT NULL,
id_sede INT NOT NULL,
CONSTRAINT chk_tipo_contrato CHECK(tipo_contrato IN(1, 2, 3)) -- 1: Fixo; 2: Recorrente; 3: Manutenção
);



CREATE TABLE sensor (
id_sensor INT PRIMARY KEY AUTO_INCREMENT,
setor varchar(5) NOT NULL,
ip_sensor VARCHAR (32) NOT NULL,
data_instalacao DATE NOT NULL,
data_manutencao DATE NOT NULL,
status_sensor TINYINT NOT NULL,
id_empresa INT NOT NULL,
id_sede INT NOT NULL,
CONSTRAINT chk_status_sensor CHECK(status_sensor IN(0,1))
);

CREATE TABLE medicao_sensor(
id_medicao_sensor INT PRIMARY KEY AUTO_INCREMENT,
result_medicao INT,
dt_hr_medicao DATETIME NOT NULL,
id_sensor INT NOT NULL
);



CREATE TABLE painel (
id_painel INT PRIMARY KEY AUTO_INCREMENT,
potencia DECIMAL(10,2) NOT NULL,
id_sensor INT NOT NULL,
id_sede INT NOT NULL
);


CREATE TABLE medicao_painel (
id_medicao_painel INT PRIMARY KEY AUTO_INCREMENT,
data_medicao DATE NOT NULL,
qtd_energia_gerada DECIMAL(10,2) NOT NULL,
id_painel INT NOT NULL
);
 
 CREATE TABLE sede (
 id_sede INT PRIMARY KEY AUTO_INCREMENT,
 numero  VARCHAR (10) NOT NULL,
 cep CHAR(8) NOT NULL,
 complemento VARCHAR (60),
 qnt_paineis INT NOT NULL,
 id_empresa INT NOT NULL
 );

CREATE TABLE alerta (
id_alerta INT PRIMARY KEY AUTO_INCREMENT,
dt_alerta DATE NOT NULL,
id_sensor INT NOT NULL
);


INSERT INTO empresa (cnpj, nome, status_contrato) VALUES
('11222333000144', 'Caramicol Alimentos S.A.', 1),
('22333444000155', 'Metalurgica Vale Verde', 0),
('33444555000166', 'Distribuidora Naval do Atlantico', 1),
('44555666000177', 'Refinaria Serra Azul Energia', 0),
('55666777000188', 'Grupo Metalpar Siderurgia', 1);
 
INSERT INTO sede (numero, cep, complemento, qnt_paineis, id_empresa) VALUES
('120', '01310100', 'Galpao 2', 45, 1),
('45', '66015000', 'Patio industrial', 30, 2),
('300', '66093000', 'Terminal Portuario', 480, 3),
('800', '29160000', 'Area Industrial', 300, 4),
('310', '35162000', 'Patio Siderurgico', 150, 5);
 
INSERT INTO usuario (nome, email, telefone, senha, nivel_permissao, id_empresa) VALUES
('Ana Souza', 'ana@caramicol.com.br', '11999990000', 'hashsenha1', 5, 1),
('Carlos Lima', 'carlos@valeverde.com.br', '31988880000', 'hashsenha2', 3, 2),
('Beatriz Torres', 'beatriz@dna.com.br', '91987770000', 'hashsenha3', 5, 3),
('Diego Farias', 'diego@serraazul.com.br', '27977770000', 'hashsenha4', 4, 4),
('Elisa Prado', 'elisa@metalpar.com.br', '31966660000', 'hashsenha5', 2, 5);
 
INSERT INTO contrato (tipo_contrato, data_final_contrato, id_empresa, id_usuario, id_sede) VALUES
(1, '2027-08-01', 1, 1, 1),
(1, '2026-12-01', 2, 2, 2),
(2, '2028-01-15', 3, 3, 3),
(3, '2027-05-20', 4, 4, 4),
(2, '2026-11-10', 5, 5, 5);
 
INSERT INTO sensor (setor, ip_sensor, data_instalacao, data_manutencao, status_sensor, id_empresa, id_sede) VALUES
('A1','192.168.0.10', '2025-02-10', '2026-02-10', 1, 1, 1),
('A1','192.168.0.11', '2025-02-10', '2026-02-10', 1, 1, 1),
('B1','192.168.1.10', '2024-11-05', '2025-11-05', 1, 2, 2),
('B1','192.168.1.11', '2024-11-05', '2025-11-05', 0, 2, 2),
('C1','192.168.2.10', '2024-06-01', '2025-06-01', 1, 3, 3),
('C1','192.168.2.11', '2024-06-01', '2025-06-01', 1, 3, 3),
('D1','192.168.3.10', '2023-09-15', '2025-09-15', 1, 4, 4),
('D1','192.168.3.11', '2023-09-15', '2025-09-15', 0, 4, 4),
('E1','192.168.4.10', '2025-01-20', '2026-01-20', 1, 5, 5),
('E1','192.168.4.11', '2025-01-20', '2026-01-20', 1, 5, 5);
 
INSERT INTO medicao_sensor (result_medicao, dt_hr_medicao, id_sensor) VALUES
(67877.67, '2026-08-01 12:00:00', 1),
(173507.92, '2026-08-01 12:00:00', 2),
(486520.73, '2026-08-01 12:00:00', 3),
(269322.51, '2026-08-01 12:00:00', 4),
(350862.45, '2026-08-01 12:00:00', 4),
(383267.35, '2026-08-01 12:00:00', 5),
(302944.60, '2026-08-01 12:00:00', 6),
(230845.70, '2026-08-01 12:00:00', 7),
(38159.31, '2026-08-01 12:00:00', 8),
(164256.01, '2026-08-01 12:00:00', 9),
(1000.44, '2026-08-01 12:00:00', 10);
 
INSERT INTO painel (potencia, id_sensor, id_sede) VALUES
(550.00, 2, 1), (550.00, 2, 1), (550.00, 2, 1), (550.00, 2, 1),
(550.00, 4, 2), (550.00, 4, 2), (550.00, 4, 2),
(550.00, 6, 3), (550.00, 6, 3), (550.00, 6, 3), (550.00, 6, 3), (550.00, 6, 3), (550.00, 6, 3),
(550.00, 8, 4), (550.00, 8, 4), (550.00, 8, 4), (550.00, 8, 4), (550.00, 8, 4),
(550.00, 10, 5), (550.00, 10, 5), (550.00, 10, 5), (550.00, 10, 5);
 
INSERT INTO medicao_painel (data_medicao, qtd_energia_gerada, id_painel) VALUES
('2026-08-01', 1.84, 1), ('2026-08-01', 1.80, 2), ('2026-08-01', 1.83, 3), ('2026-08-01', 1.81, 4),
('2026-08-01', 1.62, 5), ('2026-08-01', 1.58, 6), ('2026-08-01', 1.61, 7),
('2026-08-01', 1.50, 8), ('2026-08-01', 1.46, 9), ('2026-08-01', 1.49, 10), ('2026-08-01', 1.47, 11), ('2026-08-01', 1.50, 12), ('2026-08-01', 1.45, 13),
('2026-08-01', 1.42, 14), ('2026-08-01', 1.38, 15), ('2026-08-01', 1.41, 16), ('2026-08-01', 1.39, 17), ('2026-08-01', 1.40, 18),
('2026-08-01', 2.06, 19), ('2026-08-01', 2.02, 20), ('2026-08-01', 2.05, 21), ('2026-08-01', 2.03, 22);
 
INSERT INTO alerta (dt_alerta, id_sensor) VALUES
('2026-08-01', 4),
('2026-08-02', 6),
('2026-08-03', 8);
 
 
SELECT * FROM empresa WHERE nome = 'Distribuidora Naval do Atlantico';
 
SELECT * FROM sede WHERE id_empresa = 3;
 
SELECT setor, status_sensor FROM sensor WHERE id_sede = 3;

SELECT * FROM medicao_sensor WHERE id_sensor IN (5, 6);
 
SELECT
    id_painel,
    data_medicao,
    qtd_energia_gerada,
    CASE
        WHEN qtd_energia_gerada < 1.60 THEN 'Abaixo do esperado'
        ELSE 'Dentro do esperado'
    END AS situacao
FROM medicao_painel
WHERE id_painel IN (8, 9, 10, 11, 12, 13)
ORDER BY qtd_energia_gerada ASC;
 
SELECT nome, status_contrato FROM empresa ORDER BY nome;
 
SELECT id_empresa, qnt_paineis FROM sede ORDER BY qnt_paineis DESC;
 
SELECT * FROM sensor WHERE status_sensor = 0;
 
SELECT * FROM alerta ORDER BY dt_alerta DESC;
 