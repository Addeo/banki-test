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
        <p class="footer__contact">
          <img class="footer__icon" :src="addressIcon" width="18" height="18" alt="" />
          <span>г. Санкт-Петербург, ул. Ефимова, 3</span>
        </p>
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
  padding: 36px 0;
  margin-top: auto;

  &__inner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
  }

  &__menu {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 30px;
  }

  &__link {
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    color: $font-dark;
    transition: color 0.2s ease;

    &:hover,
    &.router-link-exact-active {
      color: $primary-hover;
    }
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-end;
  }

  &__contact {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    color: $font-dark;
  }

  &__icon {
    width: 18px;
    height: 18px;
    object-fit: contain;
    flex-shrink: 0;
  }
}

@media (max-width: 800px) {
  .footer {
    &__inner {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    &__menu {
      justify-content: center;
    }

    &__contacts {
      align-items: center;
    }
  }
}
</style>
