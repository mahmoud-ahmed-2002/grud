let productName = document.getElementById('productName'),
    productCategory = document.getElementById('productCategory'),
    productPrice = document.getElementById('productPrice'),
    productDescription = document.getElementById('productDescription'),
    searchName = document.getElementById("searchTextName"),
    searchCategory = document.getElementById("searchTextCategory"),
    searchPrice = document.getElementById("searchTextPrice"),
    searchDescription = document.getElementById("searchTextDescription"),
    pNameAlert = document.getElementById('nameAlert'),
    pCategoryAlert = document.getElementById('categoerAlert'),
    pPriceAlert = document.getElementById('numberAlert'),
    pDescriptionAlert = document.getElementById('descriptionAlert'),
    productData,
    trimIndex

if (localStorage.getItem("product") == null) {
    productData = []
} else {
    productData = JSON.parse(localStorage.getItem("product"))
    disaply()
}

$('#addClick').click(function () {
   
    if (validateProduct()) {
        addProduct()
    }
})

$('#productName').keyup(function(){
    pNameAlert.innerHTML=`Product Name must start with capital letter and contains minimum 3 letters, Can't contain
    special characters`
    validateName()
})
$('#productCategory').keyup(function(){
    pCategoryAlert.innerHTML=`Product Category must contain minimum 5 letters, Can't contain special characters`
    validateCategory()
})
$('#productPrice').keyup(function(){
    pPriceAlert.innerHTML=` Product Price must be in range 100 : 10,000 (Numbers Only)`
    validatePrice()
})
$('#productDescription').keyup(function(){
    pDescriptionAlert.innerHTML=`Product Description must contain minimum 3 letters, Can't contain special characters`
    validateDescription()
})

function addProduct() {

    if ($('#addClick').html() == 'Add product') {

        let data = {
            name: productName.value,
            category: productCategory.value,
            price: productPrice.value,
            description: productDescription.value
        }
        productData.push(data)
        localStorage.setItem("product", JSON.stringify(productData))
        evacuationData();
        disaply()
    } else {
        productData[trimIndex].name = productName.value;
        productData[trimIndex].category = productCategory.value;
        productData[trimIndex].price = productPrice.value;
        productData[trimIndex].description = productDescription.value;
        $('#addClick').html('Add product')
        evacuationData()
        disaply()
    }

}

function disaply() {
    let temp = ""
    for (let i = 0; i < productData.length; i++) {
        temp +=
            `<tr>
                                <td>${i + 1}</td>
                                <td>${productData[i].name}</td>
                                <td>${productData[i].category}</td>
                                <td>${productData[i].price}</td>
                                <td>${productData[i].description}</td>
                                <td><i class="fas fa-edit text-green" onclick="updataData(${i})"></i></td>
                                <td><i class="fas fa-minus-circle text-danger" onclick="deletData(${i})"></i></td>
                            </tr>`
    }
    $('#tableBody').html(temp)
}

function updataData(index) {
    $('#addClick').html('UP DATA')
    trimIndex = index;
    productName.value = productData[index].name;
    productCategory.value = productData[index].category;
    productPrice.value = productData[index].price;
    productDescription.value = productData[index].description;
}

function deletData(indx) {
    productData.splice(indx, 1)
    localStorage.setItem("product", JSON.stringify(productData))
    disaply()
}

function search() {
    let trimNAme = searchName.value,
        trimCategory = searchCategory.value,
        trimPrice = searchPrice.value,
        trimDescription = searchDescription.value,
        temp = "";

    for (let i = 0; i < productData.length; i++) {
        if (productData[i].name.toLowerCase().includes(trimNAme.toLowerCase()) && productData[i].category.toLowerCase().includes(trimCategory.toLowerCase()) && productData[i].price.includes(trimPrice) && productData[i].description.toLowerCase().includes(trimDescription.toLowerCase())) {
            temp += `<tr>
             <td>${i + 1}</td>
             <td>${productData[i].name}</td>
             <td>${productData[i].category}</td>
             <td>${productData[i].price}</td>
             <td>${productData[i].description}</td>
             <td><i class="fas fa-edit text-green"></i></td>
             <td><i class="fas fa-minus-circle text-danger" onclick="deletData(${i})"></i></td>
         </tr>`
        }
    }
    $('#tableBody').html(temp)
}

function evacuationData() {
    productName.value = "";
    productCategory.value = "";
    productPrice.value = "";
    productDescription.value = "";

    //   alert of productName 
    productName.classList.remove('is-valid')
    productName.classList.remove('is-invalid')
    pNameAlert.classList.add('d-none')
    pNameAlert.classList.remove('d-block')
    
    //   alert of productategory 
    productCategory.classList.remove('is-valid')
    productCategory.classList.remove('is-invalid')
    pCategoryAlert.classList.add('d-none')
    pCategoryAlert.classList.remove('d-block')
    
    //   alert of productPrice 
    productPrice.classList.remove('is-valid')
    productPrice.classList.remove('is-invalid')
    pPriceAlert.classList.add('d-none')
    pPriceAlert.classList.remove('d-block')
    
    //   alert of productategory 
    productDescription.classList.remove('is-valid')
    productDescription.classList.remove('is-invalid')
    pDescriptionAlert.classList.add('d-none')
    pDescriptionAlert.classList.remove('d-block')

}

function validateProduct() {
    pNameAlert.innerHTML="Plez Enter The Name Of Product"
    pCategoryAlert.innerHTML="Plez Enter The Category Of Product"
    pPriceAlert.innerHTML="Plez Enter The Price Of Product"
    pDescriptionAlert.innerHTML="Plez Enter The Description Of Product"
    validateName();validateCategory();validatePrice();validateDescription()
    if (validateName() && validateCategory()&& validatePrice() && validateDescription()) {
        return true
    } else {
        return false
    }
}

function validateName() {
    var regex = /^[A-Z][a-z A-z 0-9]{2,}$/;
    if (regex.test(productName.value)) {
        productName.classList.add('is-valid')
        productName.classList.remove('is-invalid')
        pNameAlert.classList.add('d-none')
        pNameAlert.classList.remove('d-block')
        return true
    } else {
        productName.classList.remove('is-valid')
        productName.classList.add('is-invalid')
        pNameAlert.classList.remove('d-none')
        pNameAlert.classList.add('d-block')
        return false
    }
}

// $('#productName').keyup(validateName())

function validateCategory() {
    var regex = /^[a-z A-Z 0-9]{2,}$/;
    if (regex.test(productCategory.value)) {
        productCategory.classList.add('is-valid')
        productCategory.classList.remove('is-invalid')
        pCategoryAlert.classList.add('d-none')
        pCategoryAlert.classList.remove('d-block')
        return true
    } else {
        productCategory.classList.remove('is-valid')
        productCategory.classList.add('is-invalid')
        pCategoryAlert.classList.remove('d-none')
        pCategoryAlert.classList.add('d-block')
        return false
    }
}

function validatePrice() {
    var regex = /^([1-9][0-9]{2,})$/;
    if(regex.test(productPrice.value)){
        productPrice.classList.add('is-valid')
        productPrice.classList.remove('is-invalid')
        pPriceAlert.classList.add('d-none')
        pPriceAlert.classList.remove('d-block')
        return true
    }else{
        productPrice.classList.remove('is-valid')
        productPrice.classList.add('is-invalid')
        pPriceAlert.classList.remove('d-none')
        pPriceAlert.classList.add('d-block')
        return false
    }
}

function validateDescription(){
    var regex = /^[a-z A-Z 0-9]{3,}?$/;
    if(regex.test(productDescription.value)){
        productDescription.classList.add('is-valid')
        productDescription.classList.remove('is-invalid')
        pDescriptionAlert.classList.add('d-none')
        pDescriptionAlert.classList.remove('d-block')
        return true
    }else{
        productDescription.classList.remove('is-valid')
        productDescription.classList.add('is-invalid')
        pDescriptionAlert.classList.remove('d-none')
        pDescriptionAlert.classList.add('d-block')
        return false
    }
}