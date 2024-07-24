const Client = require('pg').Client
const cliente =  new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    post: 5432,
    database:"marketplace"
    
})

// ---maneira mais simples de conexão
cliente.connect()
cliente.query("select * from usuario")
.then((results) => {
    const resultado = results.rows
    console.log(resultado)
}).catch((err) => {
   console.log("ERRO" + err) 
})
.finally(()=> cliente.end()) 
