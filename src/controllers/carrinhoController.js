const buscarProdutos = function(application, req, res) {
    const produtos = new application.src.models.carrinho();
    const navegacao = {
      icone:'bi bi-basket',
      titulo:'Carrinho',
}

  
    produtos.buscar(function(err, result) {
      res.render("carrinho", { 
        produtos: result,
        nav: navegacao
       });
    });
  }
  
  const adicionarProduto = function(application, req, res, next) {
    const produtos = new application.src.models.carrinho();
  
    const p = req.query.produto
    produtos.adicionar(p);
    res.redirect("/")
  }
  
  const removerProdutos = function(application, req, res, next) {
    const produtos = new application.src.models.carrinho();
  
    const id = req.params.id;
    produtos.remover(id);
    res.method = 'GET'
    res.json({ redirect: '/carrinho' });
  }
  
  module.exports = {
    buscarProdutos,
    adicionarProduto,
    removerProdutos
  }
  