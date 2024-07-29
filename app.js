var express = require('express');
var consign = require('consign');
const bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');
app.set('views','./src/views');


// Configurar o Body-Parser para analisar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


consign()
    .include('src/routes')
    .then('src/models')
    .then('src/controllers')
    .into(app);

app.listen(3000,function(){
    console.log('APP rodando na porta 3000')
    console.log('http://localhost:3000/')
})
//http://localhost:3000/