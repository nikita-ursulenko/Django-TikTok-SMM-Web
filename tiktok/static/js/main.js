


// Этот код отслеживает два события, 'load' и 'resize', на объекте window.
window.addEventListener('load', adjustFooterPosition);
window.addEventListener('resize', adjustFooterPosition);

function adjustFooterPosition() {
  // Находим элемент endElement путём его ID.
  const endElement = document.getElementById('end-element');

}
//=================================================================================================
// Этот код добавляет обработчик события на объект окна, который реагирует на событие "resize"
window.addEventListener('resize', function() {
  // Когда происходит событие "resize", вызывается функция adjustFormWidth.
  adjustFormWidth();
});

// Эта функция регулирует ширину элемента формы (form), чтобы она была равна 80% ширине окна.
function adjustFormWidth() {
    var pageWidth = window.innerWidth;
    
    // Проверяем, если ширина экрана меньше 600px, то выходим из функции.
    if (pageWidth < 600) {
      return;
    }
  var form = document.querySelector('form'); // Выберите элемент формы по его тегу.
  var pageWidth = window.innerWidth; // Получить ширину окна.
  var formWidth = Math.floor(pageWidth * 0.6); // Рассчитать ширину формы как 80% ширины страницы и округлить до ближайшего целого числа.
  form.style.width = formWidth + 'px'; // Установить ширину формы в пикселях.
}

// Вызовите функцию adjustFormWidth при загрузке страницы для установки начальной ширины формы.
adjustFormWidth();


//============================================================================================
document.addEventListener('DOMContentLoaded', function() {
  
    // Найти форму по ее id
    var form = document.getElementById('myForm');

    // Добавить обработчик события отправки формы
    form.addEventListener('submit', function(event) {
        // Отменить стандартное поведение формы
        event.preventDefault();
        // Скрыть элемент с классом "start_get"
        var startGet = document.querySelector('.start_get');
        startGet.style.display = 'none';

        var startMessage = document.querySelector('.answer');
        startMessage.style.display = 'block'

        // Получить введенный текст из формы
        var messageInput = document.getElementById('messageInput');
        var messageText = messageInput.value;

        // Очистить поле ввода сообщения
        messageInput.value = '';

        // Создать новый элемент сообщения пользователя
        var userMessageElement = document.createElement('div');
        userMessageElement.classList.add('messageUser');
        userMessageElement.textContent = messageText;

        // Найти контейнер чата
        var chatContainer = document.getElementById('chatContainer');

        // Добавить новое сообщение пользователя в контейнер чата
        chatContainer.appendChild(userMessageElement);

        // Обработать сообщение пользователя и сформировать ответ
        var answerText = getAnswer(messageText);

        // Создать новый элемент ответа
        var answerElement = document.createElement('div');
        answerElement.classList.add('messageScript');
        answerElement.style.backgroundColor = 'rgba(128, 128, 128, 0.118)';

        var contentElement = document.createElement('div');
        contentElement.classList.add('content');

        // Добавить элемент для черного квадратика
        var cursorElement = document.createElement('span');
        cursorElement.classList.add('cursor');
        contentElement.appendChild(cursorElement);

      // Создать таймер для эффекта печатания
    var timer = setInterval(function() {
        // Добавить следующий символ к содержимому ответа
        contentElement.textContent += answerText.charAt(0);
        answerText = answerText.slice(1);
    
        // Если все символы добавлены
        if (answerText.length === 0) {
        // Удалить таймер
        clearInterval(timer);
    
        // Проверить, требуется ли запрос ссылки на пост TikTok
        if (messageText.toLowerCase().includes('тикток')) {
            // Запросить ссылку на пост TikTok
            var linkMessageElement = document.createElement('div');
            linkMessageElement.classList.add('messageScript');
            linkMessageElement.style.backgroundColor = 'rgba(128, 128, 128, 0.118)';
            var linkContentElement = document.createElement('div');
            linkContentElement.classList.add('content');
            linkContentElement.textContent = 'Пожалуйста, введите ссылку на пост TikTok, чтобы мы могли вам помочь.';
            linkMessageElement.appendChild(linkContentElement);
            chatContainer.appendChild(linkMessageElement);
        }
    
        // Прокрутить контейнер чата вниз после добавления нового сообщения
        scrollToBottom();
        } else {
        // Добавить мигающий квадратик после каждого символа
        contentElement.innerHTML += '<span class="cursor"></span>';
        }
    
        // Прокрутить контейнер чата вниз после каждого добавленного символа
        scrollToBottom();
    }, 50);
    
    // Создать функцию для прокрутки контейнера чата вниз
    function scrollToBottom() {
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }
  
        answerElement.appendChild(contentElement);

        // Добавить новый элемент ответа в контейнер чата
        chatContainer.appendChild(answerElement);

        // Прокрутить к новому элементу ответа
        answerElement.scrollIntoView({ behavior: 'smooth' });

        // Фиксировать положение скролла на новом элементе в течение определенного времени
        setTimeout(function() {
        answerElement.scrollIntoView({ behavior: 'auto' });
        }, 4500); // Здесь 2000 - это время в миллисекундах, в течение которого скролл будет фиксироваться
        // Прокрутить контейнер чата к новому сообщению
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    });

    // Функция для обработки сообщения пользователя и формирования ответа
    function getAnswer(message) {
        if (message.toLowerCase().includes('привет') || message.toLowerCase().includes('здравствуйте')|| message.toLowerCase().includes('привіт') || message.toLowerCase().includes('побачив') || message.toLowerCase().includes('рекламу')) {
            return 'Вітаю! Я штучний інтелект, який допомагає твоїм відео в тік струм потрапляти в рекомендацію! За допомогою мене тебе починають бачити більша кількість людей у ​​твоїй країні, завдяки чому ти стаєш популярним і твої відео триденними?';
        } else if (message.toLowerCase().includes('тикток')) {
            return 'Скиньте мені посилання відео які ви хочете щоб залетіло в рекомендації.';
        } else if (message.toLowerCase().includes('tiktok.com')) {
          var linkRegex = /(https?:\/\/[^\s]+)/;
          var linkMatch = message.match(linkRegex);
      
          if (linkMatch !== null) {
              var link = linkMatch[0];
      
              // Создайте AJAX-запрос
              var xhr = new XMLHttpRequest();
              xhr.open('POST', '/payment/', true);
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      
              // Отправьте данные на сервер Django
              xhr.send('link=' + encodeURIComponent(link) + '&csrfmiddlewaretoken=' + getCookie('csrftoken'));
      
              xhr.onload = function() {
                  if (xhr.status === 200) {
                      var response = JSON.parse(xhr.responseText);
                      var data = response.data;
                      var signature = response.signature;
                      // Создаем новый элемент liqpay_checkout
                      var liqpayCheckout = document.createElement('div');
                      liqpayCheckout.id = 'liqpay_checkout';

                      // Вставляем liqpay_checkout в нужное место на странице
                      var messageScript = document.querySelector('.messageScript');
                      messageScript.parentNode.insertBefore(liqpayCheckout, messageScript.nextSibling);

                      // Обновляем содержимое элемента liqpay_widget с помощью JavaScript
                      var liqpayWidgetContent = `
                      <script>
                          window.LiqPayCheckoutCallback = function() {
                              LiqPayCheckout.init({
                                  data: "${data}",
                                  signature: "${signature}",
                                  embedTo: "#liqpay_checkout",
                                  language: "ru",
                                  mode: "embed" // embed || popup
                              }).on("liqpay.callback", function(data) {
                                  console.log(data.status);
                                  console.log(data);
                              }).on("liqpay.ready", function(data) {
                                  // ready
                              }).on("liqpay.close", function(data) {
                                  // close
                              });
                          };
                          var liqpayScript = document.createElement('script');
                          liqpayScript.src = "//static.liqpay.ua/libjs/checkout.js";
                          liqpayScript.async = true;
                          liqpayScript.onload = function() {
                              window.LiqPayCheckoutCallback();
                          };

                          document.getElementById('liqpay_checkout').appendChild(liqpayScript);
                      </script>
                  `;
                   // Вставляем содержимое liqpayCheckoutContent после элемента liqpay_checkout
                    liqpayCheckout.insertAdjacentHTML('afterend', liqpayWidgetContent);
                          
                    // Включаем виджет LiqPay после обновления содержимого элемента
                    window.LiqPayCheckoutCallback();
                  }
              };
          }
            return 'Сейчас вставлю оплату ждите.';
      } else {
            return 'Вибачте, я не розумію вашого повідомлення. Можете уточнити або поставити інше запитання?';
        }
    }
});

//============================================================================================
var footerOverflow = document.querySelector('footer .overflow');
var footer = document.querySelector('footer');

var overflowHeight = getComputedStyle(footerOverflow).height;
footer.style.paddingBottom = overflowHeight;

//============================================================================================
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

//============================================================================================