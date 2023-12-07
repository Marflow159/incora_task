ПРАВИЛЬНИЙ ЗАПУСК ПРОГРАМИ
1 - у папці  `incora-test-server` запустити кастомний сервер для отримання, обробки та публікації даних через `npm start`;
2 - у папці `incora-test-task` запустити основний проєкт через `npm start`.

У ході виконання роботи було створено форму для реєстрації та перелік rss ресурсів у файлі - `incora\incora-test-task\src\components\pages\MainPage.js`, також було реалізовану саму реєстрацію `incora\incora-test-task\src\components\signIn\SignIn.js`, кнопку вийти та пости користувача з можливістю видалення та додавання `incora\incora-test-task\src\components\userFeed\userFeed.js`, як на сервері так і на сайті.

При натисканні на rss ресурс показується перелік взятих з цього ресурсу новин `incora\incora-test-task\src\components\pages\feedPage.js`, кожну новину можна переглянути та за потреби перейти на офіційний сайт `incora\incora-test-task\src\components\pages\feedItemPage.js`.