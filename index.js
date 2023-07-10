// Bibliotecas
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const { Database } = require('dsc.db');
const axios = require('axios');

const db = new Database({
    uri: "mongodb+srv://caiquebafe:Hamachi123@caique.pb9htts.mongodb.net/",
    collection: "radioesrp",
    debug: false,
});

const queue = new Array();

const app = express();


// Middlewares
app.use('/static', express.static(__dirname + "/static"));
app.set('views', __dirname + '/static/ejs');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'cafeSchmits1840',
    resave: false,
    saveUninitialized: true
}));

// Rotas
app.get("/", (req, res) => {
    return res.render("index", { 
        user: req.session.user, 
        msg: req.query.msg,
        queue: queue,
    });
});

// Gerenciamento das musicas
app.post("/sendSong", async (req, res) => {
    const { InputMusic } = req.body;
    const apiKey = "AIzaSyCrEL_RkFx2rCiL8gxmzFGwb0ttKWT3QV4";
 
    let url = 'https://www.googleapis.com/youtube/v3/search' +
      '?part=snippet' +
      '&maxResults=1' +
      '&q=' + encodeURIComponent(InputMusic) +
      '&key=' + apiKey;
    
    let searchResult = await axios.get(url)
    .catch((err) => {
        console.log(err);
        return res.redirect("/?msg=Erro ao enviar música.");
    });

    let video = searchResult.data.items[0].snippet;

    queue.push({
        ...video,
        requestedBy: req.session.user,
    });

    setTimeout(() => {
        queue.shift();
    }, 10 * 1000);

    return res.redirect("/?msg=Música enviada com sucesso!");
});

// Autenticação de usuário
app.get("/login", (req, res) => {
    if(req.session.user) return res.redirect('/');

    res.render("login");
});

app.post("/login", async (req, res) => {
    const { InputEmail, InputSenha } = req.body;

    const users = await db.list();

    const userExists = users.find((user) => user.data.email == InputEmail);

    const userValid = users.find((user) => user.data.email == InputEmail && user.data.password == InputSenha);

    if(!userExists) {
        return res.redirect("/login?msg=Usuário não encontrado.")
    }
    
    if(!userValid) {
        return res.redirect("/login?msg=Senha incorreta!")
    }

    if(userExists && userValid) {
        req.session.user = userExists.data;

        res.redirect("/");
    }
});

app.post("/signup", async (req, res) => {

    const { InputEmailReg, InputSenhaReg, InputNumReg, InputTurmaReg } = req.body;

    const users = await db.list();

    let user = users.find((user) => user.email === InputEmailReg);

    if(user) {
        return res.redirect('/login?msg=Usuário já existente.')
    }

    user = { 
        regNumber: InputNumReg, 
        classId: InputTurmaReg, 
        email: InputEmailReg, 
        password: InputSenhaReg 
    };

    await db.set(`${InputNumReg}`, user);

    req.session.regNumber = InputNumReg;
    req.session.user = user;

    return res.redirect('/login')
});

app.get('/logout', (req, res) => {
    // Destroy the session and clear the user ID
    req.session.destroy();
  
    // Logout successful
    return res.redirect("/");
  });

// Servidor
app.listen(3883, () => {
    console.log("Olá Mundo!")
});