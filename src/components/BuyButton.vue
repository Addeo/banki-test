<template>
  <button
    class="buy"
    type="button"
    :class="buttonClass"
    :disabled="state !== 'idle'"
    @click="$emit('buy')"
  >
    <span v-if="state === 'processing'" class="buy__spinner" aria-hidden="true" />
    <img
      v-else-if="state === 'in-cart'"
      class="buy__check"
      :src="checkIcon"
      width="14"
      height="10"
      alt=""
    />
    <span>{{ label }}</span>
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import checkIcon from '@/assets/images/inCart.png';
import type { CartButtonState } from '@/types/cart';

export default Vue.extend({
  name: 'BuyButton',
  props: {
    state: {
      type: String as PropType<CartButtonState>,
      required: true,
    },
  },
  data() {
    return {
      checkIcon,
    };
  },
  computed: {
    label(): string {
      if (this.state === 'processing') {
        return 'Обрабатывается';
      }
      if (this.state === 'in-cart') {
        return 'В корзине';
      }
      return 'Купить';
    },
    buttonClass(): Record<string, boolean> {
      return {
        'buy--processing': this.state === 'processing',
        'buy--in-cart': this.state === 'in-cart',
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.buy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 160px;
  height: 48px;
  padding: 0 28px;
  background: $primary;
  color: $font-light;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  transition: background-color 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    background: $primary-hover;
  }

  &:disabled {
    cursor: default;
  }

  &--processing {
    background: $primary-hover;
    min-width: 210px;
  }

  &--in-cart {
    background: $primary;
    cursor: default;
  }

  &__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba($font-light, 0.35);
    border-top-color: $font-light;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__check {
    width: 14px;
    height: 10px;
    object-fit: contain;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
