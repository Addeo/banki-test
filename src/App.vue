<template>
  <div class="app">
    <app-header />
    <main class="app__main">
      <router-view />
    </main>
    <app-footer />

    <product-modal
      v-if="selectedProduct"
      :product="selectedProduct"
      :cart-state="buttonState(selectedProduct.id)"
      @close="closeProduct"
      @buy="buyProduct"
    />

    <transition name="toast">
      <div v-if="toastMessage" class="toast" role="status">
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions, mapState } from 'vuex';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ProductModal from '@/components/ProductModal.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ProductModal,
  },
  computed: {
    ...mapGetters(['selectedProduct', 'buttonState']),
    ...mapState(['toastMessage']),
  },
  methods: {
    ...mapActions(['closeProduct', 'buyProduct']),
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

  &__main {
    flex: 1 1 auto;
  }
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 28px;
  z-index: 1100;
  transform: translateX(-50%);
  max-width: calc(100% - 32px);
  padding: 14px 22px;
  background: $primary;
  color: $font-light;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  box-shadow: 0 10px 30px rgba($primary, 0.28);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}
</style>
