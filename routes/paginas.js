const express = require('express');
const fs = require('fs');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');//She is singing my sings she wann die lit
const path = require('path');
const multer = require('multer');

const DATA_PATH = './data/dados.json'; //

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        // Renomeando o arquivo de imagem ( imagem.jpg => 1749373949.jpg)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const lerDados = () => {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

const escreverDados = (data) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

/* Rotas para acessar as páginas  atraves de autenticação */
router.get('/admin', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'admin.html'))
});  

router.get('/listar', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'listar.html'))
});  

router.get('/cadastrar', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'cadastrar.html'))
});    

/* Rotas para acessar dados do json produtos  / index */
router.get('/', (req, res) => {
    const data = lerDados();
    res.json(data);
});

router.post('/', upload.single('img_prod'), (req, res) => {
    const data = lerDados();
    const novoDado = {
        id: Date.now(),
            nome: req.body.nome,
            fabricante: req.body.fabricante,
            anoLanca: req.body.anoLanca,
            valor: Number(req.body.valor),
            quantidade: Number(req.body.quantidade),
            descricao: req.body.descricao,
            imgProd: req.file ? `/uploads/${req.file.filename}` : null
        };

    data.push(novoDado);
    escreverDados(data);
    res.json(novoDado);
});

router.put('/:id', upload.single('img_prod'), (req, res) => {
    const data = lerDados();
    const id_edit = Number(req.params.id);
    const index = data.findIndex(produto => produto.id === id_edit);

    if (index !== -1) {
        const produto_edit = data[index];

        produto_edit.nome = req.body.nome || produto_edit.nome;
        produto_edit.fabricante = req.body.fabricante || produto_edit.fabricante;
        produto_edit.anoLanca = req.body.anoLanca || produto_edit.anoL
        produto_edit.valor = Number(req.body.valor) || produto_edit.valor;
        produto_edit.quantidade = Number(req.body.quantidade) || produto_edit.quantidade;
        produto_edit.descricao = req.body.descricao || produto_edit.descricao;
        
        // Substituir a imagem se uma nova for enviada
        if (req.file) {
            // Excluir a imagem antiga, se houver
            if (produto_edit.imgProd) {
                const img_antiga = path.join(__dirname, '..', produto_edit.imgProd);
                fs.unlink(img_antiga, (erro) => {
                    if (erro) {
                        console.error("Erro ao tentar excluir a imagem antiga!", erro);
                    } else {
                        console.log("Imagem antiga excluída com sucesso!", img_antiga);
                    }
                });
            } 
            // Atualizar o caminho da nova imagem
            produto_edit.imgProd = `/uploads/${req.file.filename}`;
        } 
        // Atualiza o produto no Json
        data[index] = produto_edit;
        escreverDados(data);
        res.json(produto_edit);
    } else {
        res.status(404).send({message: 'Erro ao tentar atualizar o produto!'});
    }

});

router.delete('/:id', (req, res) => {
    const data = lerDados();
    const id_del = Number(req.params.id);
    const filtro = data.filter(produto => produto.id !== id_del);
    const idx = data.findIndex(produto => produto.id === id_del);
    
    if (data.length !== filtro.length) {

        const img_del = data[idx]

        if (img_del.imgProd) {
            const imagePath = path.join(__dirname, '..', img_del.imgProd);
            fs.unlink(imagePath, (erro) => {
                if (erro) {
                    console.error("Erro ao tentar excluir a imagem antiga!", erro);
                } else {
                    console.log("Imagem antiga excluída com sucesso!", imagePath);
                }
            });
        } 

        escreverDados(filtro);
        res.json({message: 'Produto Excluído com Sucesso!'});
    } else {
        res.status(404).send({message: 'Erro ao tentar excluir o produto!'});
    }
});
