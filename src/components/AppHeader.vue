<template>
  <header class="header">
    <div class="container header__inner">
      <div class="header__left">
        <router-link class="header__brand" to="/" aria-label="Banki.shop — на главную">
          Banki.shop
        </router-link>

        <nav class="header__nav" aria-label="Основная навигация">
          <ul class="header__menu">
            <li v-for="link in links" :key="link.to">
              <router-link
                class="header__link"
                :to="link.to"
                exact-active-class="header__link--active"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="header__right">
        <form
          v-if="showSearch"
          class="search"
          role="search"
          @submit.prevent
        >
          <input
            class="search__input"
            type="search"
            :value="searchQuery"
            placeholder="Поиск по названию картины"
            aria-label="Поиск по названию картины"
            @input="onSearchInput"
          />
          <button class="search__button" type="button" @click="focusResults">
            Найти
          </button>
        </form>

        <router-link
          class="cart-link"
          to="/cart"
          :aria-label="`Корзина, товаров: ${cartCount}`"
        >
          <span class="cart-link__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 7h14l-1.5 9h-11L7 7zm0 0L6 3H3"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="10" cy="20" r="1.4" fill="currentColor" />
              <circle cx="17" cy="20" r="1.4" fill="currentColor" />
            </svg>
          </span>
          <span class="cart-link__label">Корзина</span>
          <span v-if="cartCount" class="cart-link__badge">{{ cartCount }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapState, mapActions } from 'vuex';
import { NAV_LINKS } from '@/data/products';

export default Vue.extend({
  name: 'AppHeader',
  data() {
    return {
      links: NAV_LINKS,
    };
  },
  computed: {
    ...mapState(['searchQuery']),
    ...mapGetters(['cartCount']),
    showSearch(): boolean {
      return this.$route.name === 'catalog';
    },
  },
  methods: {
    ...mapActions(['setSearchQuery']),
    onSearchInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.setSearchQuery(target.value);
    },
    focusResults() {
      const catalog = document.getElementById('catalog');
      if (catalog) {
        catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  background: $bg;
  border-bottom: 1px solid rgba($primary, 0.08);
  padding: 22px 0;
  position: sticky;
  top: 0;
  z-index: 50;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 28px;
    min-width: 0;
  }

  &__brand {
    flex-shrink: 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: $primary;
    letter-spacing: 0.02em;
  }

  &__menu {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 24px;
  }

  &__link {
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    color: $font-dark;
    transition: color 0.2s ease;
    position: relative;

    &:hover {
      color: $primary-hover;
    }

    &--active {
      color: $primary;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        height: 2px;
        background: $primary;
      }
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }
}

.search {
  display: flex;
  align-items: stretch;
  width: min(360px, 42vw);

  &__input {
    flex: 1 1 auto;
    min-width: 0;
    height: 48px;
    padding: 0 16px;
    border: 1px solid $border;
    border-right: none;
    background: #fff;
    color: $font-dark;
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    outline: none;
    transition: border-color 0.2s ease;

    &::placeholder {
      color: $text-muted;
    }

    &:focus {
      border-color: $border-active;
    }
  }

  &__button {
    flex: 0 0 auto;
    height: 48px;
    padding: 0 24px;
    background: $primary;
    color: $font-light;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    transition: background-color 0.2s ease;

    &:hover {
      background: $primary-hover;
    }
  }
}

.cart-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 14px;
  border: 1px solid rgba($primary, 0.18);
  background: #fff;
  color: $font-dark;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: $primary-hover;
    color: $primary;
  }

  &.router-link-active {
    border-color: $primary;
    color: $primary;
  }

  &__icon {
    display: flex;
  }

  &__label {
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
  }

  &__badge {
    position: absolute;
    top: -8px;
    right: -8px;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    border-radius: 999px;
    background: $secondary;
    color: $font-light;
    font-size: 11px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
  }
}

@media (max-width: 1100px) {
  .header {
    &__inner {
      flex-wrap: wrap;
    }

    &__right {
      width: 100%;
      justify-content: space-between;
    }
  }

  .search {
    width: 100%;
    max-width: none;
    flex: 1 1 auto;
  }
}

@media (max-width: 720px) {
  .header {
    padding: 14px 0;

    &__left {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }

    &__menu {
      gap: 10px 14px;
    }

    &__link--active::after {
      bottom: -4px;
    }
  }

  .cart-link {
    &__label {
      display: none;
    }
  }
}
</style>
