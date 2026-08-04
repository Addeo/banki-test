<template>
  <info-page-layout title="Доставка">
    <p>
      Доставляем картины по Санкт-Петербургу и всей России. Каждая работа
      упаковывается в защитный короб с амортизацией и влагозащитой.
    </p>
    <ul>
      <li><strong>СПб и ЛО</strong> — курьерская доставка 1–2 рабочих дня</li>
      <li><strong>Россия</strong> — транспортная компания, 3–7 рабочих дней</li>
      <li><strong>Самовывоз</strong> — ул. Ефимова, 3, ежедневно с 11:00 до 20:00</li>
    </ul>
    <p>
      Стоимость доставки рассчитывается при оформлении заказа. Для работ
      стоимостью от 3 000 000 $ доставка по городу бесплатна.
    </p>
  </info-page-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import InfoPageLayout from '@/components/InfoPageLayout.vue';

export default Vue.extend({
  name: 'DeliveryPage',
  components: { InfoPageLayout },
});
</script>
