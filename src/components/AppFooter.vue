<template>
  <footer class="footer">
    <div class="container footer__inner">
      <nav class="footer__nav" aria-label="Навигация в подвале">
        <ul class="footer__menu">
          <li v-for="link in links" :key="link.to">
            <router-link class="footer__link" :to="link.to">
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="footer__contacts">
        <a class="footer__contact" href="tel:+78125555555">
          <img class="footer__icon" :src="telIcon" width="18" height="18" alt="" />
          <span>+7 (812) 555-55-55</span>
        </a>
        <a
          class="footer__contact"
          href="https://yandex.ru/maps/-/CDu~QK~c"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img class="footer__icon" :src="addressIcon" width="18" height="18" alt="" />
          <span>г. Санкт-Петербург, ул. Ефимова, 3</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { NAV_LINKS } from '@/data/products';
import telIcon from '@/assets/images/tel.png';
import addressIcon from '@/assets/images/address.png';

export default Vue.extend({
  name: 'AppFooter',
  data() {
    return {
      links: NAV_LINKS,
      telIcon,
      addressIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
.footer {
  background: $footer-bg;
  margin-top: auto;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    min-height: 95px;
  }

  &__nav {
    flex: 1 1 auto;
    max-width: 560px;
  }

  &__menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    &.router-link-exact-active {
      color: $primary-hover;
    }
  }

  &__contacts {
    display: flex;
    align-items: center;
    gap: 28px;
    flex-shrink: 0;
  }

  &__contact {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    color: $font-dark;
    text-decoration: none;

    &:hover {
      color: $primary-hover;
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    object-fit: contain;
    flex-shrink: 0;
  }
}

@media (max-width: 1020px) {
  .footer {
    &__inner {
      flex-direction: column;
      align-items: center;
      padding-top: 24px;
      padding-bottom: 24px;
      text-align: center;
    }

    &__nav {
      max-width: none;
      width: 100%;
    }

    &__menu {
      justify-content: center;
      flex-wrap: wrap;
    }

    &__contacts {
      flex-direction: column;
      gap: 12px;
    }
  }
}

@media (max-width: 530px) {
  .footer {
    &__menu {
      flex-direction: column;
      gap: 10px;
    }
  }
}
</style>
