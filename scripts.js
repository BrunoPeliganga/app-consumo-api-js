/* ===========================
-- > Arrays para armazenar dados  
=========================== */
let todosProdutos = [];
let todasCategorias = [];


/* ===========================
-- > Function que executa quando o documento html é totalmente carregado!
=========================== */
document.addEventListener("DOMContentLoaded", function () {
    fetch("catalog.json")
        .then(response => response.json())
        .then(data => {
            todosProdutos = data.products;
            todasCategorias = data.categories;

            carregarCategorias();
            mostrarProdutos(todosProdutos);
            escolherProdutos();
        });


    /* ===========================
    -- > Function para adicionar as categorias no formulário.
        CDs e Merchandise
    =========================== */
    function carregarCategorias() {
        const select = document.getElementById("category-filter");

        todasCategorias.forEach(category => {
            let option = document.createElement("option");
            option.classList.add('cards');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    }

    /* ===========================
    -- > Function para escolher Produtos
        lista e seleciona o produto que vai calcular valor total.
    =========================== */
    function escolherProdutos() {

        const produtoId = document.getElementById("product");

        todosProdutos.forEach(products => {
            let option = document.createElement("option");
            option.classList.add('cards');
            option.value = products.id;
            option.textContent = products.name;
            produtoId.appendChild(option);
            console.log(products["name"]);
        })
    }


    /* ===========================
    -- > Function que mostra todos os produtos na page de forma bruta sem filtros.
    =========================== */
    function mostrarProdutos(products) {
        const productList = document.getElementById("product-list");
        productList.innerHTML = "";

        products.forEach(product => {
            const div = document.createElement("div");

            div.innerHTML = `
            <h3>${product.name}</h3>
            <p class="coin">${product.price} €</p>
            <button class="btn-primary detalhes" onclick="mostrarDetalhes('${product.id}')">Ver Detalhes</button>
        `;

            productList.appendChild(div);
        });
    }


    /* ===========================
    -- > Function para filtrar e mostrar por categoria filtrada
    =========================== */
    document.getElementById("category-filter").addEventListener("change", function () {

        const categoriaSelecionada = this.value;

        if (categoriaSelecionada === "") {
            mostrarProdutos(todosProdutos);
        } else {

            const filtrado = todosProdutos.filter(product =>
                product.category === categoriaSelecionada
            );

            mostrarProdutos(filtrado);
        }
    });
});


/* ===========================
-- > Function Responsável pela TOAST - NOTIFICATION
=========================== */
function Toast() {
    console.log("Toast chamado!");

    const toast = document.querySelector(".ts-toast");
    const progress = document.querySelector(".ts-toast .progress");

    if (!toast || !progress) {
        console.error("Toast ou progress não encontrados no DOM.");
        return;
    }

    toast.classList.add("active");
    progress.classList.add("active");

    setTimeout(() => {
        toast.classList.remove("active");
    }, 5000);

    setTimeout(() => {
        progress.classList.remove("active");
    }, 5300);
}

const closeBtn = document.querySelector(".ts-toast .tclose");
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        const toast = document.querySelector(".ts-toast");
        const progress = document.querySelector(".ts-toast .progress");

        toast.classList.remove("active");
        progress.classList.remove("active");
    });
}


/* ===========================
-- > Function para capturar a qualidade e validar se o valor é válido ou não.
-- > Caso não for chama a notificação toast.    
=========================== */
function capturarQuantidade() {

    const quantidade = document.getElementById("quantity").value;
    if (quantidade <= 0) {
        Toast(); // Chama TOAST - NOTIFICATION
        return 0;
    }

    return quantidade;
}

/* ===========================
-- > Function que captura o produto e verifica se foi seleccionado algum produto
-- > Filtra e retorna o produto
=========================== */
function capturarProduto() {

    const produtoId = document.getElementById("product").value;
    if (produtoId === "") {
        alert("Selecciona algum produto!");
        return;
    } else {
        const produto = todosProdutos.find(p => p.id === produtoId);
        return produto;
    }
}

/* ===========================
-- > Function para calcular o valor total de todo seleccionado.
=========================== */
function calcularTotal() {

    const produto = capturarProduto();
    const quantidade = capturarQuantidade();
    if (!produto || quantidade === 0) {
        return;
    }
    const total = produto.price * quantidade;

    document.getElementById("total-value").innerHTML =
        "Total: " + total.toFixed(2) + " €";

}

/* ===========================
-- > Quando clicado mostra o valor total que calculamos na function calcularTotal.
=========================== */
document.getElementById("calculate").addEventListener("click", calcularTotal);


/* ===========================
-- > Mostrar a lightbox na page.
=========================== */
function mostrarDetalhes(id) {

    const product = todosProdutos.find(p => p.id === id);

    document.getElementById("lightbox-title").textContent = product.name; //Adiciona o nome no Lightbox
    document.getElementById("lightbox-image").src = product.image; //Adiciona a imagem no Lightbox
    document.getElementById("lightbox-description").textContent = product.description; //Adiciona a descrisão no Lightbox
    document.getElementById("lightbox-price").textContent = product.price + " €"; //Adiciona o preço no Lightbox
    document.getElementById("lightbox").style.display = "flex"; //O display estava oculto, ele mostra o Lightbox
}

/* ===========================
-- > Ocultar o lightbox na page.
=========================== */
document.querySelector(".close-btn").addEventListener("click", function () {
    document.getElementById("lightbox").style.display = "none"; //Coloca novamente o display oculto e esconde o Lightbox.
});






























