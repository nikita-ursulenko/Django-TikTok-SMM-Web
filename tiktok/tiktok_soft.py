import requests
import json

class DocRocket:
    errors = {
        'auth error': 'Ошибка авторизации. Неверный токен',
        'no money': 'Недостаточно средств на балансе',
        'not found': 'Заказ не существует',
        'action unknown': 'Неправильно указан метод/параметр action',
        'service null': 'Не указан ID услуги',
        'link null': 'Не указана ссылка на задание',
        'qnt null': 'Не указано количество',
        'limit min': 'Количество меньше допустимого',
        'limit max': 'Количество больше допустимого',
        'is not available': 'Услугу нельзя использовать через API',
        'qnt is not a multiple of 10/100/1000': 'Количество не кратно 10/100/1000',
        'is already running': 'Задание уже запущено',
        'is not link to the post': 'Указана ссылка не на публикацию',
        'is not full link': 'Указана не полная ссылка на аккаунт',
        'is not login': 'Указан не логин',
        'link incorrect': 'Некорректная ссылка',
        'account is private': 'Закрытый аккаунт',
        'thematics forbidden': 'Запрещенная тематика',
        'black list': 'Ссылка в черном списке',
        'invalid character': 'Недопустимые символы',
        'unknown': 'Неизвестная ошибка. Обратитесь в поддержку'
    }

    def __init__(self, api_key):
        self.api_key = api_key

    def get_error_description(self, error_code):
        return DocRocket.errors.get(error_code, 'Неизвестная ошибка')

    def create_order(self, link, likes_qty=100, views_qty=1000):
        url = 'https://soc-rocket.ru/api.all.php'
        service_likes = '243'
        service_views = '205'

        params_likes = {
            'action': 'add',
            'soc': 'tiktok',
            'key': self.api_key,
            'service': service_likes,
            'link': link,
            'qnt': likes_qty
        }
        response_likes = requests.get(url, params=params_likes)
        data_likes = response_likes.json()
        print(data_likes)
        if 'order' in data_likes:
            order_likes = data_likes['order']
        else:
            order_likes = self.get_error_description(data_likes.get('error'))

        params_views = {
            'action': 'add',
            'soc': 'tiktok',
            'key': self.api_key,
            'service': service_views,
            'link': link,
            'qnt': views_qty
        }
        response_views = requests.get(url, params=params_views)
        data_views = response_views.json()
        if 'order' in data_views:
            order_views = data_views['order']
        else:
            order_views = self.get_error_description(data_views.get('error'))

        return order_likes, order_views

    def get_order_status(self, order_id):
        url = 'https://soc-rocket.ru/api.all.php'

        params = {
            'action': 'status',
            'soc': 'tiktok',
            'key': self.api_key,
            'order': order_id
        }

        response = requests.post(url, data=params)
        data = response.json()
        if 'status' in data:
            return data['status']
        else:
            return self.get_error_description(data.get('error'))


api_key = 'index.py'
doc_rocket = DocRocket(api_key)

link = 'insta.com'

order_likes, order_views = doc_rocket.create_order(link)
orders = {
    'likes_order': order_likes,
    'views_order': order_views
}

with open('orders.json', 'w') as file:
    json.dump(orders, file)

order_id = '2019348'
status = doc_rocket.get_order_status(order_id)
print(f"Статус ордера: {status}")
