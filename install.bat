@echo off

:: Check if Git is installed
where /q git.exe
if %errorlevel% equ 0 (
    :: Git is installed
    for /f "tokens=*" %%i in ('git --version') do set "gitVersion=%%i"
    echo Git is installed on this system.
    echo Version: %gitVersion%
) else (
    :: Git is not installed
    echo Git is not installed on this system.
    goto :terminate
)

echo.

:: Check if Node.js is installed
where /q node.exe
if %errorlevel% equ 0 (
    :: Node.js is installed
    for /f "tokens=*" %%i in ('node --version') do set "nodeVersion=%%i"
    echo Node.js is installed on this system.
    echo Version: %nodeVersion%
) else (
    :: Node.js is not installed
    echo Node.js is not installed on this system.
    goto :terminate
)

echo.

:: Check if NestJS CLI is installed
where /q nest
if %errorlevel% equ 0 (
    :: NestJS CLI is installed
    echo NestJS CLI is installed on this system.
) else (
    :: NestJS CLI is not installed
    echo NestJS CLI is not installed on this system. Installing...
    call npm i -g @nestjs/cli
    if %errorlevel% neq 0 (
        echo Failed to install NestJS CLI.
        goto :terminate
    )
    echo NestJS CLI installed successfully.
)

echo.

:: Clone Git repository
set "repoUrl=https://github.com/dhirajkalwar/Online-Voting-System.git"
git clone %repoUrl%
if %errorlevel% neq 0 (
    echo Failed to clone Git repository.
    goto :terminate
)

echo.

:: Install frontend dependencies
cd Online-Voting-System\frontend
call npm i
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies.
    goto :terminate
)

:: Run frontend development server
start cmd.exe /k "npm run dev"

echo.

:: Install backend dependencies
cd ..\backend
call npm i
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies.
    goto :terminate
)

:: Run backend development server
call npm run start:dev

goto :end

:terminate
echo One or more required dependencies are missing or an error occurred. Terminating the process.
pause
exit

:end
echo Press any key to exit...
pause
exit