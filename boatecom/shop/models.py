from django.db import models
# Create your models here.


class Category(models.Model):
    category = models.CharField(max_length=50, default="")

    def __str__(self):
        return self.category


class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.CharField(max_length=50, default="")

    def __str__(self):
        return '%s'%(self.subcategory)


class Product(models.Model):
    prod_id = models.AutoField
    prod_name = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    price = models.IntegerField(default=0)
    desc = models.CharField(max_length=300)
    pub_date = models.DateField()
    image = models.ImageField(upload_to="shop/images", default="")

    def __str__(self):
        return self.prod_name



class Customer_Info(models.Model):
    username = models.CharField(max_length=15)
    email = models.EmailField(unique=True, max_length=50)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.email


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    cust_id = models.ForeignKey(Customer_Info,on_delete=models.CASCADE)
    prod_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order_date = models.DateTimeField(editable=False)
    order_status = [
        ('pending','pending'),
        ('rejected','rejected'),
        ('approved','approved'),
        ('delivered','delivered'),
        ('transport','transport')
    ]
    status = models.CharField(max_length=10, choices=order_status)

    def __str__(self):
        return 'id: ' + str(self.order_id)
