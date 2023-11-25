
let imageCards=document.getElementById("imageCards")
let specCards=document.getElementById("specCards")

var searchId = window.location.search.split("=")[1];

function getProductDetails() {
    // Assuming product_detail_id needs to be appended to the URL
    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + searchId, function(data) {
        const responseData=data;
        console.log(responseData);
       let preview= responseData.preview;
       let name= responseData.name;
       let brand= responseData.brand;
       let price= responseData.price;
       let description= responseData.description;
        let photos=responseData.photos;

    let newImgElement = document.createElement("img");
    newImgElement.setAttribute("class", "img-big");
    newImgElement.src = preview;


    imageCards.appendChild(newImgElement);

    let deatils = document.createElement("div");
    deatils.setAttribute("class", "details");

   
    let newTitleElement = document.createElement("h1");
    newImgElement.setAttribute("id", "name");
    let newName = document.createTextNode(name);
    newTitleElement.appendChild(newName);
    deatils.appendChild(newTitleElement);
   
    let newBrandElement = document.createElement("h4");
    let newBrand = document.createTextNode(brand);
    newBrandElement.appendChild(newBrand);
    deatils.appendChild(newBrandElement);

  
    let newPriceElement = document.createElement("h3");
    let newPriceText = document.createTextNode("Price: Rs ");
    newPriceElement.appendChild(newPriceText);
    let newPrice = document.createElement("span");
    newPrice.setAttribute("class","productprice");
    let proPrice = document.createTextNode(price);
    newPrice.appendChild(proPrice);
    newPriceElement.appendChild(newPrice);
    deatils.appendChild(newPriceElement);

    let dediv = document.createElement("div");
    dediv.setAttribute("class", "description");
    let newDescriptionElement = document.createElement("h3");
    let newDescriptionText = document.createTextNode("Description");
    newDescriptionElement.appendChild(newDescriptionText);
    let newparaElement = document.createElement("p");
    let newPara = document.createTextNode(description);
    newparaElement.appendChild(newPara);
    dediv.appendChild(newDescriptionElement);
    dediv.appendChild(newparaElement);
    deatils.appendChild(dediv);

    
    let newProductElement = document.createElement("h3");
    newImgElement.setAttribute("id", "pp");
    let newProductText = document.createTextNode("Product Preview");
    newProductElement.appendChild(newProductText);
    deatils.appendChild(newProductElement);

    let pElement = document.createElement("div");
    pElement.setAttribute("class", "picdiv");

    function picPreview() {
        let picElement = document.createElement("div");
        picElement.setAttribute("class", "fundiv");
        for (let i = 0; i < photos.length; i++) {
            let picImgElement = document.createElement("img");
            picImgElement.src = photos[i];
            picImgElement.setAttribute("class", "picimg");
            picElement.appendChild(picImgElement);
            // picImgElement.style.border = "none";
            if (i === 0) {
                picImgElement.style.border = "2px solid #009688";
            }
            picImgElement.addEventListener("click", function () {
                let allImages = picElement.querySelectorAll('.picimg');
                for (let j = 0; j < allImages.length; j++) {
                    allImages[j].style.border = "none";
                }
                picImgElement.style.border = "2px solid #009688";
                newImgElement.src = photos[i];
            });
        }
        return picElement;
    }

    
    pElement.appendChild(picPreview());
    deatils.appendChild(pElement);

    specCards.appendChild(deatils);
    
    let button =document.createElement("div");
    let cartbutton =document.createElement("button");
    cartbutton.setAttribute("type","button");
    cartbutton.setAttribute("class","butn");
    cartbutton.setAttribute("id","add-to-cart");
    let newcartbut =document.createTextNode("Add to cart");
    cartbutton.appendChild(newcartbut);
    button.appendChild(cartbutton);
    specCards.appendChild(button);

    
/ ---------------- Insert Data into Local Storage > OnClick > Add To Cart Button -------/

var addToCartBtn = document.getElementById("add-to-cart");
var cart = document.getElementById("cart-count");
var myCartData = [];
var cartIntialValue;

if(localStorage.getItem('cart-count') == null) {
	localStorage.setItem('cart-count', '0');
} else {
	var cartValue = localStorage.getItem('cart-count');
	localStorage.setItem('cart-count', cartValue);
}


// ---------------- Increase Cart Count -----------------------
function cartCount() {
  let cartIntialValue;
  let cart = document.getElementById("cart-count");

  if (window.localStorage.getItem("cart-count") === null) {
      cartIntialValue = 0;
  } else {
      cartIntialValue = JSON.parse(window.localStorage.getItem("cart-count"));
      cart.textContent = cartIntialValue; // Update the visible count
  }

  let cartCurrentValue = cartIntialValue + 1;
  window.localStorage.setItem("cart-count", cartCurrentValue);
  cart.textContent = cartCurrentValue; // Update the visible count
}

// ---------------- Add Data into List and then into Local Storage -----------------------

function addDataIntoList(productData) {
  // If Local Storage Is Empty Then Set List To Empty
  if (window.localStorage.getItem("product-list") === null) {
    myCartData = [];
  }
  // If Local Storage Is Not Empty Then Set List To Value Of Local Storage
  else {
    myCartData = JSON.parse(window.localStorage.getItem("product-list"));
  }

  // If List Is Empty Then Push The Object In It
  if (myCartData.length === 0) {
    var myObj = {
      id: productData.id,
      title: productData.name,
      count: 1,
      price: productData.price,
      preview: productData.preview
    };
    myCartData.push(myObj);
  }
  // If List Is Not Empty Then
  else if (myCartData.length != 0) {
    var w = 0;
    // If Same Product Data == True Then List.Count++
    for (var i = 0; i < myCartData.length; i++) {
      if (myCartData[i].id == productData.id) {
        myCartData[i].count = parseInt(myCartData[i].count) + 1;
        w += 1;
      }
    }
    // Else Add New Data Into List
    if (w == 0) {
      var myObj = {
        id: productData.id,
        title: productData.name,
        count: 1,
        price: productData.price,
        preview: productData.preview
      };
      myCartData.push(myObj);
    }
  }
  // Store The List Into Local Storage
  window.localStorage.setItem("product-list", JSON.stringify(myCartData));
}

//------ Add-To-Cart-Btn Click Event Listner ------------------------

addToCartBtn.addEventListener("click", function() {
  var productId = window.location.search.split("=")[1];
  var urlLink =
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId;

  function getDataForLocalStorage() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          var productData = JSON.parse(this.responseText);
          addDataIntoList(productData);
        }
      }
    };
    http.open("GET", urlLink, true);
    http.send();
  }
  cartCount();
  getDataForLocalStorage();
});

})};
// Function to update the visible cart count
function updateCartCount() {
  let cart = document.getElementById("cart-count");
  const dataFromLocalStorage = window.localStorage.getItem("cart-count");
  
  if (dataFromLocalStorage !== null) {
      cart.textContent = dataFromLocalStorage;
  }
}

// Call the function to update cart count when the page loads
window.addEventListener('DOMContentLoaded', function() {
  updateCartCount(); // Update the visible count
});

getProductDetails();




//------------------------------------------------------------
