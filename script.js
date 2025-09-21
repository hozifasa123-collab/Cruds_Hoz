document.querySelectorAll('input').forEach(input => {
    input.className = 'transition duration-250 w-[100%] h-[30px] outline-none bg-[#111] my-[4px] mx-0 rounded-[4px] p-[4px] focus:bg-[#000] focus:[transform:scale(1.01)]'
})

document.querySelectorAll('table th').forEach(th => {
    th.className = '[text-transform:uppercase]'
})

const title = document.getElementById("title")
const price = document.getElementById("price")
const taxes = document.getElementById("taxes")
const ads = document.getElementById("ads")
const discount = document.getElementById("discount")
const total = document.getElementById("total")
const count = document.getElementById("count")
const category = document.getElementById("category")
const submit = document.getElementById("submit")

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.textContent = `Total: ${result}`
        total.classList.remove('bg-[#a00d02]')
        total.classList.add('bg-[#040]')
    }
    else {
        total.textContent = `Total: `
        total.classList.remove('bg-[#040]')
        total.classList.add('bg-[#a00d02]')
    }
}
getTotal()
//price
price.addEventListener('mouseup', () => {
    getTotal()
})
price.addEventListener('keyup', () => {
    getTotal()
})
//taxes
taxes.addEventListener('mouseup', () => {
    getTotal()
})
taxes.addEventListener('keyup', () => {
    getTotal()
})
//ads
ads.addEventListener('mouseup', () => {
    getTotal()
})
ads.addEventListener('keyup', () => {
    getTotal()
})
//discount
discount.addEventListener('mouseup', () => {
    getTotal()
})
discount.addEventListener('keyup', () => {
    getTotal()
})

// create product
let dataPro;
let Cate;

if (localStorage.product != null && localStorage.Categorys != null) {
    dataPro = JSON.parse(localStorage.product);
    Cate = JSON.parse(localStorage.Categorys);
} else {
    dataPro = [];
    Cate = [];
}

// Function to update categories in the dropdown
function updateCategoryDropdown() {
    let categorySelect = document.getElementById("categorys");
    categorySelect.innerHTML = ''; // Clear existing options
    for (let i = 0; i < Cate.length; i++) {
        let option = document.createElement("option");
        option.value = Cate[i];
        option.textContent = Cate[i];
        categorySelect.appendChild(option);
    }
}

// Update the category dropdown when the page loads
updateCategoryDropdown();

submit.onclick = () => {
    getTotal();

    // Validate all inputs
    let titleValue = title.value.trim();
    let priceValue = parseFloat(price.value);
    let taxesValue = parseFloat(taxes.value === '' ? 0 : taxes.value);
    let adsValue = parseFloat(ads.value === '' ? 0 : ads.value);
    let discountValue = parseFloat(discount.value === '' ? 0 : discount.value);
    let countValue = parseInt(count.value === '' ? 1 : count.value);
    let categoryValue = category.value.trim();

    // Check if required fields are filled and valid
    if (titleValue === '' || categoryValue === '') {
        displayErrorMessage("Please fill in all required fields.");
        return;
    }

    if (isNaN(priceValue) || priceValue < 0) {
        displayErrorMessage("Price must be a valid positive number.");
        return;
    }

    if (taxesValue < 0) {
        displayErrorMessage("Taxes must be a valid non-negative number.");
        return;
    }

    if (adsValue < 0) {
        displayErrorMessage("Ads must be a valid non-negative number.");
        return;
    }

    if (discountValue < 0) {
        displayErrorMessage("Discount must be a valid non-negative number.");
        return;
    }

    if (countValue < 0) {
        displayErrorMessage("Count must be a valid positive integer.");
        return;
    }

    let newPro = {
        title: titleValue.toLowerCase(),
        price: priceValue,
        taxes: taxesValue,
        ads: adsValue,
        discount: discountValue,
        total: (+priceValue + +taxesValue + +adsValue) - +discountValue,
        count: countValue,
        category: categoryValue.toLowerCase(),
    };

    // Add the product to dataPro
    dataPro.push(newPro);
    localStorage.setItem('product', JSON.stringify(dataPro));

    // Add the category if it's not already in Cate
    if (!Cate.includes(newPro.category)) {
        Cate.push(newPro.category);
        localStorage.setItem('Categorys', JSON.stringify(Cate));
        updateCategoryDropdown();  // Update the dropdown with the new category
    }

    clearData();  // Clear form data after submission
    showData();   // Refresh the product list view
};

// Display error message function
function displayErrorMessage(message) {
    document.getElementById("crud").classList.add("[opacity:0.2]");
    document.getElementById('contain').innerHTML = `
    <div class="absolute flex items-center justify-center top-2 left-0 right-0 z-50 w-full">
        <div class="bg-[#eee] py-10 px-5 max-w-[400px] w-full rounded-lg shadow-xl shadow-black">
            <h1 class="font-bold text-[2rem] text-black text-center">${message}</h1>
            <div class="flex justify-center mt-4">
                <button class="transition duration-250 font-semibold w-20 bg-[rgb(0,102,255)] text-white py-1 px-4 rounded-lg cursor-pointer border-1 border-black hover:[letter-spacing:2px] active:bg-white active:text-[rgb(0,102,255)]"
                    onclick='ok()' id="yes">OK</button>
            </div>
        </div>
    </div>`
}

// OK button click handler (removes the error message)
function ok() {
    document.getElementById("crud").classList.remove("[opacity:0.2]");
    document.getElementById('contain').innerHTML = '';
}


// clear data
function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.classList.remove('bg-[#040]')
    total.classList.add('bg-[#a00d02]')
    total.textContent = 'Total: '
    count.value = ''
    category.value = ''
}

// read
function showData() {
    let table = ''
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td class='py-2 px-2'>${i + 1}</td>
            <td class='py-2 px-2'>${dataPro[i].title}</td>
            <td class='py-2 px-2'>${dataPro[i].price}</td>
            <td class='py-2 px-2'>${dataPro[i].taxes}</td>
            <td class='py-2 px-2'>${dataPro[i].ads}</td>
            <td class='py-2 px-2'>${dataPro[i].discount}</td>
            <td class='py-2 px-2'>${dataPro[i].total}</td>
            <td class='py-2 px-2'>${dataPro[i].category}</td>
            <td class='py-2 px-2'>${dataPro[i].count}</td>
            <td class='py-2 px-2' onclick='updateData(${i})'><button class="trasition duration-250 w-25 h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white" id="update">update</button></td>
            <td class='py-2 px-2' onclick='deleteData(${i})'><button class="trasition duration-250 w-25 h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white" id="delete">delete</button></td>
        </tr>`

    }

    document.getElementById('tbody').innerHTML = table
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
       <button onclick='deleteAll()' class="trasition duration-250 w-[100%] h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white my-[20px] mx-0">delete All(${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = ''
    }
}
showData()

//delete
function yes2(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
    document.getElementById("crud").classList.remove("[opacity:0.2]")
    document.getElementById('contain').innerHTML = ''
}
function deleteData(i) {
    document.getElementById("crud").classList.add("[opacity:0.2]")
    document.getElementById('contain').innerHTML = `<div class="absolute flex items-center justify-center top-2 left-0 right-0 w-full">
        <div class="bg-[#eee] py-10 px-5 max-w-[400px] w-full rounded-lg shadow-xl shadow-black">
            <h1 class="font-bold text-[2rem] text-black text-center">Are You Sure To Delete A Product '${dataPro[i].title}' And A ID Product ${i}?</h1>
            <div class="flex justify-center mt-4">
                <button class="trasition duration-250 font-semibold w-20 bg-[rgb(0,102,255)] text-white py-1 px-4 rounded-lg cursor-pointer border-1 border-black hover:[letter-spacing:2px] active:bg-white active:text-[rgb(0,102,255)]"
                   onclick='yes2(${i})' id="yes">YES</button>
                <button class="trasition duration-250 font-semibold w-20 bg-white text-[rgb(0,102,255)] py-1 px-4 rounded-lg cursor-pointer border-1 border-black hover:[letter-spacing:2px] active:bg-[rgb(0,102,255)] active:text-white"
                   onclick='no()' id="no">NO</button>
            </div>
        </div>
    </div>`
}

function yes() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
    document.getElementById("crud").classList.remove("[opacity:0.2]")
    document.getElementById('contain').innerHTML = ''
}
function no() {
    document.getElementById("crud").classList.remove("[opacity:0.2]")
    document.getElementById('contain').innerHTML = ''
}
function deleteAll() {
    document.getElementById("crud").classList.add("[opacity:0.2]")
    document.getElementById('contain').innerHTML = `<div class="absolute flex items-center justify-center top-2 left-0 right-0 w-full">
        <div class="bg-[#eee] py-10 px-5 max-w-[400px] w-full rounded-lg shadow-xl shadow-black">
            <h1 class="font-bold text-[2rem] text-black text-center">Are You Sure To Delete All Products?</h1>
            <div class="flex justify-center mt-4">
                <button class="trasition duration-250 font-semibold w-20 bg-[rgb(0,102,255)] text-white py-1 px-4 rounded-lg cursor-pointer border-1 border-black hover:[letter-spacing:2px] active:bg-white active:text-[rgb(0,102,255)]"
                   onclick='yes()' id="yes">YES</button>
                <button class="trasition duration-250 font-semibold w-20 bg-white text-[rgb(0,102,255)] py-1 px-4 rounded-lg cursor-pointer border-1 border-black hover:[letter-spacing:2px] active:bg-[rgb(0,102,255)] active:text-white"
                   onclick='no()' id="no">NO</button>
            </div>
        </div>
    </div>`
}

//update 
function updateData(i) {
    let table = ''
    table += `
        <tr>
            <td class='py-2 px-2'>${i + 1}</td>
            <td class='py-2 px-2'>${dataPro[i].title}</td>
            <td class='py-2 px-2'><input id='p' class='text-white text-center w-30 border-1 rounded-lg' type="number" value="${dataPro[i].price}" min="1"></td>
            <td class='py-2 px-2'><input id='t' class='text-white text-center w-30 border-1 rounded-lg' type="number" value="${dataPro[i].taxes}" min="0"></td>
            <td class='py-2 px-2'><input id='a' class='text-white text-center w-30 border-1 rounded-lg' type="number" value="${dataPro[i].ads}" min="0"></td>
            <td class='py-2 px-2'><input id='d' class='text-white text-center w-30 border-1 rounded-lg' type="number" value="${dataPro[i].discount}" min="0"></td>
            <td class='py-2 px-2'>${dataPro[i].total}</td>
            <td class='py-2 px-2'>${dataPro[i].category}</td>
            <td class='py-2 px-2'><input id='c' class='text-white text-center w-30 border-1 rounded-lg' type="number" value="${dataPro[i].count}" min="1"></td>
            <td class='py-2 px-2' onclick='saveData(${i})'><button class="trasition duration-250 w-25 h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white" id="update">save</button></td>
            <td class='py-2 px-2' onclick='deleteData(${i})'><button class="trasition duration-250 w-25 h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white" id="delete">delete</button></td>
        </tr> `

    document.getElementById('tbody').innerHTML = table
}

function saveData(i) {
    dataPro[i].price = parseFloat(document.getElementById('p').value)
    dataPro[i].taxes = parseFloat(document.getElementById('t').value === '' ? 0 : document.getElementById('t').value)
    dataPro[i].ads = parseFloat(document.getElementById('a').value === '' ? 0 : document.getElementById('a').value)
    dataPro[i].discount = parseFloat(document.getElementById('d').value === '' ? 0 : document.getElementById('d').value)
    dataPro[i].count = parseInt(document.getElementById('c').value === '' ? 1 : document.getElementById('c').value)
    dataPro[i].total = (+dataPro[i].price + +dataPro[i].taxes + +dataPro[i].ads) - +dataPro[i].discount

    if (isNaN(dataPro[i].price) || dataPro[i].price < 0) {
        displayErrorMessage("Price must be a valid positive number.");
        return;
    }

    else if (dataPro[i].taxes < 0) {
        displayErrorMessage("Taxes must be a valid non-negative number.");
        return;
    }

    else if (dataPro[i].ads < 0) {
        displayErrorMessage("Ads must be a valid non-negative number.");
        return;
    }

    else if (dataPro[i].discount < 0) {
        displayErrorMessage("Discount must be a valid non-negative number.");
        return;
    }

    else if (dataPro[i].count < 0) {
        displayErrorMessage("Count must be a valid positive integer.");
        return;
    }

    else {
        let table = ''
        for (let i = 0; i < dataPro.length; i++) {
            table += `
        <tr>
            <td class='py-2 px-2'>${i + 1}</td>
            <td class='py-2 px-2'>${dataPro[i].title}</td>
            <td class='py-2 px-2'>${dataPro[i].price}</td>
            <td class='py-2 px-2'>${dataPro[i].taxes}</td>
            <td class='py-2 px-2'>${dataPro[i].ads}</td>
            <td class='py-2 px-2'>${dataPro[i].discount}</td>
            <td class='py-2 px-2'>${dataPro[i].total}</td>
            <td class='py-2 px-2'>${dataPro[i].category}</td>
            <td class='py-2 px-2'>${dataPro[i].count}</td>
            <td class='py-2 px-2' onclick='updateData(${i})'><button class="trasition duration-250 w-25 h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white" id="update">update</button></td>
            <td class='py-2 px-2' onclick='deleteData(${i})'><button class="trasition duration-250 w-25 h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white" id="delete">delete</button></td>
        </tr> `

        }
        document.getElementById('tbody').innerHTML = table
        localStorage.setItem('product', JSON.stringify(dataPro))
    }
}

// search
let searchMode = 'title'

function getSearchMode(id) {
    let search = document.getElementById("search")
    if (id == 'searchTitle') {
        searchMode = 'title'
        search.placeholder = 'search Title'
    } else {
        searchMode = 'category'
        search.placeholder = 'search Category'
    }
    search.focus()
    search.value = ''
    showData()
}

function searchData(value) {
    let table = ''
    if (searchMode == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
        <tr>
                        <td class='py-2 px-2'>${i + 1}</td>
                        <td class='py-2 px-2'>${dataPro[i].title}</td>
                        <td class='py-2 px-2'>${dataPro[i].price}</td>
                        <td class='py-2 px-2'>${dataPro[i].taxes}</td>
                        <td class='py-2 px-2'>${dataPro[i].ads}</td>
                        <td class='py-2 px-2'>${dataPro[i].discount}</td>
                        <td class='py-2 px-2'>${dataPro[i].total}</td>
                        <td class='py-2 px-2'>${dataPro[i].category}</td>
                        <td class='py-2 px-2'>${dataPro[i].count}</td>
                        <td class='py-2 px-2' onclick='updateData(${i})'><button class="trasition duration-250 w-25 h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white" id="update">update</button></td>
                        <td class='py-2 px-2' onclick='deleteData(${i})'><button class="trasition duration-250 w-25 h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white" id="delete">delete</button></td>
                    </tr> `
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
        <tr>
                        <td class='py-2 px-2'>${i + 1}</td>
                        <td class='py-2 px-2'>${dataPro[i].title}</td>
                        <td class='py-2 px-2'>${dataPro[i].price}</td>
                        <td class='py-2 px-2'>${dataPro[i].taxes}</td>
                        <td class='py-2 px-2'>${dataPro[i].ads}</td>
                        <td class='py-2 px-2'>${dataPro[i].discount}</td>
                        <td class='py-2 px-2'>${dataPro[i].total}</td>
                        <td class='py-2 px-2'>${dataPro[i].category}</td>
                        <td class='py-2 px-2'>${dataPro[i].count}</td>
                        <td class='py-2 px-2' onclick='updateData(${i})'><button class="trasition duration-250 w-25 h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white" id="update">update</button></td>
                        <td class='py-2 px-2' onclick='deleteData(${i})'><button class="trasition duration-250 w-25 h-[30px] text-[rgb(127.5,127.5,127.5)] border-1 border-[#390053] cursor-pointer bg-[#390053] rounded-xl hover:bg-[#51025f] hover:border-[#51025f] hover:[letter-spacing:2px] active:text-white active:border-white" id="delete">delete</button></td>
                    </tr> `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table
}
