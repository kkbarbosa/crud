const cadastro = document.getElementById('cadastro');

let nome = document.getElementById('nome');
let fabricante = document.getElementById('fabricante');
let anoLanca = document.getElementById('anoLanca');
let valor = document.getElementById('valor');
let qtde = document.getElementById('qtde');
let descricao = document.getElementById('descricao');
let imgProd = document.getElementById('img_prod');

cadastro.addEventListener('submit', async (e) => {

    e.preventDefault();

    const carregarDados = new FormData();

    carregarDados.append('nome', nome.value);
    carregarDados.append('fabricante', fabricante.value);
    carregarDados.append('anoLanca', anoLanca.value);
    carregarDados.append('valor', valor.value);
    carregarDados.append('quantidade', qtde.value);
    carregarDados.append('descricao', descricao.value);
    carregarDados.append('img_prod', imgProd.files[0]);

    await fetch('/api/paginas', {
        method: 'POST',
        body: carregarDados,
    });

    window.location.href = '/admin';

});
