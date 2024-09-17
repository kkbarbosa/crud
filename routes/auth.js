const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const USER_FILE = path.join(__dirname, '..', 'data', 'user.json');

// Helper para ler o arquivo user.json
const readUsers = () => {
    if (fs.existsSync(USER_FILE)) {
        const data = fs.readFileSync(USER_FILE, 'utf-8');
        return JSON.parse(data);
    }
    return [];
};

// POST: Login de usuário
router.post('/login', (req, res) => {
    const { login, senha } = req.body;
    const users = readUsers();

    // Verifica se o usuário existe no arquivo user.json
    const user = users.find(user => user.login === login && user.senha === senha);

    if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
    }

    // Criar a sessão de login
    req.session.user = { login: user.login };
    res.json({ message: 'Login bem-sucedido!' });
});

// POST: Logout de usuário
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout realizado com sucesso.' });
});

module.exports = router;
