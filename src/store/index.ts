import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { PRODUCTS, findProductById } from '@/data/products';
import { loadCartIds, saveCartIds } from '@/utils/cart-storage';
import type { CartButtonState, CartItemView, Product } from '@/types';

Vue.use(Vuex);

const BUY_DELAY_MS = 2000;

export interface RootState {
  products: Product[];
  searchQuery: string;
  cartIds: number[];
  processingIds: number[];
  selectedProductId: number | null;
  toastMessage: string | null;
}

const storeOptions: StoreOptions<RootState> = {
  state: {
    products: PRODUCTS,
    searchQuery: '',
    cartIds: loadCartIds(),
    processingIds: [],
    selectedProductId: null,
    toastMessage: null,
  },
  getters: {
    filteredProducts(state): Product[] {
      const query = state.searchQuery.trim().toLowerCase();
      if (!query) {
        return state.products;
      }
      return state.products.filter((product) => {
        const haystack = `${product.title} ${product.author}`.toLowerCase();
        return haystack.includes(query);
      });
    },
    cartCount(state): number {
      return state.cartIds.length;
    },
    cartItems(state): CartItemView[] {
      return state.cartIds
        .map((id) => findProductById(id))
        .filter((product): product is Product => Boolean(product))
        .map((product) => ({ product, quantity: 1 }));
    },
    cartTotal(_state, getters): number {
      return (getters.cartItems as CartItemView[]).reduce((sum, item) => {
        return sum + (item.product.price || 0);
      }, 0);
    },
    selectedProduct(state): Product | null {
      if (state.selectedProductId == null) {
        return null;
      }
      return findProductById(state.selectedProductId) || null;
    },
    buttonState: (state) => (productId: number): CartButtonState => {
      if (state.processingIds.includes(productId)) {
        return 'processing';
      }
      if (state.cartIds.includes(productId)) {
        return 'in-cart';
      }
      return 'idle';
    },
  },
  mutations: {
    SET_SEARCH_QUERY(state, query: string) {
      state.searchQuery = query;
    },
    ADD_PROCESSING(state, productId: number) {
      if (!state.processingIds.includes(productId)) {
        state.processingIds = [...state.processingIds, productId];
      }
    },
    REMOVE_PROCESSING(state, productId: number) {
      state.processingIds = state.processingIds.filter((id) => id !== productId);
    },
    ADD_TO_CART(state, productId: number) {
      if (!state.cartIds.includes(productId)) {
        state.cartIds = [...state.cartIds, productId];
        saveCartIds(state.cartIds);
      }
    },
    REMOVE_FROM_CART(state, productId: number) {
      state.cartIds = state.cartIds.filter((id) => id !== productId);
      saveCartIds(state.cartIds);
    },
    CLEAR_CART(state) {
      state.cartIds = [];
      saveCartIds(state.cartIds);
    },
    OPEN_PRODUCT(state, productId: number) {
      state.selectedProductId = productId;
    },
    CLOSE_PRODUCT(state) {
      state.selectedProductId = null;
    },
    SET_TOAST(state, message: string | null) {
      state.toastMessage = message;
    },
  },
  actions: {
    setSearchQuery({ commit }, query: string) {
      commit('SET_SEARCH_QUERY', query);
    },
    openProduct({ commit }, productId: number) {
      commit('OPEN_PRODUCT', productId);
      document.body.style.overflow = 'hidden';
    },
    closeProduct({ commit }) {
      commit('CLOSE_PRODUCT');
      document.body.style.overflow = '';
    },
    removeFromCart({ commit }, productId: number) {
      commit('REMOVE_FROM_CART', productId);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    showToast({ commit }, message: string) {
      commit('SET_TOAST', message);
      window.setTimeout(() => {
        commit('SET_TOAST', null);
      }, 2400);
    },
    buyProduct({ state, commit, dispatch }, productId: number) {
      if (
        state.cartIds.includes(productId) ||
        state.processingIds.includes(productId)
      ) {
        return;
      }
      const product = findProductById(productId);
      if (!product || product.isSold || product.price == null) {
        return;
      }

      commit('ADD_PROCESSING', productId);
      window.setTimeout(() => {
        commit('REMOVE_PROCESSING', productId);
        commit('ADD_TO_CART', productId);
        dispatch('showToast', `${product.title} добавлена в корзину`);
      }, BUY_DELAY_MS);
    },
  },
};

export default new Vuex.Store(storeOptions);
