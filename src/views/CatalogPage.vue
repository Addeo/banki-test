<template>
  <section class="catalog-page">
    <div class="container">
      <h1 class="catalog-page__title">Картины эпохи Возрождения</h1>

      <div v-if="filteredProducts.length" id="catalog" class="catalog">
        <product-card
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :cart-state="buttonState(product.id)"
          @buy="buyProduct"
          @open="openProduct"
        />
      </div>

      <empty-state
        v-else
        title="Ничего не найдено"
        :text="`По запросу «${searchQuery}» картин нет. Попробуйте другое название.`"
        action-label="Сбросить поиск"
        @action="clearSearch"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapState, mapActions } from 'vuex';
import ProductCard from '@/components/ProductCard.vue';
import EmptyState from '@/components/EmptyState.vue';

export default Vue.extend({
  name: 'CatalogPage',
  components: {
    ProductCard,
    EmptyState,
  },
  computed: {
    ...mapState(['searchQuery']),
    ...mapGetters(['filteredProducts', 'buttonState']),
  },
  methods: {
    ...mapActions(['buyProduct', 'openProduct', 'setSearchQuery']),
    clearSearch() {
      this.setSearchQuery('');
    },
  },
});
</script>

<style lang="scss" scoped>
.catalog-page {
  padding: 0 0 60px;

  &__title {
    margin: 40px 0;
  }
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px $gap;
}

@media (max-width: 1200px) {
  .catalog {
    justify-content: center;
    gap: 24px;
  }
}

@media (max-width: 666px) {
  .catalog-page {
    &__title {
      margin: 30px 0 20px;
      text-align: center;
      font-size: 22px;
      line-height: 32px;
    }
  }
}

@media (max-width: 360px) {
  .catalog-page {
    &__title {
      font-size: 20px;
      line-height: 30px;
    }
  }
}
</style>
