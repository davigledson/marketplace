const buscarProdutos = function(application, req, res) {
  const produtos = new application.src.models.anuncie();
  const navegacao = {
      icone: 'bi bi-shop',
      titulo: 'Produtos',
  };

  produtos.buscar(function(err, result) {
      if (err) {
          console.error('Erro ao buscar produtos:', err);
          return res.status(500).json({ error: 'Erro ao buscar produtos' });
      }

      res.render("anuncie", { 
          produtos: result,
          nav: navegacao
      });
  });
};

const adicionarProduto = function(application, req, res) {
  const produtos = new application.src.models.anuncie();
  
  // Desestrutura os dados enviados no corpo da requisição
  const { 
      nome, 
      categoria, 
      preco, 
      imagem, 
      quantidade, 
      disponivel, 
      vendidos, 
      reservado, 
      emTransito, 
      minimo, 
      localizacao 
  } = req.body;

  

  const agora = new Date();
  // Cria o objeto do novo produto com as informações de estoque
  const novoProduto = {
      titulo: nome,
      categoria,
      preco: parseFloat(preco),
      imagem: imagem || "", // Se a imagem não for fornecida, deixa como string vazia
      quantidade: parseInt(quantidade),
      disponivel: parseInt(disponivel),
      vendidos: parseInt(vendidos),
      reservado: parseInt(reservado),
      emTransito: parseInt(emTransito),
      minimo: parseInt(minimo),
      localizacao,
      criadoEm: agora.toISOString(), // ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
      atualizadoEm: agora.toISOString(),
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
          return res.status(400).json({ error: 'Produto não pôde ser adicionado' });
      }
  });
};

const editarProduto = function(application, req, res) {
  const produtos = new application.src.models.anuncie();
  console.log('Produto a ser editado:', req.body);
  
  const { id } = req.params;
  const { 
      nome, 
      categoria, 
      preco, 
      imagem, 
      quantidade, 
      disponivel, 
      vendidos, 
      reservado, 
      emTransito, 
      minimo, 
      localizacao 
  } = req.body;

 

  const agora = new Date();
  const dadosAtualizados = {
      titulo: nome,
      categoria,
      preco: parseFloat(preco),
      imagem: imagem || "",
      estoque: {
        quantidade: parseInt(quantidade),
        disponivel: parseInt(disponivel),
        vendidos: parseInt(vendidos),
        reservado: parseInt(reservado),
        emTransito: parseInt(emTransito),
        minimo: parseInt(minimo),
        localizacao,
        atualizadoEm: agora.toISOString(),
    },
    criadoEm: agora.toISOString(), // ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
    atualizadoEm: agora.toISOString(), // ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
  };

  produtos.editar(parseInt(id), dadosAtualizados, function(err, produtoAtualizado) {
      if (err) {
          console.error('Erro ao editar produto:', err);
          return res.status(500).json({ error: 'Erro ao editar produto: ' + err });
      }

      if (produtoAtualizado) {
          console.log('Produto editado:', produtoAtualizado);
          return res.status(200).json({ success: 'Produto editado com sucesso', produto: produtoAtualizado });
      } else {
          console.error('Produto não pôde ser editado');
          return res.status(400).json({ error: 'Produto não pôde ser editado' });
      }
  });
};

const deletarProduto = function(application, req, res) {
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
};
