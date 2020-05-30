-- Criar schema postgres

CREATE SCHEMA marcus_vinicius; 

SET search_path TO marcus_vinicius;


CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome_cliente VARCHAR(80) NOT NULL,
    sexo_cliente CHAR(1) NOT NULL,
    idade_cliente SMALLINT NOT NULL
);

CREATE TABLE carros (
	id SERIAL PRIMARY KEY,
    placa char(8),
    nome_carro VARCHAR(40) NOT NULL,
    cor_carro VARCHAR(25) NOT NULL,
    ano_carro CHAR(4) NOT NULL,
    marca_carro varchar(255),
    combustivel_carro varchar(255),
    dono_carro INT REFERENCES clientes(id)
    ON DELETE CASCADE
 	ON UPDATE CASCADE
);

CREATE TABLE revisoes (
    id SERIAL PRIMARY KEY,
    data_revisao DATE NOT NULL,
    descricao_revisao TEXT NOT NULL,
    valor_revisao REAL NOT NULL,
    carro_revisao int REFERENCES carros(id)
    ON DELETE CASCADE
 	ON UPDATE CASCADE
)

-- idade média de homens e mulheres

SELECT
	id, nome_cliente, sexo_cliente, idade_cliente,
	TRUNC(idade_media_homens, 1) as idade_media_homens, 
	TRUNC(idade_media_mulheres, 1) as idade_media_mulheres, 
	TRUNC(avg(idade_media_geral), 1) as idade_media_geral
FROM marcus_vinicius.clientes,
	(
		SELECT avg(idade_cliente) as idade_media_homens
		from marcus_vinicius.clientes
		where sexo_cliente = 'M'
	)as idade_homens,
	(
		SELECT avg(idade_cliente) as idade_media_mulheres
		from marcus_vinicius.clientes
		where sexo_cliente = 'F'
	)as idade_mulheres,
	(
		SELECT avg(idade_cliente) as idade_media_geral from marcus_vinicius.clientes
	) as idade_media_geral
GROUP BY
	id, nome_cliente, sexo_cliente, idade_cliente, idade_media_homens, idade_media_mulheres
ORDER BY
	id ASC

-- Todos os carros por pessoa ordenado por ordem de pessoa

SELECT 
	*
FROM 
	marcus_vinicius.carros v, marcus_vinicius.clientes c
WHERE
	v.dono_carro = c.id
ORDER BY 
	nome_cliente ASC


-- Tem mais carros ( homens ou mulheres )

SELECT
	c.id, nome_cliente, placa, nome_carro, marca_carro, combustivel_carro, ano_carro, cor_carro, homens, mulheres
FROM
	marcus_vinicius.clientes c, marcus_vinicius.carros, (
	SELECT 
		count(sexo_cliente) as homens 
	FROM 
		marcus_vinicius.clientes c, marcus_vinicius.carros
	WHERE 
		c.id = dono_carro 
	AND 
		sexo_cliente = 'M'
	) as quantHomens,(
	SELECT 
		count(sexo_cliente) as mulheres 
	FROM 
		marcus_vinicius.clientes c, marcus_vinicius.carros 
	WHERE 
		c.id = dono_carro 
	AND 
		sexo_cliente = 'F'
	) as quantMulheres
WHERE
	c.id = dono_carro

-- Todas as marcas ordenadas pelo número de carros

SELECT 
	placa, nome_carro, cor_carro, ano_carro,  marca_carro, combustivel_carro, nome_cliente, c.id
FROM 
	(SELECT count(marca_carro)quant_marca, marca_carro as marca_aux
		FROM 
			marcus_vinicius.carros  
		GROUP BY 
			marca_aux 
		ORDER BY 
			quant_marca DESC
	) marcas, 
	marcus_vinicius.carros , marcus_vinicius.clientes c
WHERE 
	marca_carro = marca_aux
AND
	dono_carro = c.id
ORDER BY 
	quant_marca DESC

-- Totais de marcas ordenados do maior para o menor, separados entre homens e mulheres

SELECT 
	placa, nome_cliente, c.id, cor_carro, nome_carro, ano_carro, marca_carro, combustivel_carro, sexo_cliente
FROM 
	marcus_vinicius.clientes c, marcus_vinicius.carros,  (
	SELECT count(marca_carro)quant_marca_homens, marca_carro as marca_homens
		FROM 
			marcus_vinicius.clientes c, marcus_vinicius.carros
		WHERE 
			c.id = dono_carro
		GROUP BY 
			marca_homens 
		ORDER BY 
			quant_marca_homens DESC
	) as quantMarcasHomens
WHERE
	dono_carro  = c.id
ORDER BY
	sexo_cliente ASC, quantMarcasHomens DESC

-- Todas as revisões dentro de um período
SELECT 
	r.id, to_char(data_revisao, 'DD/MM/YYYY') as data_revisao, descricao_revisao, valor_revisao, placa, marca_carro, nome_cliente, c.id
FROM 
	marcus_vinicius.clientes c, marcus_vinicius.revisoes r, marcus_vinicius.carros v
WHERE 
	dono_carro = c.id 
AND 
	carro_revisao = v.id
AND
	data_revisao BETWEEN '$data1' AND '$data2'
