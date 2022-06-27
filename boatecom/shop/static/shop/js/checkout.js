if(localStorage.getItem('cart') == null)
    { var cart = {}; }
else
{ cart = JSON.parse(localStorage.getItem('cart')); }
//updateCart(cart);

$('.emptycartbtn').bind("click", function(){
        localStorage.clear();
});


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

// push cart items
function pushItems(){
    insertHTML = '<thead><tr><th scope="col"></th><th scope="col">Item Name</th><th scope="col">Qty</th><th scope="col">Price</th><th scope="col">Total</th></tr></thead>';
    var totalAmt = 0;
for(var prod in cart){
    insertHTML += '<tr><td><img src="'+cart[prod][3]+'" height="75px" width="75px" class="img-fluid rounded-start" alt="..."></td><td>'+cart[prod][1]+'</td> <td>'+cart[prod][0]+'</td><td>'+cart[prod][2]+'</td><td>'+(parseInt(cart[prod][0]) * parseInt(cart[prod][2]))+'</td></tr>';
    totalAmt += (parseInt(cart[prod][0]) * parseInt(cart[prod][2]));
    }
    if(totalAmt > 0){
        document.getElementById('ordertablebody').innerHTML = insertHTML;
        document.getElementById('totalamt').innerHTML = '<br><div class="d-flex justify-content-between"><h5>Total Amount : </h5><h5>'+totalAmt+'</h5></div>';
    }
    else
    {
        document.getElementById('container').innerHTML = 'No Orders';
    }

}
pushItems();


$('#placeorderbtn').on('click', function(){
//    alert(Object.keys(cart).length);
    temp = ' <input  type="hidden" name="count" value="'+Object.keys(cart).length+'">';
    cnt = 1;
    for(x in cart){
        temp += '<input type="hidden" name="item'+cnt+'" value="'+x+','+cart[x][0]+'">';
        cnt+=1;
    }
    document.getElementById('placeorderformdiv').innerHTML = temp;
})



