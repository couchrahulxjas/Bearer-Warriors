# Start Warriors App - Frontend + Backend
Write-Host "🚀 Starting Warriors App (Frontend + Backend)" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Start Backend in new window
Write-Host "Starting Backend Server on port 5000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-Command cd '$PSScriptRoot\backend' ; npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start Frontend in new window
Write-Host "Starting Frontend Server on port 5173..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-Command cd '$PSScriptRoot' ; npm run dev"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ Both servers starting!" -ForegroundColor Green
Write-Host "" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Blue
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host "" -ForegroundColor Cyan
Write-Host "Press Ctrl+C in each window to stop servers" -ForegroundColor Yellow
