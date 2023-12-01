const express = require("express");
const path = require("path");

const spawnSync = require('child_process');

const router = express.Router();
const conexao = require('/db');
const Usuario = require('../tables/funcionario');

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../paginas", "login.html"));
});

router.post("/", async (req, res)=>{
    var campo_email = req.body.email;
    var campo_senha = req.body.senha;

    const usuario = await Usuario.findOne({
        attributes: ['id', 'nome', 'email', 'senha'],
        where: {
            email: campo_email
        }
    })

    if(usuario === null){
        console.log("Usuário ou senha inválida");
        res.sendFile(path.join(__dirname, "../paginas", "login.html"));
    }

    if(campo_email == usuario.email && campo_senha == usuario.senha){
        res.sendFile(path.join(__dirname, "../paginas", "menu.html"));
    }else{
        console.log("Usuário ou senha inválida");
        res.sendFile(path.join(__dirname, "../paginas", "login.html"));
    }
});

router.post("/cadastrarUsuarioAPI", async (req, res)=>{
    await Usuario.create(req.body)
    .then(()=>{
       return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
       });
    }
    ).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Falha ao cadastrar usuário!"
       });
    });
});

router.post("/cadastrarUsuario", async (req, res)=>{
    console.log(req.body);
    await Usuario.create(req.body)
    .then(()=>{
        document.getElementById("popup_cadastrar_usuario").style.display = 'none';
        res.redirect('/');
    }).catch(()=>{
        res.sendFile(path.join(__dirname, "../paginas", "login.html"));
    });
});

router.get("/principal", (req, res)=>{
    res.sendFile(path.join(__dirname, "../paginas", "menu.html"));
});


module.exports = router;