<template>
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    :aria-label="fullTitle"
    @click.self="close"
  >
    <div class="modal__dialog" ref="dialog">
      <button class="modal__close" type="button" aria-label="Закрыть" @click="close">
        ×
      </button>

      <image-slider :images="product.gallery" :alt="fullTitle" />

      <div class="modal__body">
        <h2 class="modal__title">
          <span>{{ product.title }}</span>
          <span>{{ product.author }}</span>
        </h2>

        <p class="modal__desc">{{ product.description }}</p>

        <div class="modal__footer">
          <template v-if="product.isSold">
            <p class="modal__sold">Продана на аукционе</p>
          </template>
          <template v-else>
            <div class="modal__prices">
              <span v-if="product.oldPrice" class="modal__old">
                {{ formatPrice(product.oldPrice) }}
              </span>
              <span class="modal__price">{{ formatPrice(product.price || 0) }}</span>
            </div>
            <div class="modal__actions">
              <buy-button :state="cartState" @buy="$emit('buy', product.id)" />
              <router-link
                v-if="cartState === 'in-cart'"
                class="modal__cart-link"
                to="/cart"
                @click.native="close"
              >
                Перейти в корзину
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import BuyButton from '@/components/BuyButton.vue';
import ImageSlider from '@/components/ImageSlider.vue';
import type { CartButtonState, Product } from '@/types';
import { formatPrice, productFullTitle } from '@/types';

export default Vue.extend({
  name: 'ProductModal',
  components: {
    BuyButton,
    ImageSlider,
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    cartState: {
      type: String as PropType<CartButtonState>,
      required: true,
    },
  },
  computed: {
    fullTitle(): string {
      return productFullTitle(this.product);
    },
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
    const dialog = this.$refs.dialog as HTMLElement | undefined;
    if (dialog) {
      dialog.focus();
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    formatPrice,
    close() {
      this.$emit('close');
    },
    onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.close();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba($primary, 0.55);
  animation: fade-in 0.2s ease;

  &__dialog {
    position: relative;
    width: min(720px, 100%);
    max-height: calc(100vh - 40px);
    overflow: auto;
    background: $bg;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
    outline: none;
    animation: rise-in 0.25s ease;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 14px;
    z-index: 2;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba($bg, 0.9);
    color: $font-dark;
    font-size: 28px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;

    &:hover {
      color: $primary-hover;
    }
  }

  &__body {
    padding: 24px 28px 28px;
  }

  &__title {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
  }

  &__desc {
    margin-bottom: 24px;
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    color: $font-dark;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  &__prices {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__old {
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    color: $text-muted;
    text-decoration: line-through;
  }

  &__price {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }

  &__sold {
    font-size: 16px;
    line-height: 24px;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  &__cart-link {
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    color: $primary;
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      color: $primary-hover;
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .modal {
    padding: 12px;

    &__body {
      padding: 18px 16px 20px;
    }

    &__footer {
      flex-direction: column;
      align-items: stretch;
    }
  }
}
</style>
