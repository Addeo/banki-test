<template>
  <header class="header">
    <div class="container header__inner">
      <nav class="header__nav" aria-label="Основная навигация">
        <ul class="header__menu">
          <li v-for="link in links" :key="link.href">
            <a class="header__link" :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <form class="search" @submit.prevent="submit">
        <input
          class="search__input"
          type="search"
          :value="searchQuery"
          placeholder="Поиск по названию картины"
          aria-label="Поиск по названию картины"
          @input="onInput"
        />
        <button class="search__button" type="submit">Найти</button>
      </form>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { NAV_LINKS } from '@/data/products';

export default Vue.extend({
  name: 'AppHeader',
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      links: NAV_LINKS,
    };
  },
  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit('search', target.value);
    },
    submit() {
      this.$emit('search', this.searchQuery);
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  background: $bg;
  border-bottom: 1px solid rgba($primary, 0.08);
  padding: 28px 0;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  &__menu {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 30px;
  }

  &__link {
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    color: $font-dark;
    transition: color 0.2s ease;

    &:hover {
      color: $primary-hover;
    }
  }
}

.search {
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  max-width: 420px;
  width: 100%;

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
    padding: 0 28px;
    background: $primary;
    color: $font-light;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    transition: background-color 0.2s ease;

    &:hover {
      background: $primary-hover;
    }

    &:disabled {
      background: $primary-disabled;
      cursor: not-allowed;
    }
  }
}

@media (max-width: 900px) {
  .header {
    &__inner {
      flex-direction: column;
      align-items: stretch;
    }

    &__menu {
      justify-content: center;
      gap: 12px 18px;
    }
  }

  .search {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 16px 0;

    &__menu {
      gap: 10px 14px;
    }

    &__link {
      font-size: 13px;
    }
  }

  .search {
    &__input,
    &__button {
      height: 44px;
    }

    &__button {
      padding: 0 18px;
    }
  }
}
</style>
