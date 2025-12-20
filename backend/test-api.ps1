# PowerShell script de test pour l'API Adhhak Booking
# Usage: .\test-api.ps1 [local|production]

param(
    [string]$Environment = "production"
)

if ($Environment -eq "local") {
    $URL = "http://localhost:3001"
} else {
    $URL = "https://adhhak.onrender.com"
}

Write-Host "🧪 Testing Adhhak Booking API" -ForegroundColor Cyan
Write-Host "📍 URL: $URL" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1️⃣ Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$URL/health" -Method Get -ContentType "application/json"
    Write-Host "✅ Success:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Create Valid Booking
Write-Host "2️⃣ Testing Create Booking (Valid)..." -ForegroundColor Yellow
$futureDate = (Get-Date).AddDays(3).ToString("yyyy-MM-dd")
$body = @{
    date = $futureDate
    time = "14:30"
    name = "Test User"
    email = "test@example.com"
    phone = "+21612345678"
    message = "Test de réservation via API"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$URL/api/bookings" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ Success:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    $_.ErrorDetails.Message | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
Write-Host ""

# Test 3: Invalid Booking (should fail)
Write-Host "3️⃣ Testing Create Booking (Invalid - should fail)..." -ForegroundColor Yellow
$invalidBody = @{
    date = "2023-01-01"
    time = "25:00"
    name = "A"
    email = "invalid-email"
    phone = "123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$URL/api/bookings" -Method Post -Body $invalidBody -ContentType "application/json"
    Write-Host "⚠️ Unexpected success:" -ForegroundColor Yellow
    $response | ConvertTo-Json
} catch {
    Write-Host "✅ Expected error (validation):" -ForegroundColor Green
    $_.ErrorDetails.Message | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
Write-Host ""

Write-Host "✅ Tests completed!" -ForegroundColor Green

