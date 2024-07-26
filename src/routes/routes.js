module.exports = function(application){
    application.get('/', function(req, res){
      application.src.controllers.home.index(application, req, res);
      
    });
  
    application.get('/carrinho', function(req, res){
      application.src.controllers.carrinho.buscarProdutos(application, req, res);
    });
  
    application.post('/carrinho', function(req, res){
      application.src.controllers.carrinho.adicionarProduto(application, req, res);
    });
  
    application.delete('/carrinho/:id', function(req, res){
      application.src.controllers.carrinho.removerProdutos(application, req, res);
    });
  }
  