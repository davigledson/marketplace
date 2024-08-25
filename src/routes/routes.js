module.exports = function(application){
    application.get('/', function(req, res){
      application.src.controllers.homeController.index(application, req, res);
      
    });
  
    application.get('/carrinho', function(req, res){
      application.src.controllers.carrinhoController.buscarProdutos(application, req, res);
    });
  
    application.post('/carrinho', function(req, res){
      application.src.controllers.carrinhoController.adicionarProduto(application, req, res);
    });

    application.get('/anuncie', function(req, res){
      application.src.controllers.anuncieController.buscarProdutos(application, req, res);
    });
  // DICA: NO CASO DE ERRO OLHA A ABA NETWORK > PREVIEW DO CONSOLE
    application.post('/anuncie/add', function(req, res){
      application.src.controllers.anuncieController.adicionarProduto(application, req, res);
    });
    application.post('/anuncie/edit/:id', function(req, res){
      application.src.controllers.anuncieController.editarProduto(application, req, res);
    });
  
    application.delete('/carrinho/:id', function(req, res){
      application.src.controllers.carrinhoController.removerProdutos(application, req, res);
    });

    application.get('/usuario', function(req, res){
      application.src.controllers.usuarioController.buscarUsuario(application, req, res);
    });
     // Rota para buscar um usuário por ID
     application.get('/usuario/:id', function(req, res){
      application.src.controllers.usuarioController.buscarPorId(application, req, res);
  });

  // Rota para autenticar o usuário
  application.post('/autenticar', function(req, res){
      application.src.controllers.usuarioController.autenticar(application, req, res);
  });
  }
  