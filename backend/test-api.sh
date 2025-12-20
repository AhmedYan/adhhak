#!/bin/bash

# Script de test pour l'API Adhhak Booking
# Usage: ./test-api.sh [local|production]

BASE_URL=${1:-production}

if [ "$BASE_URL" = "local" ]; then
  URL="http://localhost:3001"
else
  URL="https://adhhak.onrender.com"
fi

echo "🧪 Testing Adhhak Booking API"
echo "📍 URL: $URL"
echo ""

# Test 1: Health Check
echo "1️⃣ Testing Health Check..."
curl -X GET "$URL/health" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"
echo ""

# Test 2: Create Valid Booking
echo "2️⃣ Testing Create Booking (Valid)..."
curl -X POST "$URL/api/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "'$(date -d "+3 days" +%Y-%m-%d)'",
    "time": "14:30",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+21612345678",
    "message": "Test de réservation via API"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"
echo ""

# Test 3: Invalid Booking (should fail)
echo "3️⃣ Testing Create Booking (Invalid - should fail)..."
curl -X POST "$URL/api/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2023-01-01",
    "time": "25:00",
    "name": "A",
    "email": "invalid-email",
    "phone": "123"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"
echo ""

echo "✅ Tests completed!"

