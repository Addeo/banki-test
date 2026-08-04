<template>
  <section class="page">
    <div class="container">
      <div class="page__head">
        <h1 class="page__title">Картины эпохи Возрождения</h1>
        <p class="page__subtitle">
          Оригиналы и репродукции великих мастеров — с доставкой по России
        </p>
      </div>

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
.page {
  padding: 40px 0 64px;

  &__head {
    margin-bottom: 36px;
  }

  &__title {
    margin-bottom: 8px;
  }

  &__subtitle {
    max-width: 520px;
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    color: $text-muted;
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

    &__head {
      margin-bottom: 24px;
    }

    &__title {
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
