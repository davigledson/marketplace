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
}

module.exports = function(){
  return produtos;
}