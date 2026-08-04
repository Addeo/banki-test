<template>
  <info-page-layout title="Контакты">
    <p>
      <strong>Телефон:</strong>
      <a href="tel:+78125555555">+7 (812) 555-55-55</a>
    </p>
    <p>
      <strong>Адрес:</strong>
      г. Санкт-Петербург, ул. Ефимова, 3
    </p>
    <p>
      <strong>Email:</strong>
      <a href="mailto:hello@banki.shop">hello@banki.shop</a>
    </p>
    <p>
      Режим работы галереи: ежедневно с 11:00 до 20:00. Консультации по подбору
      и атрибуции — по предварительной записи.
    </p>
  </info-page-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import InfoPageLayout from '@/components/InfoPageLayout.vue';

export default Vue.extend({
  name: 'ContactsPage',
  components: { InfoPageLayout },
});
</script>
