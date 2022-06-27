if(localStorage.getItem('cart') == null)
    { var cart = {}; }
else
{ cart = JSON.parse(localStorage.getItem('cart')); }
//updateCart(cart);

$('.emptycartbtn').bind("click", function(){
        localStorage.clear();
        }


var prod_count = Object.keys(cart).length;
document.getElementById('cartitemcount').textContent = '['+prod_count+']';

$('.cart').on("click", function(){
    insertHTML = '';
    for(var prod in cart){
        insertHTML += '<div class="card mb-3" style="max-width: 540px;"><div class="row g-0"><div class="col-md-4"><img src="'+cart[prod][3]+'" height="100px" width="100px" class="img-fluid rounded-start" alt="..."></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">'+cart[prod][1]+'</h5><ul class="card-text"><li>Count : '+cart[prod][0]+'</li><li>Price : '+cart[prod][2]+'</li></ul></div></div></div></div> ';
    }
    document.getElementById('cartdetails').innerHTML = insertHTML;
//        localStorage.setItem('cart', JSON.stringify(cart));
//        updatePopover(cart);
});



