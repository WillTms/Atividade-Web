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

    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const existingRow = findExistingRow(productName, productCost, productPrice);

    if (existingRow) {
        updateProductQuantity(existingRow, productQuantity);
    } else {
        let insertIndex = 0;
        const rowCount = table.rows.length;
        for (let i = 0; i < rowCount; i++) {
            const currentName = table.rows[i].cells[0].innerHTML;
            if (currentName.localeCompare(productName) < 0) {
                insertIndex++;
            } else {
                break;
            }
        }

        const newRow = table.insertRow(insertIndex);

        const nameCell = newRow.insertCell(0);
        const quantityCell = newRow.insertCell(1);
        const costCell = newRow.insertCell(2);
        const priceCell = newRow.insertCell(3);
        const stockValueCell = newRow.insertCell(4);

        nameCell.innerHTML = productName;
        quantityCell.innerHTML = productQuantity;
        costCell.innerHTML = `$${productCost.toFixed(2)}`;
        priceCell.innerHTML = `$${productPrice.toFixed(2)}`;
        const stockValue = productQuantity * productPrice;
        stockValueCell.innerHTML = `$${stockValue.toFixed(2)}`;

        addActionButtons(newRow);
    }

    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('productCost').value = '';
    document.getElementById('productPrice').value = '';
}

function findExistingRow(name, cost, price) {
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const existingName = row.cells[0].innerHTML;
        const existingCost = parseFloat(row.cells[2].innerHTML.substring(1));
        const existingPrice = parseFloat(row.cells[3].innerHTML.substring(1));

        if (existingName === name && existingCost === cost && existingPrice === price) {
            return row;
        }
    }

    return null;
}

function updateProductQuantity(row, quantity) {
    const quantityCell = row.cells[1];
    const currentQuantity = parseFloat(quantityCell.innerHTML);

    const newQuantity = currentQuantity + quantity;

    if (newQuantity <= 0) {
        row.remove();
    } else {
        quantityCell.innerHTML = newQuantity;

        const priceCell = row.cells[3];
        const productPrice = parseFloat(priceCell.innerHTML.substring(1));
        const stockValueCell = row.cells[4];
        const currentStockValue = parseFloat(stockValueCell.innerHTML.substring(1));
        const newStockValue = currentStockValue + quantity * productPrice;
        stockValueCell.innerHTML = `$${newStockValue.toFixed(2)}`;
    }
}

function addActionButtons(row) {
    const actionsCell = row.insertCell(5);

    const addButton = document.createElement('button');
    addButton.textContent = 'Adicionar';
    addButton.className = 'add';
    addButton.addEventListener('click', function () {
        updateProductQuantity(row, 1);
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.className = 'remove';
    removeButton.addEventListener('click', function () {
        updateProductQuantity(row, -1);
    });

    actionsCell.appendChild(addButton);
    actionsCell.appendChild(removeButton);
}

function sortProducts() {
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const orderSelect = document.getElementById('orderSelect');
    const selectedValue = orderSelect.options[orderSelect.selectedIndex].value;

    const rows = Array.from(table.rows);

    if (selectedValue === 'name') {
        rows.sort((a, b) => a.cells[0].innerHTML.localeCompare(b.cells[0].innerHTML));
    } else if (selectedValue === 'priceAsc') {
        priceOrder = 'asc';
        rows.sort((a, b) => {
            const priceA = parseFloat(a.cells[3].innerHTML.substring(1));
            const priceB = parseFloat(b.cells[3].innerHTML.substring(1));
            return priceA - priceB;
        });
    } else if (selectedValue === 'priceDesc') {
        priceOrder = 'desc';
        rows.sort((a, b) => {
            const priceA = parseFloat(a.cells[3].innerHTML.substring(1));
            const priceB = parseFloat(b.cells[3].innerHTML.substring(1));
            return priceB - priceA;
        });
    }

    if (priceOrder === 'desc') {
        rows.reverse();
    }

    for (const row of rows) {
        table.appendChild(row);
    }
}
