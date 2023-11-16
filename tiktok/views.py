import uuid
from django.http import JsonResponse
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import render, redirect
from .liqpay import LiqPay
import random
from .views import *
from .models import *

def index(request):
    return render(request, 'index.html')

import base64
import hashlib
import json


def payment(request):
    link = request.POST.get('link')
    def generate_unique_order_id():
        while True:
            # Генерируем уникальный order_id
            order_id = ''.join(random.choices('0123456789', k=4))
            
            # Проверяем, существует ли запись с таким же order_id в модели Order
            if not Order.objects.filter(order_id=order_id).exists():
                # Если нет совпадений, возвращаем сгенерированный order_id
                return order_id

    # Генерируем уникальный order_id и проверяем его на уникальность
    order_id = generate_unique_order_id()
    # Сохранение order_id и link в модель Order
    order = Order(order_id=order_id, link=link)
    order.save()
    # Ваши публичный и приватный ключи
    public_key = 'sandbox_i19048574461'
    private_key = 'sandbox_CujhRbGpMAyvD7pcI3ZkpwuH5jYHrgHrF5G5XFj3'

    liqpay = LiqPay(public_key, private_key)
    params = {
    "action"         : "pay",
    "amount"         : "1",
    "currency"       : "USD",
    "description"    : "description text",
    "order_id"       : "order_id_1",
    "version"        : "3"
    }
    signature = liqpay.cnb_signature(params)
    data = liqpay.cnb_data(params)
    print(data, signature )
    # Передача данных и подписи в шаблон для отображения
    return JsonResponse(request, 'payment.html', {'data': data, 'signature': signature,})

def payment_successful(request):
    # Проверка успешности оплаты
    pass

def boost_rocket():
    # Выполнение платной функции
    #TikTok_soft.py
    pass
