@echo off
echo 🚀 Starting Career Pathfinder Application...
echo.

echo 🔧 Starting Flask backend...
start "Backend Server" cmd /k "cd backend && python main.py"

echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo 🔧 Starting React frontend...
start "Frontend Server" cmd /k "npm start"

echo ⏳ Waiting for frontend to start...
timeout /t 5 /nobreak > nul

echo.
echo 🎉 Application should now be running!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo.
echo 💡 To test the API, run: cd backend && python test_api.py
echo.
pause 