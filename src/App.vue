<template>
  <div class="app">
    <app-header :search-query="searchQuery" @search="onSearch" />

    <main class="page">
      <div class="container">
        <h1 class="page__title">Картины эпохи Возрождения</h1>

        <div v-if="filteredProducts.length" class="catalog" id="catalog">
          <product-card
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            :cart-state="cartState(product.id)"
            @buy="onBuy"
            @open="openModal"
          />
        </div>

        <p v-else class="page__empty">
          По запросу «{{ searchQuery }}» ничего не найдено
        </p>
      </div>
    </main>

    <app-footer />

    <product-modal
      v-if="selectedProduct"
      :product="selectedProduct"
      :cart-state="cartState(selectedProduct.id)"
      @close="closeModal"
      @buy="onBuy"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ProductCard from '@/components/ProductCard.vue';
import ProductModal from '@/components/ProductModal.vue';
import { PRODUCTS, Product } from '@/data/products';
import { loadCartIds, saveCartIds } from '@/utils/cart-storage';
import type { CartButtonState } from '@/types/cart';

interface CartMap {
  [id: number]: CartButtonState;
}

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ProductCard,
    ProductModal,
  },
  data() {
    return {
      products: PRODUCTS as Product[],
      searchQuery: '',
      cart: {} as CartMap,
      selectedProduct: null as Product | null,
    };
  },
  computed: {
    filteredProducts(): Product[] {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        return this.products;
      }
      return this.products.filter((product) => {
        const haystack = `${product.title} ${product.author}`.toLowerCase();
        return haystack.includes(query);
      });
    },
  },
  created() {
    const ids = loadCartIds();
    const next: CartMap = {};
    ids.forEach((id) => {
      next[id] = 'in-cart';
    });
    this.cart = next;
  },
  methods: {
    cartState(id: number): CartButtonState {
      return this.cart[id] || 'idle';
    },
    onSearch(value: string) {
      this.searchQuery = value;
    },
    onBuy(productId: number) {
      if (this.cart[productId] === 'processing' || this.cart[productId] === 'in-cart') {
        return;
      }
      this.$set(this.cart, productId, 'processing');
      window.setTimeout(() => {
        this.$set(this.cart, productId, 'in-cart');
        this.persistCart();
      }, 2000);
    },
    persistCart() {
      const ids = Object.keys(this.cart)
        .map(Number)
        .filter((id) => this.cart[id] === 'in-cart');
      saveCartIds(ids);
    },
    openModal(product: Product) {
      this.selectedProduct = product;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedProduct = null;
      document.body.style.overflow = '';
    },
  },
  beforeDestroy() {
    document.body.style.overflow = '';
  },
});
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page {
  flex: 1 1 auto;
  padding: 40px 0 60px;

  &__title {
    margin-bottom: 40px;
  }

  &__empty {
    color: $text-muted;
    font-size: 16px;
    line-height: 24px;
  }
}

.catalog {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $gap;
}

@media (max-width: 1100px) {
  .catalog {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .page {
    padding: 24px 0 40px;

    &__title {
      margin-bottom: 24px;
      font-size: 20px;
      line-height: 30px;
    }
  }

  .catalog {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
