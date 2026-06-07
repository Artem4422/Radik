# JUGGLER SHOW — сайт

React + Vite. Статический сайт для обычного хостинга (Apache/nginx).

## Быстрый деплой для заказчика

```bash
npm install
npm run build
```

Залить **содержимое папки `dist/`** в корень сайта на хостинге (`public_html`, `www`).

На Apache файл `.htaccess` уже в `public/` и попадёт в `dist/` при сборке.

## Медиа (видео и PDF)

В репозитории **нет** папок `public/uploads/videos/` и `public/uploads/pdf/` — файлы больше лимита GitHub.

Перед сборкой скопируйте их с рабочего хостинга или из папки `MEDIA` в:

```
public/uploads/videos/
public/uploads/pdf/
```

Структура описана в `public/uploads/README.md`.

## Локальная разработка

```bash
npm install
npm run dev
```

Сайт: http://127.0.0.1:5173/

## Страницы

| URL | Раздел |
|-----|--------|
| `/` | О нас |
| `/show` | Шоу |
| `/gallery` | Галерея |
| `/video` | Видео |
| `/partners` | Партнёрам |
| `/contact` | Связь с нами |
| `/event` | События |
| `/poster` | Афиша |
| `/ticket` | Билеты |
