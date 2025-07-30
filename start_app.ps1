# Career Pathfinder Startup Script
Write-Host "🚀 Starting Career Pathfinder Application..." -ForegroundColor Green

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Check if backend is running
if (Test-Port 5000) {
    Write-Host "✅ Backend is already running on port 5000" -ForegroundColor Green
} else {
    Write-Host "🔧 Starting Flask backend..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python app.py"
    Start-Sleep -Seconds 3
}

# Check if frontend is running
if (Test-Port 3000) {
    Write-Host "✅ Frontend is already running on port 3000" -ForegroundColor Green
} else {
    Write-Host "🔧 Starting React frontend..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
    Start-Sleep -Seconds 3
}

Write-Host ""
Write-Host "🎉 Application should now be running!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Available API Endpoints:" -ForegroundColor Yellow
Write-Host "   • Health Check: http://localhost:5000/api/health" -ForegroundColor White
Write-Host "   • All Careers: http://localhost:5000/api/careers" -ForegroundColor White
Write-Host "   • Career Details: http://localhost:5000/api/career/[career_name]" -ForegroundColor White
Write-Host "   • Recommendations: POST http://localhost:5000/api/recommend" -ForegroundColor White
Write-Host ""
Write-Host "💡 To test the API, run: cd backend; python test_api.py" -ForegroundColor Magenta 