const listarPtable = document.getElementById('listarProdutos');

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/paginas');
    const produtos = await response.json();
    listarProdutos(produtos);
});

const listarProdutos = (produtos) => {
    listarPtable.innerHTML = '';

    produtos.forEach(produto => {
        let col = document.createElement('div');
        col.classList.add('col');

        let card = document.createElement('div');
        card.classList.add('card');
        col.appendChild(card);

        let img = document.createElement('img');
        img.src = produto.imgProd; 
        img.classList.add('card-img-top');
        img.alt = produto.nome;
        img.width = 100;
        card.appendChild(img);

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        let h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent = produto.nome;
        cardBody.appendChild(h5);

        let valor = document.createElement('p');
        valor.classList.add('card-text');
        valor.innerHTML = `<strong>Valor:</strong> R$ ${produto.valor}`;
        cardBody.appendChild(valor);

        let fab = document.createElement('p');
        fab.classList.add('card-text');
        fab.innerHTML = `<strong>Fabricante:</strong> ${produto.fabricante}`;
        cardBody.appendChild(fab);

        let qtde = document.createElement('p');
        qtde.classList.add('card-text');
        qtde.innerHTML = `<strong>Quantidade:</strong> ${produto.quantidade}`;
        cardBody.appendChild(qtde);

        let divButtonGroup = document.createElement('div');
        divButtonGroup.classList.add('button-group');
        cardBody.appendChild(divButtonGroup);

        let likeCount = document.createElement('span');
        likeCount.classList.add('like-count');
        likeCount.textContent = '0'; 

        let btnCurtir = document.createElement('button');
        btnCurtir.classList.add('btn', 'btn-success', 'me-3'); 
        btnCurtir.textContent = 'Curtir';
        
        divButtonGroup.appendChild(btnCurtir);
        divButtonGroup.appendChild(likeCount);

        let count = 0;

        btnCurtir.addEventListener('click', () => {
            if (btnCurtir.classList.contains('Like')) {
                btnCurtir.classList.remove('Like');
                count--;
            } else {
                btnCurtir.classList.add('Like');
                count++;
            }

            likeCount.textContent = count;
        });

        listarPtable.appendChild(col);
    });
};


const delProduto = async (id) => {
    const response = await fetch(`/api/paginas/${id}`, {
        method: 'DELETE',
    });

    alert("Produto excluido com sucesso!");
    window.location.href = 'listar.html';

};

document.addEventListener('click', (e) => {
    let result = e.target.classList.contains('btn-danger');
    if (result) {
        const id_ex = e.target.getAttribute('data-id');
        const nome_ex = e.target.getAttribute('data-name');
        let ok = confirm(`Tem certeza que deseja excluir esse produto: ${nome_ex}?`);
        if (ok) {
            delProduto(id_ex);
        } else {
            window.location.href = 'listar.html';
        }
    }
});

const button = document.querySelector('#like');
const number = document.querySelector('#number');

button.addEventListener('click', () => {
  let likeValue = document.querySelector('#number').textContent;
  let newValue = Number(likeValue) + 1;
  button.classList.add('like');
  number.innerHTML = newValue;
});

/*Barra de pesquisa*/

/*let cad = document.getElementById('cad');
document.addEventListener('submit', function(event) {

    event.preventDefault();

    let palavra = document.getElementById('palavra').value;
    document.getElementById('palavra').value = '';

    let div = document.createElement('div');
    div.classList.add('word');
    div.textContent = palavra;
    document.getElementById('palavras').appendChild(div);

});

let buscar = document.getElementById('buscar');
buscar.onkeyup = function() {
    
    let result = buscar.value.toLowerCase();
    let words = document.querySelectorAll('.word');

    words.forEach(word => {
        if (word.textContent.toLowerCase().includes(result)) {
            word.style.display = "block";
        } else {
            word.style.display = "none";
            // word.style.backgroundColor = "F#00";
        }

});
};*/
