1. Переработан Helm Chart для двойного деплоя приложения в двух версиях в рамках одного сервиса
2. Доработан gitlab-ci для загрузки и использования всегда актуального и свежего образа (при запущенных подах нельзя заменить образ на новый с той же меткой)
3. Доработан код приложения, чтобы он выдавал разные сообщения в /ping в зависимости от версии, для тестирования canary роутинга
4. Написаны правила роутинга для istio
5. Написан Envoy Filter для фильтрации трафика в зависимости от заголовка
6. Доработаны тесты
    - ./check-feature.sh
        - Добавлены тест кейсы для всех случаев
    - ./check-canary.sh
        - Увеличено число запросов со 100 до 500
        - Добавлен подсчет используемых версий на основе ответа сервиса
        - Проверка распределения 90/10% с учетом погрешности +/- 5%
    - ./check-fallback.sh
        - Добавлен цикл из ряда запросов и проверка, что ни один запрос не упал
        - Добавлено автоматическое погашение и запуск пода v1 сервиса

```bash
# Запуск среды
minikube start

# Настройка среды
./install-istio.sh
# Первичная установка сервиса
helm install booking-service ./helm/booking-service -f ./helm/booking-service/values-v1.yaml -f ./helm/booking-service/values-v2.yaml

# Проверка gitlab ci
gitlab-ci-local

# Настройка istio
kubectl apply -f ./istio/virtual-service.yaml
kubectl apply -f ./istio/destination-rule.yaml
kubectl apply -f ./istio/feature-header-filter.yaml

# В отдельной консоли нужно запустить туннелирование трафика
minikube tunnel

# Остальные тесты
./check-istio.sh
./check-feature-flag.sh
./check-canary.sh
./check-fallback.sh
```