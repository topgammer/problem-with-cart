menu.onclick = function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += "  responsive";
    } else {
      x.className = "topnav";
    }
  }

var cart = {}; // корзина

function init() {
    //вычитуем файл goods.json
    // $.getJSON("goods.json", goodsOut);
    $.post(
        "admin/core.php",
        {
            "action" : "loadGoods"
        },
        goodsOut
    );
}

function goodsOut(data) {
    // вывод на страницу
    data = JSON.parse(data);
    console.log(data);
    var out='';
    for (var key in data) {
        // out +='<div class="cart">';
        // out +='<p class="name">'+data[key].name+'</p>';
        // out += '<img src="images/'+data[key].img+'" alt="">';
        // out +='<div class="cost">'+data[key].cost+'</div>';
        // out +='<button class="add-to-cart">Купить</button>';
        // out +='</div>';
        //---------
        out +='<div class="cart">';
        out +=`<img class="itemimage" src="images/${data[key].images}" alt="1">`;
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
        out +='</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}

function addToCart() {
    //добавляем товар в корзину
    var id = $(this).attr('data-id');
    // console.log(id);
    if (cart[id]==undefined) {
        cart[id] = 1; //если в корзине нет товара - делаем равным 1
    }
    else {
        cart[id]++; //если такой товар есть - увеличиваю на единицу
    }
    showMiniCart();
    saveCart();
}
function saveCart(){
    //save cart in localStorage
    localStorage.setItem('cart', JSON.stringify (cart));
}

function showMiniCart() {
    //показываю мини корзину
    var out="";
    for (var key in cart) {
        out += key +' --- '+ cart[key]+'<br>';
    }
    $('.mini-cart').html(out);
}

function loadCart(){
    // проверяю есть ли в локал стор запись карт
    if(localStorage.getItem('cart')){  // if i can get (cart)
        cart = JSON.parse(localStorage.getItem('cart')); // change string in arr
        showMiniCart();
    }
}


$(document).ready(function () {
    init();
loadCart();
});
