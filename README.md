# Banki.shop — тестовое задание

Интернет-магазин картин эпохи Возрождения на **Vue 2 (Options API) + TypeScript + Webpack**.

Макет: [Figma — Banki.shop](https://www.figma.com/file/6LxPDEsauEGanhR2nDW68X/Banki.shop?node-id=0%3A1)

## Стек

- Vue 2.7 (Options API)
- TypeScript
- SCSS
- Webpack 5
- Node.js **16** (см. `.nvmrc`)

## Функциональность

1. **Поиск** — фильтрация карточек по названию / автору в реальном времени
2. **Кнопка «Купить»** — состояния: `Купить` → `Обрабатывается` (2 сек + preloader) → `В корзине`
3. **Persist корзины** — состояние позиций сохраняется в `localStorage` и восстанавливается после перезагрузки
4. **Модальное окно** — по клику на изображение или название: описание, цена, слайдер из 2–4 фото

## Требования

- Node.js 16.x (`nvm use` подхватит версию из `.nvmrc`)
- npm 8+

## Установка и запуск

```bash
nvm use
npm install
npm run dev
```

Приложение откроется на [http://localhost:8080](http://localhost:8080).

## Сборка

```bash
npm run build
```

Готовый билд — в папке `dist/`.

## Структура

```
src/
  components/   # Header, Footer, Card, BuyButton, Modal, Slider
  data/         # Каталог товаров
  styles/       # Токены и глобальные стили (UI kit из макета)
  utils/        # localStorage для корзины
  types/        # Общие типы
```

## Адаптив

Десктопная вёрстка по макету, респонсив до **360px**.
