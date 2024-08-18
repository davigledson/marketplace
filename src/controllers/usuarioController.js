const buscarUsuario = function(application, req, res) {
    const usuario = new application.src.models.usuario();

    usuario.buscar(function(err, dados) {
        res.render("usuario",{ usuario: dados });
      });

}
const buscarPorId = function(application, req, res) {
  const usuario = new application.src.models.usuario();

  usuario.buscarPorId(function(id, dados) {
    res.render("usuario",{ usuario: dados });
  });

}
const autenticar = function(application, req, res) {
  const usuario = new application.src.models.usuario();
  
  const { email, senha } = req.body;

  
  usuario.autenticar(email,senha,function(err, dados) {
    if (err) {
      console.error('Erro na autenticação:', err);
      return res.status(500).json({ error: 'Erro ao autenticar usuário' });
  }

  if (dados) {
      res.status(200).json({ success: dados });
  } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

}
module.exports = {
    buscarUsuario,
    autenticar,
    buscarPorId
   
  }
  