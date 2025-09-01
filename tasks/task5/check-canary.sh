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
done

echo "✅ v1: $v1_count ($((v1_count * 100 / 500))%)"
echo "✅ v2: $v2_count ($((v2_count * 100 / 500))%)"