<template>
  <div class="slider">
    <div class="slider__viewport">
      <img
        class="slider__image"
        :src="images[currentIndex]"
        :alt="`${alt} — фото ${currentIndex + 1}`"
      />
    </div>

    <button
      class="slider__nav slider__nav--prev"
      type="button"
      aria-label="Предыдущее изображение"
      :disabled="images.length <= 1"
      @click="prev"
    >
      ‹
    </button>
    <button
      class="slider__nav slider__nav--next"
      type="button"
      aria-label="Следующее изображение"
      :disabled="images.length <= 1"
      @click="next"
    >
      ›
    </button>

    <div class="slider__dots" role="tablist" aria-label="Слайды">
      <button
        v-for="(image, index) in images"
        :key="image"
        class="slider__dot"
        type="button"
        role="tab"
        :aria-selected="index === currentIndex"
        :class="{ 'slider__dot--active': index === currentIndex }"
        :aria-label="`Слайд ${index + 1}`"
        @click="currentIndex = index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'ImageSlider',
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true,
    },
    alt: {
      type: String,
      default: 'Изображение товара',
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    images() {
      this.currentIndex = 0;
    },
  },
  methods: {
    prev() {
      if (!this.images.length) {
        return;
      }
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    next() {
      if (!this.images.length) {
        return;
      }
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  },
});
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  width: 100%;

  &__viewport {
    width: 100%;
    height: 320px;
    overflow: hidden;
    background: #e8e4e4;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba($primary, 0.85);
    color: $font-light;
    font-size: 28px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
      background: $primary-hover;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &--prev {
      left: 12px;
    }

    &--next {
      right: 12px;
    }
  }

  &__dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 14px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $primary-disabled;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &--active {
      background: $primary;
      transform: scale(1.2);
    }
  }
}

@media (max-width: 600px) {
  .slider {
    &__viewport {
      height: 220px;
    }
  }
}
</style>
