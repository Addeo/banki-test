<template>
  <div class="empty">
    <h2 class="empty__title">{{ title }}</h2>
    <p class="empty__text">{{ text }}</p>
    <button v-if="actionLabel" class="empty__action" type="button" @click="$emit('action')">
      {{ actionLabel }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'EmptyState',
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    actionLabel: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.empty {
  padding: 48px 24px;
  text-align: center;
  background: #fff;
  border: 1px dashed rgba($primary, 0.2);

  &__title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
  }

  &__text {
    max-width: 420px;
    margin: 0 auto 20px;
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    color: $text-muted;
  }

  &__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 28px;
    background: $primary;
    color: $font-light;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    transition: background-color 0.2s ease;

    &:hover {
      background: $primary-hover;
    }
  }
}
</style>
