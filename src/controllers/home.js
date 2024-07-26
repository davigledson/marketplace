
module.exports.index = async function(application, req, res) {
    const produtos = new application.src.models.home();
  
    produtos.buscar(function(err, dados) {
      res.render("home", { produtos: dados });
    });
  }
  