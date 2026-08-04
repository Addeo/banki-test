<template>
  <article class="card" :class="{ 'card--sold': product.isSold }">
    <button
      class="card__media"
      type="button"
      :aria-label="`Открыть карточку: ${fullTitle}`"
      @click="$emit('open', product.id)"
    >
      <img
        class="card__image"
        :src="product.image"
        :alt="fullTitle"
        width="280"
        height="160"
      />
    </button>

    <div class="card__body">
      <button class="card__title" type="button" @click="$emit('open', product.id)">
        <span class="card__name">{{ product.title }}</span>
        <span class="card__author">{{ product.author }}</span>
      </button>

      <div class="card__footer">
        <template v-if="product.isSold">
          <p class="card__sold">Продана на аукционе</p>
        </template>
        <template v-else>
          <div class="card__prices">
            <span v-if="product.oldPrice" class="card__old">
              {{ formatPrice(product.oldPrice) }}
            </span>
            <span class="card__price">{{ formatPrice(product.price || 0) }}</span>
          </div>
          <buy-button :state="cartState" @buy="$emit('buy', product.id)" />
        </template>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import BuyButton from '@/components/BuyButton.vue';
import type { CartButtonState, Product } from '@/types';
import { formatPrice, productFullTitle } from '@/types';

export default Vue.extend({
  name: 'ProductCard',
  components: {
    BuyButton,
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
  methods: {
    formatPrice,
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: $card-width;
  display: flex;
  flex-direction: column;
  background: $bg;

  &--sold {
    opacity: 0.5;

    .card__footer {
      pointer-events: none;
    }
  }

  &__media {
    display: block;
    width: 100%;
    overflow: hidden;
    background: #ddd;
    cursor: pointer;
    line-height: 0;
  }

  &__image {
    width: 100%;
    height: $card-image-height;
    object-fit: cover;
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 170px;
    border: 1px solid $border;
    border-top: none;
  }

  &__title {
    display: block;
    width: 100%;
    text-align: left;
    padding: 20px 24px 0;
    cursor: pointer;
    color: $font-dark;
    transition: color 0.2s ease;

    &:hover {
      color: $primary-hover;
    }
  }

  &__name,
  &__author {
    display: block;
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
  }

  &__footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 24px;
  }

  &__prices {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
  }

  &__old {
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    color: $font-dark;
    text-decoration: line-through;
  }

  &__price {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: $font-dark;
  }

  &__sold {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: $font-dark;
  }
}

@media (max-width: 666px) {
  .card {
    max-width: 320px;
    margin: 0 auto;

    &__image {
      height: 180px;
    }
  }
}
</style>
