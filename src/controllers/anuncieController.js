const buscarProdutos = function(application, req, res) {
    const produtos = new application.src.models.anuncie();
    const navegacao = {
      icone:'bi bi-basket',
      titulo:'Cadastro de Produtos',
}

produtos.buscar(function(err, result) {
    res.render("anuncie", { 
     // produtos: result,
      nav: navegacao
     });
  });
  }
  
 
  
  module.exports = {
    buscarProdutos,
    
  }
  