"use strict";
const formLivro = document.getElementById("formLivro");
const tabelaLivros = document.querySelector("#tbLivros tbody");
const livros = JSON.parse(localStorage.getItem("livros") || "[]");
const autores = "";
function atualizarTabelaLivros() {
    tabelaLivros.innerHTML = "";
    livros.forEach((livro) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.paginas}</td>
            <td>${livro.genero}</td>
            <td>
                <button class="btn-editar" onclick="editarLivro(${livro.id})">Editar</button>
                <button class="btn-remover" onclick="removerLivro(${livro.id})">Remover</button>
            </td>
        `;
        tabelaLivros.appendChild(row);
    });
}
function salvarLivro(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const paginas = parseInt(document.getElementById("paginas").value);
    const genero = document.getElementById("genero").value;
    const novoLivro = {
        id: Date.now(),
        titulo,
        autor,
        paginas,
        genero
    };
    livros.push(novoLivro);
    localStorage.setItem("livros", JSON.stringify(livros));
    atualizarTabelaLivros();
    formLivro.reset();
}
function removerLivro(id) {
    const index = livros.findIndex(livro => livro.id === id);
    if (index !== -1) {
        livros.splice(index, 1);
        localStorage.setItem("livros", JSON.stringify(livros));
        atualizarTabelaLivros();
    }
}
function editarLivro(id) {
    const livro = livros.find(livro => livro.id === id);
    if (!livro)
        return;
    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("paginas").value = livro.paginas.toString();
    document.getElementById("genero").value = livro.genero;
    removerLivro(id);
}
function pesquisarLivros() {
    const autor = document.getElementById("pesquisa").value;
    livros.forEach((livro) => {
        const autores = document.getElementById("autores");
        if (livro.autor == autor)
            autores.innerHTML +=
                `<h1>
                    ${livro === null || livro === void 0 ? void 0 : livro.titulo}
                  </h1>
        `;
    });
}
formLivro.addEventListener("submit", salvarLivro);
atualizarTabelaLivros();
