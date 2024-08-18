var fs = require('fs');
class produtos {
  buscar(callback) {
    fs.readFile('./data/produtos.json', 'utf8', function (err, lista) {
      let dados = [];

      if (!err) {
        const produtos = JSON.parse(lista);

        let i = (produtos.length - 1);

        produtos.forEach(function (product) {
          if (i >= 0) {
            dados[i] = product;
            i--;
          }
        });
      }
      callback(err, dados);
    });
  }
  adicionar(dadosEnviados,callback){
    fs.readFile('./data/produtos.json','utf8',function(err,lista){
        
        if (err) {
          return callback(err);
        }
        let produtos = [];

        if (lista) {
          try {
              produtos = JSON.parse(lista);
          } catch (parseErr) {
              return callback('Erro ao parsear JSON: ' + parseErr);
          }
      }
        const novoProduto = {
          // Incrementa o ID automaticamente
          id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1, 
          // spread operator 
          ...dadosEnviados
        };
        produtos.push(novoProduto);

        fs.writeFile('./data/produtos.json', JSON.stringify(produtos, null, 2), function(writeErr) {
          if (writeErr) {
              return callback('Erro ao salvar o produto: ' + writeErr);
          }

          // Chama o callback com o novo produto adicionado
          callback(null, novoProduto);
      });
    });
}
}

module.exports = function(){
  return produtos;
}