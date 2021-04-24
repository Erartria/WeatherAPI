# Лабораторная работа 3

Необходимо доработать лабораторную работу №2, добавив реализацию серверной части приложения. Серверная часть реализуется на `NodeJS`, допустимо использовать фреймворки вроде `Express` или `Sails`.

Приложение в этой работе становится клиент-серверным, запросы данных о погоде к внешнему API и хранение данных об избранных городах переносятся на сервер. Запросы с клиента отправляются только к самостоятельно реализованной серверной части.

Для получения данных о погоде из внешнего API по городу используется запрос на `GET-endpoint /weather/city` (например: /weather/city?q=Moscow), по координатам – `/weather/coordinates` (например: /weather/coordinates?lat=123&long=456). Если город не найден, должен возвращаться соответствующий ответ с 404 статусом.

Данные об избранных городах хранятся в базе данных, можно использовать любое `SQL/NoSQL` решение. Для работы с избранными городами на сервере должен быть реализован `endpoint /favourites`, обрабатывающий `POST-запросы` на добавление города и `DELETE-запросы` на удаление конкретного города из списка. `GET-запрос на /favourites` возвращает список избранных городов.

Клиентская логика должна быть адаптирована с учетом этих изменений, включая обработку возможных ошибок. Изменения на клиенте должны применяться только после получения соответствующего ответа с сервера (например, удаление города из избранного).

Разработка должна вестись итеративно и публиковаться на github. К моменту проверки и сдачи работы репозиторий должен быть публичным.

Демонстрация работоспособности работы выполняется студентом с помощью демонстрации экрана в zoom. К этому моменту все должно быть подключено и настроено.
____
## Конечные точки
| Конечные точки | Метод | Пример запроса | Описание запроса | Cтатусы | Описание статуса |
| -------------- | ----- | -------------- | ---------------- | ------- | ---------------- |
| /weather/city  | GET | /weather/city?q=Moscow | Возвращает погоду для переданного города |
| /weather/coordinates  | GET | /weather/coordinates?lat= 2&lon=2 | Возвращает погоду по заданным координатам |
| /favourites | GET | /favourites | Возвращает погоду для каждого города в избранном | Возвращает погоду для каждого города в избранном |
| /favourites | POST | /favourites, с переданным телом запроса:<br>{“name”: “Moscow”} | Добавление города в список избранных |
| /favourites | DELETE | /favourites, с переданным телом запроса:<br>{“name”: “Moscow”} | Удаление города из списка избранных |
____
## Установка
1. Скачать git-репозиторий.
2. Установить Node.js.
3. В папке скачанного git-репозитория создать файл .env
4. Запослнить файл .env. `Выделенные` слова это ключи для env файла. 
  1. Зарегестрироваться на [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) и получить там ключ (`KEY`)
  2. Зарегестрироваться на [MongoDB](https://account.mongodb.com/account/login), пройдите по гайду что бы создать нового пользователя (`DB_USER`) и задать для него пароль(`DB_PSWD`) настроить IP для подключения (рекомендую разрешить подключение с любого IP), создать БД(`DB_NAME`) и коллекцию(`DB_COLLECTION`). Так же необходимо нажать кнопку connect -> Connect your application и выяснить полное название Вашего кластера (`DB_CLUSTER`). Вот примерно такой: cluster21.2bkom.mongodb.net
  3. Дописать: LANG="en" UNITS="metric"
5. С посощью командной строки перейти в папку со скачанным репозиторием.
  1. Выполнить команду `npm init`
  2. Установить все зависимости из файла package.json (В package-json найти список dependency, и для каждого эллемента списка выполнить `npm i ЭЛЕМЕНТ_СПИСКА`
  3. После установки выполнить `npm start`
6. Перейти на `localhost:3000/favourites`.
