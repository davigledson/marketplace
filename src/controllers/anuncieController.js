const buscarProdutos = function(application, req, res) {
    const produtos = new application.src.models.anuncie();
    const navegacao = {
      icone:'bi bi-shop',
      titulo:'Produtos',
}

produtos.buscar(function(err, result) {
    res.render("anuncie", { 
      produtos: result,
      nav: navegacao
     });
  });
  }
  
  const adicionarProduto = function(application, req, res) {
    const produtos = new application.src.models.anuncie();
    
    // Desestrutura os dados enviados no corpo da requisição
    const { nome, categoria, preco, imagem } = req.body;

    // Verifica se os campos obrigatórios estão presentes
    if (!nome || !categoria || !preco) {
        return res.status(400).json({ error: 'Dados incompletos: nome, categoria e preço são obrigatórios' });
    }

    // Cria o objeto do novo produto
    const novoProduto = {
        titulo: nome,
        categoria,
        preco: parseFloat(preco),
        imagem: imagem || "" // Se a imagem não for fornecida, deixa como string vazia
    };
    
produtos.adicionar(novoProduto, function(err, produtoAdicionado) {
  console.log('Tentando adicionar produto:', novoProduto);
  if (err) {
      console.error('Erro ao adicionar produto:', err);
      return res.status(500).json({ error: 'Erro ao adicionar produto: ' + err });
  }

  if (produtoAdicionado) {
      console.log('Produto adicionado:', produtoAdicionado);
      return res.status(200).json({ success: 'Produto adicionado com sucesso', produto: produtoAdicionado });
  } else {
      console.error('Produto não pôde ser adicionado');
      console.error('Erro' + err);
      return res.status(400).json({ error: 'Produto não pôde ser adicionado' });
  }
  
});

  
  }
  const editarProduto = function(application, req, res) {
    const produtos = new application.src.models.anuncie();
    console.log('Produto a ser editado:', req.body);
    
    const { id } = req.params;
    const { nome, categoria, preco, imagem } = req.body;
  
    if (!id || !nome || !categoria || !preco) {
      return res.status(400).json({ error: 'Dados incompletos: ID, nome, categoria e preço são obrigatórios' });
    }
  
    const dadosAtualizados = {
      titulo: nome,
      categoria,
      preco: parseFloat(preco),
      imagem: imagem || "" 
    };
  
    produtos.editar(parseInt(id), dadosAtualizados, function(err, produtoAtualizado) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao editar produto: ' + err });
      }
  
      res.status(200).json({ success: 'Produto editado com sucesso', produto: produtoAtualizado });
    });


    
  }

  deletarProduto = function(application, req, res) {
    const idProduto = parseInt(req.params.id, 10); // Converte o ID para número inteiro

    const anuncieModel = new application.src.models.anuncie();

    anuncieModel.deletar(idProduto, function(error, result) {
        if (error) {
            console.error('Erro ao deletar o produto:', error);
            return res.status(500).json({ success: false, message: 'Erro ao deletar o produto' });
        }

        res.json({ success: true, message: 'Produto deletado com sucesso' });
    });
};


  
  module.exports = {
    buscarProdutos,
    adicionarProduto,
    editarProduto,
    deletarProduto
    
  }
  