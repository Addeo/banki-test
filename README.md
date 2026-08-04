# Banki.shop — тестовое задание

Интернет-магазин картин эпохи Возрождения на **Vue 2 (Options API) + TypeScript + Vuex + Vue Router + Webpack**.

- Макет: [Figma — Banki.shop](https://www.figma.com/file/6LxPDEsauEGanhR2nDW68X/Banki.shop?node-id=0%3A1)
- **Демо:** https://addeo.github.io/banki-test/

## Стек

- Vue 2.7 (Options API)
- TypeScript
- Vuex 3 — состояние корзины и каталога
- Vue Router 3 — страницы приложения
- SCSS + UI kit из макета (Merriweather, цвета кнопок/инпутов)
- Webpack 5
- Node.js **16** (`.nvmrc`)

## Страницы

| Путь | Описание |
|------|----------|
| `/` | Каталог с поиском и карточками |
| `/cart` | Корзина: список, сумма, удаление, оформление |
| `/delivery` | Доставка |
| `/payment` | Оплата |
| `/contacts` | Контакты |
| `/about` | О компании |

## Функциональность по ТЗ

1. **Поиск** — фильтрация карточек по названию / автору
2. **Кнопка «Купить»** — `Купить` → `Обрабатывается` (2 сек) → `В корзине`
3. **Persist** — состав корзины в `localStorage`
4. **Модалка** — описание, цена, слайдер 2–4 фото

Дополнительно: бейдж корзины, toast, empty states, адаптив до 360px.

## Архитектура

```
src/
  views/         # страницы (router)
  components/    # UI-компоненты
  store/         # Vuex: корзина, поиск, модалка
  router/        # маршруты
  data/          # каталог товаров
  types/         # общие типы
  styles/        # токены UI kit
  utils/         # localStorage
```

## Установка и запуск

```bash
nvm use          # Node 16
npm install
npm run dev      # http://localhost:8080
```

## Сборка

```bash
npm run build
```

Готовый билд — в `dist/`.

Для GitHub Pages:

```bash
PUBLIC_PATH=/banki-test/ npm run build
```
