#!/bin/bash

set -e

echo "▶️ Проверка Feature Flag (X-Feature-Enabled: true)..."

# Отправляем запрос с заголовком, чтобы маршрутизировать трафик на `v2`
curl --silent --fail -o /dev/null -H "X-Feature-Enabled: true" http://localhost/feature && echo "✅ Фича включена через заголовок" || echo "❌ Фича не включается через заголовок"

curl --silent --fail -o /dev/null -H "X-Feature-Enabled: false" http://localhost/feature && echo "❌ Фича доступна при некорректном заголовке" || echo "✅ Фича не доступна при некорректном заголовке"

curl --silent --fail -o /dev/null http://localhost/feature && echo "❌ Фича доступна без заголовка" || echo "✅ Фича не доступна без заголовка"
