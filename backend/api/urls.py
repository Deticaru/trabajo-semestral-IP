from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', hello),
    path('login/', vista_login),
    path('webpay/create/', webpay_create_transaction),
    path('webpay/commit/', webpay_commit_transaction),
]
