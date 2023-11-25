function navSlide() {
    var burger = document.querySelector(".burger");
    var nav = document.querySelector(".nav-list");
  
    burger.addEventListener("click", function() {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
    });
  }
  navSlide();

    
    // Initialize Slick carousel .nav-list
    $(document).ready(function(){
        $('.carousel').slick({
            dots: true, // Show navigation dots
            autoplay: true, // Auto-play the carousel
            autoplaySpeed: 2000 // Set the speed of auto-play in milliseconds
        });
    });

// Retrieve data from local storage
const dataFromLocalStorage = localStorage.getItem('card-count');

// Get the span element
const cartCountSpan = document.getElementById('cart-count');

if (dataFromLocalStorage !== null) {
    // Update the span text content with the retrieved value
    cartCountSpan.textContent = dataFromLocalStorage;
    
}

var clothingCards=document.getElementById("clothingCards")
var accessoriesCards=document.getElementById("accessoriesCards")

function createItemCard(id, preview, name, brand, price) {

    var cardElement = document.createElement("div");
    cardElement.setAttribute("class", "card");
    cardElement.setAttribute("id", id);
    cardElement.addEventListener

   
    var cardLink = document.createElement("a");
    // cardLink.href = "./product.html";
    cardLink.href = "./product.html?product_id=" + id;
    // cardLink.href = "final js\home\product.html";

   
    var imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "img");
   
    var newImgElement = document.createElement("img");
    newImgElement.src = preview;


    imgContainer.appendChild(newImgElement);


    var deatils = document.createElement("div");
    deatils.setAttribute("class", "details");

   
    var newTitleElement = document.createElement("h3");
    newTitleElement.setAttribute("id", "h3");
    var newName = document.createTextNode(name);

   
    newTitleElement.appendChild(newName);
    deatils.appendChild(newTitleElement);
   
    var newBrandElement = document.createElement("h4");
    newBrandElement .setAttribute("id", "h4");
    var newBrand = document.createTextNode(brand);


    newBrandElement.appendChild(newBrand);
    deatils.appendChild(newBrandElement);

  
    var newPriceElement = document.createElement("h5");
    newPriceElement .setAttribute("id", "h5");
    var newPriceText = document.createTextNode("Rs ");
    var newPrice = document.createTextNode(price);
    newPriceElement.appendChild(newPriceText);

    newPriceElement.appendChild(newPrice);
    deatils.appendChild(newPriceElement);

  
    cardLink.appendChild(imgContainer);
    cardLink.appendChild(deatils);

    cardElement.appendChild(cardLink);

    return cardElement;
}
let k=0;
function getData(){
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(data){
        const responseData=data;
        console.log(responseData);
        for(let i=0;i<5;i++){
               clothingCards.appendChild(
                   createItemCard(
                      responseData[i].id,
                      responseData[i].preview,
                      responseData[i].name,
                      responseData[i].brand,
                      responseData[i].price
                    )
                )
        }
        for(let i=5;i<responseData.length;i++){
            accessoriesCards.appendChild(
                createItemCard(
                   responseData[i].id,
                   responseData[i].preview,
                   responseData[i].name,
                   responseData[i].brand,
                   responseData[i].price
                 )
             )
        k++;
     }
    })
}


getData();

