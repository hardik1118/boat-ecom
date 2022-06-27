from django import forms
from .models import Customer_Info


class CustomerForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta():
        model = Customer_Info
        fields = '__all__'

class CustomerLogInForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta():
        model = Customer_Info
        fields = ['email','password']

