# 🚀 Инструкция по Установке JavaVerse 3D на Сервер

Подробное руководство по развёртыванию сайта на любом Linux-сервере (Ubuntu, Debian, CentOS, AlmaLinux, RockyLinux).

---

## ⚡ Быстрый старт (в 1 команду)

Подключитесь к вашему серверу по SSH и выполните:

```bash
git clone https://github.com/FsbAidol/VibeCode.git javaverse-3d
cd javaverse-3d
chmod +x deploy.sh
./deploy.sh
```

Скрипт автоматически:
1. Проверит наличие Node.js (если нет — установит актуальную Node.js 22 LTS).
2. Установит зависимости проекта (`npm install`).
3. Настроит менеджер процессов **PM2** и запустит сайт в фоне с автозапуском при перезагрузке сервера!
4. Сайт станет доступен на порту `3000`: `http://IP_СЕРВЕРА:3000`.

---

## 🛠️ Способ 1: Ручная установка через Node.js + PM2 (Рекомендуется)

### Шаг 1: Клонирование репозитория
```bash
git clone https://github.com/FsbAidol/VibeCode.git javaverse-3d
cd javaverse-3d
```

### Шаг 2: Установка зависимостей
```bash
npm install
```

### Шаг 3: Проверка запуска
```bash
npm start
```
*Нажмите `Ctrl + C` для остановки.*

### Шаг 4: Запуск в фоне через PM2 (с автоперезагрузкой)
```bash
# Установка PM2 глобально
npm install -g pm2

# Запуск приложения
pm2 start server.js --name "javaverse-3d"

# Сохранение списка процессов и настройка автозапуска при перезагрузке ОС
pm2 save
pm2 startup
```

**Полезные команды PM2:**
```bash
pm2 status             # Проверить статус процесса
pm2 logs javaverse-3d  # Посмотреть логи
pm2 restart javaverse-3d # Перезапустить
pm2 stop javaverse-3d    # Остановить
```

---

## 🐳 Способ 2: Запуск в Docker / Docker Compose

Если на сервере установлен Docker:

```bash
git clone https://github.com/FsbAidol/VibeCode.git javaverse-3d
cd javaverse-3d

# Запуск через Docker Compose в фоновом режиме
docker compose up -d --build
```

Проверить статус контейнера:
```bash
docker compose ps
docker compose logs -f
```

Остановить:
```bash
docker compose down
```

---

## ⚙️ Способ 3: Запуск через системный демон (Systemd)

Если вы предпочитаете нативный systemd без сторонних менеджеров:

1. Скопируйте проект в `/var/www/javaverse-3d`:
```bash
sudo cp -r . /var/www/javaverse-3d
sudo chown -R www-data:www-data /var/www/javaverse-3d
```

2. Скопируйте unit-файл службы:
```bash
sudo cp javaverse.service /etc/systemd/system/
sudo systemctl daemon-reload
```

3. Активируйте и запустите:
```bash
sudo systemctl enable javaverse
sudo systemctl start javaverse
```

4. Проверить статус:
```bash
sudo systemctl status javaverse
```

---

## 🌐 Настройка Nginx и бесплатного SSL (HTTPS)

Чтобы сайт открывался по домену на стандартном порту 80/443 (HTTPS):

1. Установите Nginx:
```bash
sudo apt update
sudo apt install nginx -y
```

2. Создайте конфиг сайта `/etc/nginx/sites-available/javaverse.conf`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com; # Укажите ваш домен или IP

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

3. Активируйте конфиг и перезапустите Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/javaverse.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. Выпуск бесплатного SSL-сертификата Let's Encrypt (Certbot):
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 🔒 Настройка Файрвола (UFW)

Если порт 3000 или 80/443 закрыт на сервере:

```bash
# Разрешить SSH, HTTP, HTTPS и порт 3000
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw enable
```

---

## ☕ Готово!
Сайт **JavaVerse 3D** успешно работает на вашем сервере!
