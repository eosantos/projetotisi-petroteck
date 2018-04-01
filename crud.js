var app = angular.module('CrudApp', []);

app.controller('CrudController', function($scope, $http){

	// chama API para consulta no banco de dados e atualiza tabela na camada view	
	$scope.logar = function(){
		$http.post('http://localhost:3000/logar', $scope.login)
		.then(function (response){
				// response.data contém resultado do select
				if (response.data == 1){
					window.location.href = "http://127.0.0.1:8080/cadastro.html";
				}
				else {	
					alert("Usuário/Senha inválida");	
				}	
		});
	};

	// chama API para consulta no banco de dados e atualiza tabela na camada view	
	var atualizaTabelaProduto = function(){
		$http.get('http://localhost:3000/consultaProduto')
		.then(function (response){
				// response.data contém resultado do select
				$scope.listaProdutos = response.data;			
		});
	};

	// chama API para consulta no banco de dados e atualiza tabela na camada view	
	var atualizaTabelaCompra = function(){
		$http.get('http://localhost:3000/consultaCompra')
		.then(function (response){
				// response.data contém resultado do select
				$scope.listaCompras = response.data;			
		});
	};

	// apenas chama função atualizaTabela
	$scope.consultaProduto = function(){
			atualizaTabelaProduto();
	};

	// apenas chama função atualizaTabela
	$scope.consultaCompra = function(){
			atualizaTabelaCompra();
			atualizaTabelaProduto();
	};

	// chama API - insere no banco de dados e atualiza tabela
	$scope.insereProduto = function(){
		$http.post('http://localhost:3000/insereProduto', $scope.produto)
		.then(function (response){
				atualizaTabelaProduto();
				alert("Inserção com sucesso");
		}
		);
	}

	// chama API - insere no banco de dados e atualiza tabela
	$scope.insereCompra = function(){
		$http.post('http://localhost:3000/insereCompra', $scope.compra)
		.then(function (response){
				atualizaTabelaCompra();
				alert("Inserção com sucesso");
		}
		);
	}

	// chama API - remove do banco de dados e atualiza tabela
	$scope.removeProduto = function(codigo){
		var resposta = confirm("Confirma a exclusão deste elemento?");
		if (resposta == true){
			$http.delete('http://localhost:3000/removeProduto/' + codigo)
			.then(function (response){
				atualizaTabelaProduto();
				alert("Remoção com sucesso");
			}
			);
		}
	}
	
	// chama API - remove do banco de dados e atualiza tabela
	$scope.removeCompra = function(codigo){
		var resposta = confirm("Confirma a exclusão deste elemento?");
		if (resposta == true){
			$http.delete('http://localhost:3000/removeCompra/' + codigo)
			.then(function (response){
				atualizaTabelaCompra();
				alert("Remoção com sucesso");
			}
			);
		}
	}

	// coloca o produto para edição
	$scope.preparaAtualizacaoProduto = function(codigo){
		var posicao = retornaIndiceProduto(codigo);
		$scope.produto = $scope.listaProdutos[posicao];
	}

	// coloca o produto para edição
	$scope.preparaAtualizacaoCompra = function(codigo){
		var posicao = retornaIndiceCompra(codigo);
		$scope.compra = $scope.listaCompras[posicao];
	}
	
	// função que retorna a posição de um produto pelo seu código 
	function retornaIndiceProduto(codigo){
		var i;
		for (i=0;i<$scope.listaProdutos.length;i++){
			if ($scope.listaProdutos[i].codigo == codigo){
				return i; // retorna posição do produto desejado
			}
		}
		return -1;
	}

	// função que retorna a posição de um produto pelo seu código 
	function retornaIndiceCompra(codigo){
		var i;
		for (i=0;i<$scope.listaCompras.length;i++){
			if ($scope.listaCompras[i].codigo == codigo){
				return i; // retorna posição do produto desejado
			}
		}
		return -1;
	}

	// chama API - atualiza o banco de dados e atualiza tabela
	$scope.atualizaProduto = function(){
		$http.put('http://localhost:3000/atualizaProduto', $scope.produto)
		.then(function (response){
				atualizaTabelaProduto();
				alert("Atualização com sucesso");
		}
		);
	}

	// chama API - atualiza o banco de dados e atualiza tabela
	$scope.atualizaCompra = function(){
		alert($scope.compra.cod_produto)
		$http.put('http://localhost:3000/atualizaCompra', $scope.compra)
		.then(function (response){
				atualizaTabelaCompra();
				alert("Atualização com sucesso");
		}
		);
	}

});