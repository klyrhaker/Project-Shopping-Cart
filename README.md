# Klyrh Shop 🛒

Учебный проект интернет-магазина с корзиной покупок, реализованный в рамках курса [The Odin Project](https://www.theodinproject.com/).

**🔗 Демо:** [project-shopping-cart-ashy.vercel.app](https://project-shopping-cart-ashy.vercel.app)

---

## О проекте

Klyrh Shop — одностраничное приложение (SPA) со списком товаров, корзиной, оформлением заказа и переключением светлой/тёмной темы. Проект разработан в строгом TDD-подходе: каждая фича сначала покрывается падающим тестом, затем реализуется код, который делает тест зелёным.

## Технологии

- **React 18** + **Vite**
- **React Router v7** (data router API — `createBrowserRouter`)
- **Vitest** + **React Testing Library** — модульное и интеграционное тестирование
- **CSS Modules** — изолированная стилизация компонентов
- **CSS Custom Properties** — светлая/тёмная тема
- **lucide-react** — иконки
- **Vercel** — деплой

## Функциональность

- 📦 Список товаров с загрузкой из [Fake Store API](https://fakestoreapi.com/)
- 🛒 Добавление/удаление товаров в корзину, изменение количества
- 💰 Автоматический подсчёт суммы и количества товаров в корзине
- ✅ Оформление заказа с уведомлением (Toast) об успешном оформлении
- 🌗 Переключение светлой/тёмной темы с сохранением выбора между сессиями
- ⚠️ Обработка ошибок загрузки данных и несуществующих маршрутов (404)
- 💀 Skeleton-заглушки во время загрузки данных
- ♿ Внимание к доступности: `aria-label`, `role="alert"`, `role="status"`, семантическая разметка

## Установка и запуск

```bash
git clone https://github.com/klyrhaker/Project-Shopping-Cart.git
cd Project-Shopping-Cart
npm install
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`.

## Тестирование

```bash
npm run test        # разовый прогон всех тестов
npm run test:watch  # тесты в watch-режиме
npm run test:ui     # тесты с UI-интерфейсом Vitest
```

## Сборка для продакшена

```bash
npm run build
npm run preview
```

## Структура проекта

```
src/
  components/     # переиспользуемые компоненты (Button, Navbar, Footer, Toast, ProductCard...)
  hooks/          # кастомные хуки (useCart, useProducts, useTheme, useLocalStorage)
  pages/          # компоненты страниц (HomePage, Shop, CartPage)
  services/       # слой работы с API (productService)
  utils/          # вспомогательные функции (cartUtils)
  test-utils/     # утилиты для тестирования
  constants/      # константы (URL API и т.д.)
```

## Автор

[klyrhaker](https://github.com/klyrhaker)
