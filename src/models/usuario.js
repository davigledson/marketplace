var fs = require('fs');
class usuario {

    buscarPorId(id,callback){
        fs.readFile('./data/usuario.json','utf8',function(err,lista){
           let dados = [];
            if(!err){
                const usuarios = JSON.parse(lista);
                for (let usuario of usuarios) {
                    if (usuario.id === id) {
                        dados = usuario;
                        break; // Encontra o usuário e sai do loop
                    }
                }
            }
            callback(err,dados);
        });
    }
    autenticar(email,senha,callback){
        fs.readFile('./data/usuario.json','utf8',function(err,lista){
            let usuario = null;
            if (!err) {
                const usuarios = JSON.parse(lista);
                for (let u of usuarios) {
                    if (u.email === email && u.senha === senha) {
                        usuario = u;
                        break;
                    }
                }
            }
            callback(err,usuario);
        });
    }

    //buscar todos os usuarios
    buscar(callback){
        fs.readFile('./data/usuario.json','utf8',function(err,lista){
           let dados = [];
            if(!err){
                const dados_usuario = JSON.parse(lista);
                dados = dados_usuario;
                
            }
            callback(err,dados);
        });
    }
}

module.exports = function(){
    return usuario;
}