<template>
  <article class="card" :class="{ 'card--sold': product.isSold }">
    <button
      class="card__media"
      type="button"
      :aria-label="`Открыть карточку: ${fullTitle}`"
      @click="$emit('open', product.id)"
    >
      <img class="card__image" :src="product.image" :alt="fullTitle" width="310" height="198" />
      <span v-if="product.isSold" class="card__badge">Продана</span>
    </button>

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
  display: flex;
  flex-direction: column;
  min-width: 0;

  &--sold {
    opacity: 0.45;

    .card__footer {
      pointer-events: none;
    }
  }

  &__media {
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 20px;
    overflow: hidden;
    background: #ddd;
    cursor: pointer;
  }

  &__image {
    width: 100%;
    height: 198px;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  &__media:hover .card__image {
    transform: scale(1.03);
  }

  &__badge {
    position: absolute;
    left: 12px;
    top: 12px;
    padding: 6px 10px;
    background: rgba($primary, 0.88);
    color: $font-light;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
  }

  &__title {
    display: block;
    text-align: left;
    margin-bottom: 20px;
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
    flex-direction: column;
    gap: 16px;
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
    color: $font-dark;
  }

  &__sold {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: $font-dark;
    opacity: 0.7;
  }
}

@media (max-width: 600px) {
  .card {
    &__image {
      height: 220px;
    }
  }
}
</style>
