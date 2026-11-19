#!/usr/bin/env bash
# ==========================================================
# JavaVerse 3D — Automated Server Deployment Script
# Supports: Ubuntu, Debian, CentOS, AlmaLinux, RockyLinux
# ==========================================================

set -e

echo "🌌 ============================================"
echo "   JavaVerse 3D — Установка и запуск на сервере"
echo "================================================"

# 1. Проверка root / sudo
if [ "$EUID" -ne 0 ]; then
  SUDO="sudo"
else
  SUDO=""
fi

# 2. Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "📦 Node.js не найден. Устанавливаем Node.js 22 LTS..."
    if command -v apt-get &> /dev/null; then
        $SUDO apt-get update -y
        $SUDO apt-get install -y curl
        curl -fsSL https://deb.nodesource.com/setup_22.x | $SUDO bash -
        $SUDO apt-get install -y nodejs
    elif command -v yum &> /dev/null; then
        curl -fsSL https://rpm.nodesource.com/setup_22.x | $SUDO bash -
        $SUDO yum install -y nodejs
    fi
    echo "✅ Node.js $(node -v) успешно установлен!"
else
    echo "✅ Node.js уже установлен: $(node -v)"
fi

# 3. Установка зависимостей проекта
echo "📦 Установка зависимостей..."
npm install --omit=dev

# 4. Проверка PM2
if command -v pm2 &> /dev/null; then
    echo "🚀 Запуск через PM2..."
    pm2 delete javaverse-3d 2>/dev/null || true
    pm2 start server.js --name "javaverse-3d"
    pm2 save
    echo "✅ Приложение запущено в PM2!"
    pm2 status
else
    # Предложить установить PM2 или запустить в фоне через nohup
    echo "💡 PM2 не найден. Устанавливаем PM2 глобально..."
    $SUDO npm install -g pm2
    pm2 delete javaverse-3d 2>/dev/null || true
    pm2 start server.js --name "javaverse-3d"
    pm2 save
    pm2 startup || true
    echo "✅ Приложение запущено в PM2!"
    pm2 status
fi

echo ""
echo "🎉 ============================================"
echo "   Установка успешно завершена!"
echo "   Сайт работает на: http://localhost:3000"
echo "   (или http://IP-ВАШЕГО-СЕРВЕРА:3000)"
echo "================================================"
