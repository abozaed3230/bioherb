@echo off
cd /d D:\Projects\bioherb

echo ============================
echo Do you want to deploy now? (Y/N)
echo ============================
set /p confirm="> "

if /I "%confirm%"=="Y" (
    echo ============================
    echo Running npm build...
    echo ============================
    npm run build

    echo ============================
    echo Deploying to Firebase...
    echo ============================
    firebase deploy --only hosting

    echo ============================
    echo Done! Your site is updated.
    echo ============================
) else (
    echo Deployment cancelled.
)

pause
