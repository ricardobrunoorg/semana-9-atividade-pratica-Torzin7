// lista de produtos

const data = {
  produtos: [

    {
      id: 1,
      nome: "iPhone 14",
      preco: 5000,
      categoria: "Celulares",
      imagem: "https://via.placeholder.com/200",
      descricao: "Celular da Apple",
      emEstoque: true
    },

    {
      id: 2,
      nome: "Galaxy S23",
      preco: 4200,
      categoria: "Celulares",
      imagem: "https://via.placeholder.com/200",
      descricao: "Celular Samsung",
      emEstoque: true
    },

    {
      id: 3,
      nome: "Notebook Dell",
      preco: 3500,
      categoria: "Notebooks",
      imagem: "https://via.placeholder.com/200",
      descricao: "Notebook para estudos",
      emEstoque: true
    },

    {
      id: 4,
      nome: "MacBook Air",
      preco: 8000,
      categoria: "Notebooks",
      imagem: "https://via.placeholder.com/200",
      descricao: "Notebook Apple",
      emEstoque: false
    },

    {
      id: 5,
      nome: "Mouse Gamer",
      preco: 150,
      categoria: "Acessórios",
      imagem: "https://via.placeholder.com/200",
      descricao: "Mouse RGB",
      emEstoque: true
    },

    {
      id: 6,
      nome: "Teclado Mecânico",
      preco: 300,
      categoria: "Acessórios",
      imagem: "https://via.placeholder.com/200",
      descricao: "Teclado gamer",
      emEstoque: true
    },

    {
      id: 7,
      nome: "PlayStation 5",
      preco: 4500,
      categoria: "Games",
      imagem: "https://via.placeholder.com/200",
      descricao: "Console da Sony",
      emEstoque: false
    },

    {
      id: 8,
      nome: "Xbox Series X",
      preco: 4300,
      categoria: "Games",
      imagem: "https://via.placeholder.com/200",
      descricao: "Console da Microsoft",
      emEstoque: true
    }

  ]
};


// pegando elementos da tela

const listaProdutos = document.getElementById("product-list");

const detalhesProduto = document.getElementById("product-details");

const inputBusca = document.querySelector("#search");

const selectCategoria = document.querySelector("#category");

const botaoRenderizar = document.getElementById("btnRender");


// formatar preço

function formatarPreco(preco) {

  return "R$ " + preco.toFixed(2);

}


// criar card

function criarCard(produto) {

  const card = document.createElement("div");

  card.classList.add("card");

  card.setAttribute("data-id", produto.id);

  // style obrigatório
  card.style.border = "1px solid gray";


  const titulo = document.createElement("h2");

  titulo.textContent = produto.nome;


  const imagem = document.createElement("img");

  imagem.src = produto.imagem;


  const preco = document.createElement("p");

  preco.textContent = formatarPreco(produto.preco);


  const categoria = document.createElement("p");

  categoria.textContent = produto.categoria;


  // botão detalhes

  const btnDetalhes = document.createElement("button");

  btnDetalhes.textContent = "Ver detalhes";

  btnDetalhes.addEventListener("click", function () {

    mostrarDetalhes(produto);

  });


  // botão destacar

  const btnDestacar = document.createElement("button");

  btnDestacar.textContent = "Destacar";

  btnDestacar.addEventListener("click", function () {

    card.classList.toggle("highlight");

  });


  // colocando elementos dentro do card

  card.appendChild(titulo);

  card.appendChild(imagem);

  card.appendChild(preco);

  card.appendChild(categoria);

  card.appendChild(btnDetalhes);

  card.appendChild(btnDestacar);


  return card;

}


// mostrar produtos

function renderizarProdutos(produtos) {

  listaProdutos.innerHTML = "";


  produtos.forEach(function (produto) {

    const card = criarCard(produto);

    listaProdutos.appendChild(card);

  });


  // querySelectorAll obrigatório

  const cards = document.querySelectorAll(".card");


  cards.forEach(function (card) {

    console.log(card.getAttribute("data-id"));

  });

}


// mostrar categorias

function renderizarCategorias() {

  const categorias = ["Todas"];


  data.produtos.forEach(function (produto) {

    if (!categorias.includes(produto.categoria)) {

      categorias.push(produto.categoria);

    }

  });


  categorias.forEach(function (categoria) {

    const option = document.createElement("option");

    option.value = categoria;

    option.textContent = categoria;

    selectCategoria.appendChild(option);

  });

}


// mostrar detalhes

function mostrarDetalhes(produto) {

  detalhesProduto.innerHTML = `

    <h2>${produto.nome}</h2>

    <p><strong>Preço:</strong> ${formatarPreco(produto.preco)}</p>

    <p><strong>Categoria:</strong> ${produto.categoria}</p>

    <p><strong>Estoque:</strong>
      ${produto.emEstoque ? "Disponível" : "Indisponível"}
    </p>

    <p>${produto.descricao}</p>

  `;

}


// filtrar produtos

function filtrarProdutos() {

  const texto = inputBusca.value.toLowerCase();

  const categoria = selectCategoria.value;


  const resultado = data.produtos.filter(function (produto) {

    const nomeIgual = produto.nome
      .toLowerCase()
      .includes(texto);


    const categoriaIgual =
      categoria === "Todas" ||
      produto.categoria === categoria;


    return nomeIgual && categoriaIgual;

  });


  renderizarProdutos(resultado);

}


// eventos

inputBusca.addEventListener("input", filtrarProdutos);

selectCategoria.addEventListener("change", filtrarProdutos);

botaoRenderizar.addEventListener("click", function () {

  renderizarProdutos(data.produtos);

});


// iniciar sistema

renderizarCategorias();

renderizarProdutos(data.produtos);