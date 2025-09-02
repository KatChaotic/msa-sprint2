#!/bin/bash

set -e

echo "▶️ Scaling replicas to 0..."
kubectl scale --replicas=0 deployment/booking-service-v1

echo "▶️ Testing fallback route..."

success_count=0
failed_count=0

for i in {1..20}
do
    status_code=$(curl -o /dev/null -s -w "%{http_code}\n" http://localhost/ping)

    sleep 2

    if [[ $status_code == "200" ]]; then
        success_count=$((success_count + 1))
    else
        failed_count=$((failed_count + 1))
    fi
done

if [[ $failed_count == 0 ]]; then
    echo "✅ Success (Failed requests: 0 / 20)"
else
    echo "❌ Failed (Failed requests: $failed_count / 20)"
fi

echo "▶️ Scaling replicas to 1 back"
kubectl scale --replicas=1 deployment/booking-service-v1

echo "🏁 Done!"