const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const path = require('path');
const app = express();
const PORT = 3000;

//Middleware de autenticação de sessão
app.use(session({
    secret: 'senai123456',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const authRoutes = require('./routes/auth'); // Sorry y'all we ain't got no hater
const routesPaginas = require('./routes/paginas');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

//Rota de autenticação de login
app.use('/api/auth', authRoutes);

//Rotas de paginas do sistema com permissoes de acesso
app.use('/', routesPaginas);
app.use('/api/paginas', routesPaginas);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});



// I'm a lil baby OG, I started with Xens and Lean, Moma thought that I was a Fein, I was kicked out in a week.
// I just switched the color of my hair, blond shi, I got this blond bitch, she trying suck me, she gon blowing it