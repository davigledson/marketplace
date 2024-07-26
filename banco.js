const Client = require('pg').Client
const cliente =  new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    post: 5432,
    database:"marketplace"
    
})

// ---maneira mais simples de conexão
// cliente.connect()
// cliente.query("select * from usuario")
// .then((results) => {
//     const resultado = results.rows
//     console.table(resultado)
// }).catch((err) => {
//    console.log("ERRO" + err) 
// })
// .finally(()=> cliente.end()) 

//getUsuario()
//insUsuario("Ana")
delUsuario("Ana")
async function getUsuario(){
    try {
        console.log("Inciando a conexão");
        await cliente.connect()
        console.log("conexão bem sucedida!")
        const resultado = await cliente.query("select * from usuario")
        console.log(resultado.rows)
    } catch (error) {
        console.log("ERRO" + error);
    }finally{
    await cliente.end();
    console.log("Cliente desconectado")
        
    }
   
    
}

async function insUsuario(nome){
    try {
        console.log("Inciando a conexão");
        await cliente.connect()
        console.log("conexão bem sucedida!")
         await cliente.query(`insert into usuario(nome) values ('${nome}');`)

        console.log("inserção bem sucedida!")
        const resultado = await cliente.query("select * from usuario")
        console.log(resultado.rows)
    } catch (error) {
        console.log("ERRO" + error);
    }finally{
    await cliente.end();
    console.log("Cliente desconectado")
        
    }

}

async function delUsuario(nome){
    try {
        console.log("Inciando a conexão");
        await cliente.connect()
        console.log("conexão bem sucedida!")
         await cliente.query(`Delete from usuario where nome = '${nome}';`)

        console.log("DELETE bem sucedida!")
        const resultado = await cliente.query("select * from usuario")
        console.log(resultado.rows)
    } catch (error) {
        console.log("ERRO" + error);
    }finally{
    await cliente.end();
    console.log("Cliente desconectado")
        
    }
}