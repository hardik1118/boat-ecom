if(localStorage.getItem('cart') == null)
    { var cart = {}; }
else
{ cart = JSON.parse(localStorage.getItem('cart')); }




var prod_id = document.querySelector('.productname').getAttribute('id').slice(4);
//alert(prod_id);
updateCart(cart,prod_id);

$('.emptycartbtn').bind("click", function(){
        localStorage.clear();
        updateCart(cart,prod_id);
});
var prod_count = Object.keys(cart).length;
document.getElementById('cartitemcount').textContent = '['+prod_count+']';


// handles click on add to cart button
function handler(){
    var idstr = this.id.slice(12).toString();

    if(cart[idstr] != undefined)
        {
            cart[idstr][0] = cart[idstr][0] + 1;
            console.log(cart);
        }
    else
        {
            qty = 1;
            name = document.getElementById("name"+idstr).textContent;
            price = document.getElementById("price"+idstr).textContent;
            image = document.getElementById("image"+idstr).getAttribute("src");
            cart[idstr] = [qty, name, price, image];
            console.log(cart);
        }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(Object.keys(cart).length);
    updateCart(cart,idstr);
}
// If Add To Cart button is clicked for a product
$('.addtocartbtn').bind('click', handler);

// updating cart value here
function updateCart(cart,item){
            if(cart[item] === undefined){return;}
            document.getElementById('addtocartbtnout'+item).innerHTML = "<button id='minus"+item+"' class='btn minus'>-</button><span id='val"+item+"'>"+cart[item][0]+"</span> <button id='plus"+item+"' class='btn  plus'>+</button>";

        var prod_count = Object.keys(cart).length;
        if (prod_count != 0){
        document.getElementById('cartitemcount').textContent = '['+prod_count+']';}
//        updatePopover(cart);
    }

// update cart value
function updateCartValue(){
    var prod_count = Object.keys(cart).length;
       document.getElementById('cartitemcount').textContent = '['+prod_count+']';
}

// minus button function

$('.diva2c').on("click", "button.minus", function(){
        prod_id = this.id.slice(5, );
        if(cart[prod_id] != undefined){
        cart[prod_id][0] = cart[prod_id][0] - 1;
        cart[prod_id][0] = Math.max(0, cart[prod_id][0]);
        document.getElementById("val"+prod_id).innerHTML = cart[prod_id][0];
//
        cart1 = {};
        for(item in cart){
            if(cart[item][0] != 0)
                cart1[item] = cart[item];
        }
        cart = cart1;
        console.log('here in minus');
        console.log(cart);
        var prod_count = Object.keys(cart).length;
        document.getElementById('cartitemcount').textContent = '['+prod_count+']';
        localStorage.setItem('cart', JSON.stringify(cart));
        }
//        updatePopover(cart);
    });

// plus button function
    $('.diva2c').on("click", "button.plus", function(){
        prod_id = this.id.slice(4, );
        if(cart[prod_id] == undefined){
            qty = 0;
            name = document.getElementById("name"+prod_id).textContent;
            price = document.getElementById("price"+prod_id).textContent;
            image = document.getElementById("image"+prod_id).getAttribute("src");
            cart[prod_id] = [qty, name, price, image];
        }
        cart[prod_id][0] = cart[prod_id][0] + 1;
        document.getElementById("val"+prod_id).innerHTML = cart[prod_id][0];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartValue();
//        updatePopover(cart);
    });

//cartitemtext = '<div class="card mb-3" style="max-width: 540px;"><div class="row g-0">    <div class="col-md-4"><img src="'+cart[prod][3]+'" height="100px" width="100px" class="img-fluid rounded-start" alt="..."></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">'+cart[prod][1]+'</h5><ul class="card-text"><li>Count : '+cart[prod][0]+'</li><li>Count : '+cart[prod][2]+'</li></ul></div></div></div></div> ';

    $('.cart').on("click", function(){
        insertHTML = '';
        for(var prod in cart){
            insertHTML += '<div class="card mb-3" style="max-width: 540px;"><div class="row g-0"><div class="col-md-4"><img src="'+cart[prod][3]+'" height="100px" width="100px" class="img-fluid rounded-start" alt="..."></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">'+cart[prod][1]+'</h5><ul class="card-text"><li>Count : '+cart[prod][0]+'</li><li>Price : '+cart[prod][2]+'</li></ul></div></div></div></div> ';
        }
        document.getElementById('cartdetails').innerHTML = insertHTML;
//        localStorage.setItem('cart', JSON.stringify(cart));
//        updatePopover(cart);
    });
