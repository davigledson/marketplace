var SessionStorage = require('node-sessionstorage');
const sessionStorage = SessionStorage;
// session store do lado do servidor

const CARRINHO = "carrinho";
class products {
  buscar(callback) {
    const produtosCarrinho = sessionStorage.getItem(CARRINHO);

    let dados = [];

    if (produtosCarrinho) {
      const produtos = JSON.parse(produtosCarrinho);

      let i = produtos.length - 1;

      produtos.forEach(function (produto) {
        if (i >= 0) {
          dados[i] = produto;
          i--;
        }
      });
    }
    callback(null, dados);
  }
  adicionar(p) {
    let itens = [];

    const produtosCarrinho = sessionStorage.getItem(CARRINHO);

    if (produtosCarrinho) {
      const produtos = JSON.parse(produtosCarrinho);

      itens = produtos;
    }
  
    const product = JSON.parse(p);

    itens.push(product);

    sessionStorage.setItem(CARRINHO, JSON.stringify(itens));
  }
  remover(id) {
    let itens = [];

    const produtosCarrinho = sessionStorage.getItem(CARRINHO);

    if (produtosCarrinho) {
      const produtos = JSON.parse(produtosCarrinho);

      itens = produtos.filter((p) => parseInt(p.id) !== parseInt(id));
    }
    
    sessionStorage.setItem(CARRINHO, JSON.stringify(itens));
  }
}

module.exports = function () {
  return products;
};