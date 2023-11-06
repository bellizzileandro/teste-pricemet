# Teste API Pricemet

Este projeto é um teste realizado para empresa Pricemet. 
Este projeto realiza duas operações básicas em duas rotas principais. Uma rota POST em /produtos que serve para realizar o insert de grande volume de dados, mais de 100k linhas de dados. Nesta rota, os dados são validados linha a linha e é feito um insert em cargas de 10k dados. Caso ocorra qualquer tipo de erro, nenhum dado será inserido no banco. E uma rota GET em /produtos que recebe, como query params, row_count e row_skip, que servem para paginação dos dados. Esses campos não são obrigatórios.

Esta API consta com uma breve documentação em swagger na rota /docs

## Banco de Dados

Como banco de dados foi escolhido trabalhar com MYSQL.

## Interface com Bando de Dados

Para a interface com o banco de dados, foi escolhido trabalhar com Sequelize. Essa ORM possui dois métodos que deram suporte para trabalhar com o volume de dados solicitado, Transaction, servindo para controlar os inserts, e caso necessário, realizar o rollback, e o bulkCreate, que auxilia na inserção de grandes volumes.
