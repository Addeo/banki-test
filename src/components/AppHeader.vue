<template>
  <header class="header">
    <div class="container header__inner">
      <nav class="header__nav" aria-label="Основная навигация">
        <button
          class="header__burger"
          type="button"
          :class="{ 'header__burger--open': menuOpen }"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-label="Меню"
          @click="menuOpen = !menuOpen"
        >
          <span />
        </button>

        <ul class="header__menu" :class="{ 'header__menu--open': menuOpen }">
          <li v-for="link in links" :key="link.to">
            <router-link
              class="header__link"
              :to="link.to"
              exact-active-class="header__link--active"
              @click.native="menuOpen = false"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <form
          v-if="showSearch"
          class="search"
          role="search"
          @submit.prevent="focusResults"
        >
          <input
            class="search__input"
            type="search"
            :value="searchQuery"
            placeholder="Поиск по названию картины"
            aria-label="Поиск по названию картины"
            @input="onSearchInput"
          />
          <button class="search__button" type="submit">Найти</button>
        </form>

        <router-link
          class="cart-link"
          to="/cart"
          :aria-label="`Корзина, товаров: ${cartCount}`"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      menuOpen: false,
    };
  },
  computed: {
    ...mapState(['searchQuery']),
    ...mapGetters(['cartCount']),
    showSearch(): boolean {
      return this.$route.name === 'catalog';
    },
  },
  watch: {
    '$route.path'() {
      this.menuOpen = false;
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
  height: $header-height;
  border-bottom: 1px solid $border;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    gap: 20px;
  }

  &__nav {
    display: flex;
    align-items: center;
    min-width: 0;
    flex: 1 1 auto;
  }

  &__burger {
    display: none;
    width: 30px;
    height: 30px;
    position: relative;

    span,
    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 30px;
      height: 3px;
      background: $primary;
      transition: transform 0.2s ease, top 0.2s ease;
    }

    span {
      top: 13px;
    }

    &::before {
      top: 5px;
    }

    &::after {
      top: 21px;
    }

    &--open {
      span {
        opacity: 0;
      }

      &::before {
        top: 13px;
        transform: rotate(45deg);
      }

      &::after {
        top: 13px;
        transform: rotate(-45deg);
      }
    }
  }

  &__menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: min(560px, 100%);
    gap: 12px;
  }

  &__link {
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    color: $font-dark;
    white-space: nowrap;
    transition: color 0.2s ease;

    &:hover,
    &--active {
      color: $primary-hover;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }
}

.search {
  display: flex;
  align-items: stretch;

  &__input {
    width: 280px;
    max-width: 42vw;
    height: 45px;
    padding: 0 13px;
    border: 1px solid $border;
    border-right: none;
    background: transparent;
    color: $font-dark;
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    outline: none;

    &::placeholder {
      color: $text-muted;
    }

    &:focus {
      border-color: $border-active;
    }
  }

  &__button {
    height: 45px;
    padding: 0 36px;
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
  justify-content: center;
  width: 40px;
  height: 40px;
  color: $primary;
  transition: color 0.2s ease;

  &:hover,
  &.router-link-active {
    color: $primary-hover;
  }

  &__badge {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    border-radius: 999px;
    background: $secondary;
    color: $font-light;
    font-size: 11px;
    font-weight: 700;
    line-height: 18px;
    text-align: center;
  }
}

@media (max-width: 980px) {
  .header {
    &__burger {
      display: block;
      margin-right: 12px;
    }

    &__menu {
      display: none;
      position: absolute;
      top: $header-height;
      left: 0;
      right: 0;
      z-index: 40;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      padding: 8px 20px 16px;
      background: $bg;
      border-bottom: 1px solid $border;

      &--open {
        display: flex;
      }

      li {
        width: 100%;
        padding: 10px 0;
      }
    }
  }
}

@media (max-width: 680px) {
  .search {
    &__input {
      width: 140px;
      max-width: 36vw;
    }

    &__button {
      padding: 0 16px;
    }
  }
}

@media (max-width: 420px) {
  .header {
    height: auto;
    min-height: $header-height;
    padding: 12px 0;
  }

  .header__inner {
    flex-wrap: wrap;
  }

  .header__actions {
    width: 100%;
    justify-content: space-between;
  }

  .search {
    flex: 1 1 auto;

    &__input {
      width: auto;
      max-width: none;
      flex: 1 1 auto;
    }
  }
}
</style>
