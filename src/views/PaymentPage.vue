<template>
  <info-page-layout title="Оплата">
    <p>
      Оплата производится после подтверждения наличия картины менеджером.
      Резерв позиции в корзине действует 24 часа.
    </p>
    <ul>
      <li>Банковский перевод для юридических лиц</li>
      <li>Оплата картой онлайн (Visa, Mastercard, МИР)</li>
      <li>Наличными или картой при самовывозе</li>
    </ul>
    <p>
      Для международных переводов свяжитесь с нами по телефону
      <a href="tel:+78125555555">+7 (812) 555-55-55</a>.
    </p>
  </info-page-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import InfoPageLayout from '@/components/InfoPageLayout.vue';

export default Vue.extend({
  name: 'PaymentPage',
  components: { InfoPageLayout },
});
</script>
