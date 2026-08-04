<template>
  <section class="page">
    <div class="container">
      <div class="page__head">
        <h1 class="page__title">Корзина</h1>
        <p v-if="cartCount" class="page__subtitle">
          {{ cartCount }} {{ itemsWord }} · итого {{ formatPrice(cartTotal) }}
        </p>
      </div>

      <template v-if="cartItems.length">
        <ul class="cart-list">
          <li v-for="item in cartItems" :key="item.product.id" class="cart-item">
            <button
              class="cart-item__media"
              type="button"
              @click="openProduct(item.product.id)"
            >
              <img
                class="cart-item__image"
                :src="item.product.image"
                :alt="fullTitle(item.product)"
              />
            </button>

            <div class="cart-item__info">
              <button
                class="cart-item__title"
                type="button"
                @click="openProduct(item.product.id)"
              >
                <span>{{ item.product.title }}</span>
                <span>{{ item.product.author }}</span>
              </button>
              <p class="cart-item__price">
                {{ formatPrice(item.product.price || 0) }}
              </p>
            </div>

            <button
              class="cart-item__remove"
              type="button"
              @click="removeFromCart(item.product.id)"
            >
              Удалить
            </button>
          </li>
        </ul>

        <div class="cart-summary">
          <div class="cart-summary__row">
            <span>Сумма заказа</span>
            <strong>{{ formatPrice(cartTotal) }}</strong>
          </div>
          <div class="cart-summary__actions">
            <button class="btn btn--ghost" type="button" @click="clearCart">
              Очистить корзину
            </button>
            <button class="btn" type="button" @click="checkout">
              Оформить заказ
            </button>
          </div>
        </div>
      </template>

      <empty-state
        v-else
        title="Корзина пуста"
        text="Добавьте картины из каталога — кнопка «Купить» сохранит их здесь даже после перезагрузки."
        action-label="Перейти в каталог"
        @action="goCatalog"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import EmptyState from '@/components/EmptyState.vue';
import { formatPrice, productFullTitle } from '@/types';

export default Vue.extend({
  name: 'CartPage',
  components: {
    EmptyState,
  },
  computed: {
    ...mapGetters(['cartItems', 'cartCount', 'cartTotal']),
    itemsWord(): string {
      const n = this.cartCount as number;
      const mod10 = n % 10;
      const mod100 = n % 100;
      if (mod10 === 1 && mod100 !== 11) {
        return 'товар';
      }
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        return 'товара';
      }
      return 'товаров';
    },
  },
  methods: {
    ...mapActions(['removeFromCart', 'clearCart', 'openProduct', 'showToast']),
    formatPrice,
    fullTitle: productFullTitle,
    goCatalog() {
      this.$router.push({ name: 'catalog' });
    },
    checkout() {
      this.showToast('Заявка принята. Менеджер свяжется с вами.');
      this.clearCart();
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  padding: 40px 0 64px;

  &__head {
    margin-bottom: 32px;
  }

  &__title {
    margin-bottom: 8px;
  }

  &__subtitle {
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    color: $text-muted;
  }
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 28px;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 16px;
  background: #fff;
  border: 1px solid rgba($primary, 0.08);

  &__media {
    display: block;
    overflow: hidden;
    background: #ddd;
    cursor: pointer;
  }

  &__image {
    width: 120px;
    height: 90px;
    object-fit: cover;
  }

  &__info {
    min-width: 0;
  }

  &__title {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: $font-dark;
    cursor: pointer;

    &:hover {
      color: $primary-hover;
    }
  }

  &__price {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }

  &__remove {
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    color: $primary-hover;
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      color: $primary;
    }
  }
}

.cart-summary {
  padding: 24px;
  background: #fff;
  border: 1px solid rgba($primary, 0.08);

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 24px;

    strong {
      font-size: 18px;
      font-weight: 700;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
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

  &--ghost {
    background: transparent;
    color: $font-dark;
    border: 1px solid rgba($primary, 0.2);

    &:hover {
      background: rgba($primary, 0.06);
    }
  }
}

@media (max-width: 700px) {
  .cart-item {
    grid-template-columns: 96px 1fr;
    grid-template-areas:
      'media info'
      'remove remove';

    &__media {
      grid-area: media;
    }

    &__info {
      grid-area: info;
    }

    &__remove {
      grid-area: remove;
      justify-self: start;
    }

    &__image {
      width: 96px;
      height: 72px;
    }
  }

  .cart-summary {
    &__actions {
      flex-direction: column;

      .btn {
        width: 100%;
      }
    }
  }
}
</style>
