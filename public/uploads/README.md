# Медиафайлы сайта

Скопируйте папку `uploads` с рабочего старого сайта (или с хостинга) сюда:

```
public/uploads/
  img-webp/     — фото галереи, фоны, постеры
  videos/       — фоновые и промо-ролики
  afish/        — афиши
  pdf/          — PDF для партнёров
  pdf-images/   — превью страниц PDF (webp)
  gallery-bg.mp4
```

Пути в React-приложении совпадают со старым сайтом (`/uploads/...`).

Генерация превью PDF (как в старом проекте):

```bash
cd "../СТАРЫЙ САЙТ"
npm install
node generate-pdf-images.mjs
# затем скопируйте uploads/pdf-images в public/uploads/pdf-images
```
