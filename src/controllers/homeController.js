
module.exports.index = async function(application, req, res) {
    const produtos = new application.src.models.home();
    const navegacao = {
      icone:'bi bi-arrow-through-heart',
      titulo:'Lojinha',
}
  
    produtos.buscar(function(err, dados) {
      res.render("home", { 
        produtos: dados,
        nav: navegacao

       });
    });
  }
  