docker build -t hotelio-tester .
docker run --rm \
  -e DB_HOST=monolith-db \
  -e DB_PORT=5432 \
  -e DB_NAME=hotelio \
  -e DB_USER=hotelio \
  -e DB_PASSWORD=hotelio \
  -e BOOKING_DB_HOST=booking-db \
  -e BOOKING_DB_PORT=5432 \
  -e BOOKING_DB_NAME=hotelio-booking \
  -e BOOKING_DB_USER=hotelio \
  -e BOOKING_DB_PASSWORD=hotelio \
  -e API_URL=http://monolith:8080 \
  --network hotelio-net \
  hotelio-tester