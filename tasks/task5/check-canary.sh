#!/bin/bash

set -e

echo "▶️ Checking canary release (90% v1, 10% v2)..."

v1_count=0
v2_count=0

# Посылаем 500 запросов
for i in {1..500}
do
    resp=$(curl -s http://localhost/ping)

    if [[ $resp == *"v1"* ]]; then
        v1_count=$((v1_count + 1))
    elif [[ $resp == *"v2"* ]]; then
        v2_count=$((v2_count + 1))
    fi

    if ((i % 100 == 0)); then
        echo "▶️ $(($i * 100 / 500)) % complete"
    fi
done

p1=$((v1_count * 100 / 500))
p2=$((v2_count * 100 / 500))

# Погрешность +/- 5%

if [[ $p1 -gt 85 ]] && [[ $p1 -lt 95 ]]; then
    echo "✅ v1: $v1_count ($p1%)"
else
    echo "❌ v1: $v1_count ($p1%)"
fi

if [[ $p2 -gt 5 ]] && [[ $p2 -lt 15 ]]; then
    echo "✅ v2: $v2_count ($p2%)"
else
    echo "❌ v2: $v2_count ($p2%)"
fi