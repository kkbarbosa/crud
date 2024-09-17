const listarPTable = document.getElementById('listarProdutos');

document.addEventListener('DOMContentLoaded', async () => {

    const response = await fetch('/api/paginas/');
    const produtos = await response.json();
    listarProdutos(produtos); 

});

const listarProdutos = (produtos) => {

    listarPTable.innerHTML = '';
    produtos.forEach(produto => {
        const tr = document.createElement('tr');

        const td_id = document.createElement('td');
        td_id.textContent = produto.id;
        tr.appendChild(td_id);

        const td_nome = document.createElement('td');
        td_nome.textContent = produto.nome;
        tr.appendChild(td_nome);

        const td_fab = document.createElement('td');
        td_fab.textContent = produto.fabricante;
        tr.appendChild(td_fab);

        const td_ano = document.createElement('td');
        td_ano.textContent = produto.anoLanca;
        tr.appendChild(td_ano);

        const td_valor = document.createElement('td');
        td_valor.textContent = `R$ ${produto.valor.toFixed(2)}`;
        tr.appendChild(td_valor);

        const td_qtde = document.createElement('td');
        td_qtde.textContent = produto.quantidade;
        td_qtde.classList.add('text-center');
        tr.appendChild(td_qtde);

        const td_des = document.createElement('td');
        td_des.textContent = produto.descricao;
        td_des.classList.add('text-justify');
        tr.appendChild(td_des);
    
        const td_img = document.createElement('td');
        if (produto.imgProd) {
            const img = document.createElement('img');
            img.src = produto.imgProd;
            img.alt = produto.nome;
            img.width = 100; // Definindo o tamanho da imagem
            td_img.appendChild(img);
        }
        tr.appendChild(td_img);

        const td_acao = document.createElement('td');
        let btnEditar = document.createElement('a');
        btnEditar.classList.add('btn', 'btn-warning', 'me-3');
        btnEditar.href = `editar.html?id=${produto.id}`;
        btnEditar.textContent = 'EDITAR';
        td_acao.appendChild(btnEditar);

        let btnExcluir = document.createElement('button');
        btnExcluir.classList.add('btn', 'btn-danger', 'me-3');
        btnExcluir.textContent = 'EXCLUIR';
        btnExcluir.dataset.id = produto.id;
        btnExcluir.dataset.name = produto.nome;
        td_acao.appendChild(btnExcluir);
        td_acao.classList.add('text-center');
        // td_acao.innerHTML = `
        //         <button class="btn btn"> 
        //             <a class="btn btn btn-warning" href="editar.html?id=${produto.id}"> EDITAR </a>
        //          </button>
        //          <button class="btn btn btn-danger del" data-id="${produto.id}" data-name="${produto.nome}">
        //             EXCLUIR                   
        //          </button>`;

        tr.appendChild(td_acao);

        listarPTable.appendChild(tr);

    });

};

const delProduto = async (id) => {
    await fetch(`/api/paginas/${id}`, {
        method: 'DELETE',
    });

    alert("Produto excluído com Sucesso!!");

    window.location.href = "/listar";
};

document.addEventListener('click', (e) => {
    let result = e.target.classList.contains('btn-danger');
    if (result) {
       const id_ex = e.target.getAttribute('data-id');
       const nome_ex = e.target.getAttribute('data-name');
       let ok = confirm(`Tem certeza que deseja excluir o produto: ${nome_ex}?`);
       if (ok) {
        delProduto(id_ex);
       } else {
        exibirProdutos();
       }      
    }
    
});