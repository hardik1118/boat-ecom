from django.shortcuts import render
from .models import Product,Customer_Info, Category, SubCategory, Order
from .forms import CustomerForm
from datetime import datetime
from django.contrib import messages

from django.http import HttpResponse
# Create your views here.


def index(request,catid=None):
    product = Product.objects.all()
    context = {'product':product,
               'currentuser':request.session.get('user')}
    return render(request, 'index.html',context)


def checkout(request):
    return render(request, 'checkout.html', {'currentuser':request.session.get('user')})


def productView(request, id):
    prod = Product.objects.get(id=id)
    context = {'product':prod,'currentuser':request.session.get('user')}
    return render(request, 'productview.html',context)


def registerUser(request):

    registered = False

    if request.method == 'POST':

        # Get info from "both" forms
        # It appears as one form to the user on the .html page
        cust_form = CustomerForm(data=request.POST)

        # Check to see both forms are valid
        if cust_form.is_valid():

            # Save User Form to Database
            user = cust_form.save()
            user.save()

            # Registration Successful!
            registered = True

    else:
        # Was not an HTTP post so we just render the forms as blank.
        cust_form = CustomerForm()

    # This is the render and context dictionary to feed
    # back to the registration.html file page.
    return render(request,'registration.html',
                          {'user_form':cust_form,
                           'registered':registered})


def user_login(request):

    if request.method == 'POST':
        # First get the username and password supplied
        email = request.POST.get('username')
        password = request.POST.get('password')

        cust = Customer_Info.objects.filter(email=email,password=password)
        if cust:
            #set session
            for c in cust:
                request.session['user'] = f'{c.username}'
                request.session['email'] = f'{c.email}'

            return index(request)

        else:
            messages.add_message(request, messages.INFO, 'Invalid Credentials.')
            return render(request,'login.html')

    else:
        # Nothing has been provided for username or password.
        return render(request, 'login.html', {})


def logout_user(request):
    if request.session.get('user'):
        del request.session['user']
    if request.session.get('email'):
        del request.session['email']
    context = {'currentuser':request.session.get('user, None')}
    return index(request)

def placeorder(request):
    username = request.session.get('user')
    if username:
        cnt = int(request.POST.get('count'))
        prods = []
        for i in range(1,cnt+1):
            temp = list(map(int, request.POST.get('item'+str(i)).split(',')))
            # print(temp)
            prods.append(temp)

        userid = None
        for i in  Customer_Info.objects.filter(email=request.session.get('email')):
            userid = i
        for i in prods:
            print(i)
            p = Product.objects.get(pk=i[0])
            order = Order(cust_id=userid, prod_id=p, quantity=i[1], order_date=datetime.now(), status='pending')
            order.save()


        return render(request,'placeorder.html',{'currentuser':username})
    else:
        request.method = 'get'
        return user_login(request)


def vieworder(request):
    cust_id = Customer_Info.objects.filter(email=request.session.get('email'))[0]
    orders = Order.objects.select_related('prod_id').filter(cust_id=cust_id).order_by('-order_date')
    context = {'orders':orders,'currentuser':request.session.get('user')}
    return render(request,'vieworder.html',context)