interface Livro {
    id: number;
    titulo: string;
    autor: string;
    paginas: number;
    genero: string;
}

const formLivro = document.getElementById("formLivro") as HTMLFormElement;
const tabelaLivros = document.querySelector("#tbLivros tbody") as HTMLElement;
const livros: Livro[] = JSON.parse(localStorage.getItem("livros") || "[]");
const autores: string = "";

function atualizarTabelaLivros() {
    tabelaLivros.innerHTML = "";
    livros.forEach((livro: Livro) => {
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

function salvarLivro(event: Event) {
    event.preventDefault();
    const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
    const autor = (document.getElementById("autor") as HTMLInputElement).value;
    const paginas = parseInt((document.getElementById("paginas") as HTMLInputElement).value);
    const genero = (document.getElementById("genero") as HTMLInputElement).value;

    const novoLivro: Livro = {
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

function removerLivro(id: number) {
    const index = livros.findIndex(livro => livro.id === id);
    if (index !== -1) {
        livros.splice(index, 1);
        localStorage.setItem("livros", JSON.stringify(livros));
        atualizarTabelaLivros();
    }
}

function editarLivro(id: number) {
    const livro = livros.find(livro => livro.id === id);
    if (!livro) return;
    (document.getElementById("titulo") as HTMLInputElement).value = livro.titulo;
    (document.getElementById("autor") as HTMLInputElement).value = livro.autor;
    (document.getElementById("paginas") as HTMLInputElement).value = livro.paginas.toString();
    (document.getElementById("genero") as HTMLInputElement).value = livro.genero;
    removerLivro(id);
}

function pesquisarLivros() {
    const autor = (document.getElementById("pesquisa") as HTMLInputElement).value;
    livros.forEach((livro: Livro) => {
        const autores = document.getElementById("autores") as HTMLSelectElement;
        if (livro.autor == autor)
            autores.innerHTML +=
                `<h1>
                    ${livro?.titulo}
                  </h1>
        `;

    });
}

formLivro.addEventListener("submit", salvarLivro);
atualizarTabelaLivros();

