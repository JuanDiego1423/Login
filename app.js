//Invocar o importar express
const express = require('express');
const app = express();

//Permite captura los datos de nuestro formulario media urlencoded
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//Invocar o importar dotenv
const dotenv = require('dotenv');
const { path } = require('express/lib/application');
dotenv.config({path: './env/.env'});

//Directorio public
app.use('/', express.static('public'));
app.use('/', express.static(__dirname + '/public'));

//Establecer motor de platillas ejs
app.set('view engine', 'ejs');

//Invocar bcryptjs
const bcryptjs = require('bcryptjs');

//Variables de sesion
const session = require('express-session');
app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//Invocar el modulo de  conexion de nuetra bd
const connection = require('./database/db')

/*app.get('/', (req, res)=>{
    res.send('hello world');
})*/

app.get('/' , (req, res)=> {
    res.render('index');
})

app.get('/login' , (req, res)=> {
    res.render('login');
})

app.get('/register' , (req, res)=> {
    res.render('register');
})

// Register
app.post('/register', async(req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query ('INSERT INTO users SET ?' , {
        user:user, name:name, rol:rol, pass:passwordHash
    }, async(error, result)=>{
        if(error){
            console.log(error);
        }else{
            res.send('Successful Registration')
        }
    })
})

app.listen(3000, (req, res)=>{
    console.log('Server running on https://localhost:3000/');
})
