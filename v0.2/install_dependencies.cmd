@echo off
echo Installing dependencies for Mini Chat v0.2...

:: Main dependencies
npm install express socket.io mongoose dotenv

:: Dev dependencies
npm install --save-dev nodemon

echo ✅ All dependencies installed successfully!
pause

