import Vue from 'vue';
import { Store } from 'vuex';
import type { RootState } from '@/store';

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<RootState>;
  }
}
