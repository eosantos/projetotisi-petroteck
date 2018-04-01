
// importando o pacote express
var express = require('express')
// cria um objeto express
var app = express()
// importando o pacote body-parse
var bodyParser = require('body-parser')
// importando o pacote cors
var core_use = require('cors');
// importando o pacote do postgresql
var pg = require('pg');
// fazendo nossa app usar CORS
app.use(core_use());
// configurando nossa app para usar body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// JSON de configuração de conexão com banco de dados
var config = {
	user: "postgres",
	database: "loja",
	password: "340530",
	port: 5432,
	max: 10,
	idleTimeoutMills: 30000,
}
// cria o canal de comunicação com o banco de dados
var canal = new pg.Pool(config);



// cria rota para consulta em uma tabela do banco de dados
app.post('/logar', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select count(*) as conta from usuario where email = \'' + req.body.email + 
		'\' and senha = \'' + req.body.senha + '\'';
		console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na consulta da tabela', erro);
			}
			console.log(resultado.rows[0].conta);
			res.json(resultado.rows[0].conta); // retorna ao cliente as linhas do select
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.get('/consultaProduto', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select * from produtos order by codigo';
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na consulta da tabela', erro);
			}
			res.json(resultado.rows); // retorna ao cliente as linhas do select
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.get('/consultaCompra', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select * from compra order by codigo';
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na consulta da tabela', erro);
			}
			res.json(resultado.rows); // retorna ao cliente as linhas do select
		});
	});
});

// cria rota para insere em uma tabela do banco de dados
app.post('/insereProduto', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'insert into produtos values (' + req.body.codigo + 
				  ',\'' + req.body.nome + 
				  '\', '+ req.body.qtde + 
				  ',' + req.body.valor + ')';
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na inserção dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da inserção
		});
	});
});

// cria rota para insere em uma tabela do banco de dados
app.post('/insereCompra', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'insert into compra values (' + req.body.codigo + 
				  ',\'' + req.body.descricao + 
				  '\', '+ req.body.qtde + 
				  ',' + req.body.valor + 
				   ',' + req.body.cod_produto +  ')';
		console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na inserção dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da inserção
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.delete('/removeProduto/:codigo', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'delete from produtos where codigo =  ' + req.params.codigo;
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na remoção dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da remoção
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.delete('/removeCompra/:codigo', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'delete from compra where codigo =  ' + req.params.codigo;
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na remoção dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da remoção
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.put('/atualizaProduto', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'update produtos set nome = \'' + req.body.nome + 
				'\' , qtde = ' + req.body.qtde + ', valor = ' + req.body.valor + 
				' where codigo =  ' + req.body.codigo;
				console.log(sql);		
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na atualização dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da atualização
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.put('/atualizaCompra', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'update compra set descricao = \'' + req.body.descricao + 
				'\' , qtde = ' + req.body.qtde + ', valor = ' + req.body.valor + 
				', cod_produto = ' + req.body.cod_produto + 
				' where codigo =  ' + req.body.codigo;

		console.log(sql);		

		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na atualização dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da atualização
		});
	});
});

app.listen(3000)