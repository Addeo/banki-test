<template>
  <section class="page">
    <div class="container content">
      <h1 class="content__title">{{ title }}</h1>
      <div class="content__body">
        <slot />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'InfoPageLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  padding: 40px 0 64px;
}

.content {
  max-width: 760px;

  &__title {
    margin-bottom: 24px;
  }

  &__body {
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    color: $font-dark;

    ::v-deep p + p {
      margin-top: 14px;
    }

    ::v-deep ul {
      margin: 14px 0 0;
      padding-left: 18px;
      list-style: disc;
    }

    ::v-deep li + li {
      margin-top: 8px;
    }

    ::v-deep strong {
      font-weight: 700;
    }
  }
}

@media (max-width: 600px) {
  .page {
    padding: 24px 0 40px;
  }

  .content {
    &__title {
      font-size: 20px;
      line-height: 30px;
    }
  }
}
</style>
