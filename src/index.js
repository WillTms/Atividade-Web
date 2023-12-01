const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const db = require('./db');

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(db);
app.use(router);

/*const paginasPath = path.join(__dirname,"../","paginas");
console.log(paginasPath);
app.use("/paginas", express.static(paginasPath,{
    setHeaders:(res, path) => {
        console.log(path)
      if (path.endsWith(".css")){
        res.setHeader("Content-Type","text/css");
      }
    },
}));*/

/*app.use(express.static(__dirname + "/paginas"));*/

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname,"../paginas","login.html"));
});

app.get("/cadastro_funcionario", (req, res)=>{
  res.sendFile(path.join(__dirname,"../paginas","cadastro_funcionario.html"));
});

app.get("/menu", (req, res)=>{
  res.sendFile(path.join(__dirname,"../paginas","menu.html"));
});

app.get("/cadastro_produtos", (req, res)=>{
  res.sendFile(path.join(__dirname,"../paginas","cadastro_produto.html"));
});

app.get("/menu_vendas", (req, res)=>{
  res.sendFile(path.join(__dirname,"../paginas","menu_vendas.html"));
});

app.get("/login", (req, res)=>{
  res.sendFile(path.join(__dirname,"../paginas","login.html"));
});


app.listen(3333, ()=>{
    console.log("Servidor pocando")
});


