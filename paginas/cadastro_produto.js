// Adicione isso como uma variável global no seu script
let products = [];
let priceOrder = 'asc';

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productQuantity = parseFloat(document.getElementById('productQuantity').value);
    const productCost = parseFloat(document.getElementById('productCost').value);
    const productPrice = parseFloat(document.getElementById('productPrice').value);

    if (!productName || isNaN(productQuantity) || isNaN(productCost) || isNaN(productPrice)) {
        alert('Por favor, preencha todos os campos com valores válidos.');
        return;
    }

    // Use a função findExistingProduct para verificar se o produto já existe
    const existingProduct = findExistingProduct(productName, productCost, productPrice);

    if (existingProduct) {
        // Se o produto já existe, atualiza a quantidade no produto existente
        updateProductQuantity(existingProduct, productQuantity);
    } else {
        // Se o produto não existe, cria um novo produto
        const newProduct = {
            name: productName,
            quantity: productQuantity,
            cost: productCost,
            price: productPrice
        };

        // Adiciona o novo produto ao array
        products.push(newProduct);

        // Atualiza o localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Atualiza a tabela
        updateTable();
    }

    // Limpa os campos do formulário
    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('productCost').value = '';
    document.getElementById('productPrice').value = '';
}


function findExistingProduct(name, cost, price) {
    return products.find(product =>
        product.name === name && product.cost === cost && product.price === price
    );
}

function updateProductQuantity(existingProduct, quantity) {
    existingProduct.quantity += quantity;

    if (existingProduct.quantity <= 0) {
        // Remova o produto se a quantidade for zero ou negativa
        products = products.filter(product => product !== existingProduct);
    }

    // Atualize o localStorage
    localStorage.setItem('products', JSON.stringify(products));

    updateTable();
}

function addActionButtons(row, product) {
    const actionsCell = row.insertCell(5);

    const addButton = document.createElement('button');
    addButton.textContent = 'Adicionar';
    addButton.className = 'add';
    addButton.addEventListener('click', function () {
        updateProductQuantity(product, 1);
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.className = 'remove';
    removeButton.addEventListener('click', function () {
        updateProductQuantity(product, -1);
    });

    actionsCell.appendChild(addButton);
    actionsCell.appendChild(removeButton);
}

function updateTable() {
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];

    // Limpe a tabela
    table.innerHTML = '';

    // Se houver produtos salvos no localStorage, carregue-os
    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    }

    // Adicione os produtos ordenados à tabela
    products.sort((a, b) => {
        if (priceOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    }).forEach(product => {
        const newRow = table.insertRow();

        const nameCell = newRow.insertCell(0);
        const quantityCell = newRow.insertCell(1);
        const costCell = newRow.insertCell(2);
        const priceCell = newRow.insertCell(3);
        const stockValueCell = newRow.insertCell(4);

        nameCell.innerHTML = product.name;
        quantityCell.innerHTML = product.quantity;
        costCell.innerHTML = `$${product.cost.toFixed(2)}`;
        priceCell.innerHTML = `$${product.price.toFixed(2)}`;
        const stockValue = product.quantity * product.price;
        stockValueCell.innerHTML = `$${stockValue.toFixed(2)}`;

        addActionButtons(newRow, product);
    });
}

function sortProducts() {
    const orderSelect = document.getElementById('orderSelect');
    const selectedValue = orderSelect.options[orderSelect.selectedIndex].value;

    if (selectedValue === 'name') {
        // Verifique se a ordem atual é a mesma que a desejada
        if (nameOrder === 'asc') {
            products.sort((a, b) => a.name.localeCompare(b.name));
            // Inverta a ordem atual para 'desc'
            nameOrder = 'desc';
        } else {
            // Inverta a ordem atual para 'asc'
            products.sort((a, b) => b.name.localeCompare(a.name));
            nameOrder = 'asc';
        }
    } else if (selectedValue === 'priceAsc') {
        priceOrder = 'asc';
    } else if (selectedValue === 'priceDesc') {
        priceOrder = 'desc';
    }

    // Atualize o localStorage
    localStorage.setItem('products', JSON.stringify(products));

    updateTable();
}

// Chame updateTable() ao carregar a página para exibir os produtos salvos
window.addEventListener('load', function () {
    updateTable();
});

// Adicione um evento 'beforeunload' para salvar os produtos no localStorage antes de recarregar ou fechar a página
window.addEventListener('beforeunload', function () {
    localStorage.setItem('products', JSON.stringify(products));
});

// Chame updateTable() ao carregar a página para exibir os produtos salvos
updateTable();
