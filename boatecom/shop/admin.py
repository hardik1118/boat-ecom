from django.contrib import admin
from .models import Product, Category, SubCategory, Customer_Info, Order
# Register your models here.

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Customer_Info)
admin.site.register(Order)