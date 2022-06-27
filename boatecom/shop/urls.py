from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.index ),
    path('checkout/', views.checkout ),
    path('productview/<int:id>', views.productView ),
    path('register/', views.registerUser ),
    path('user_login/', views.user_login ),
    path('logout_user/', views.logout_user ),
    path('placeorder/', views.placeorder ),
    path('vieworder/', views.vieworder ),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
