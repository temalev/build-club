<script setup lang="ts">
const { footer } = useAppConfig();

const products = [
  "Железобетонные изделия (ЖБИ)",
  "Плиты перекрытий (ПК, ПНО, ПБ и др.)",
  "Фундаментные блоки (ФБС)",
  "Перемычки",
  "Бордюрный камень",
  "Прогоны",
  "Раствор",
  "Ригели",
  "Плиты опорные",
  "Плиты лотков",
  "Лестничные площадки",
  "Сваи",
  "Лестничные марши",
  "Лестничные ступени",
  "Тротуарная плитка",
  "Плиты забора",
  "Колонны",
];

const formData = ref({
  name: "",
  phone: "",
  email: "",
});

const submitForm = async () => {
  const text = `
Новая заявка!
Имя: ${formData.value.name}
Телефон: ${formData.value.phone}
Email: ${formData.value.email}
  `;

  try {
    await $fetch("/api/send-message", {
      method: "POST",
      body: { text },
    });

    alert("Спасибо! Ваша заявка отправлена.");
    formData.value = { name: "", phone: "", email: "" };
  } catch (error) {
    console.error("Error:", error);
    alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
  }
};
</script>

<template>
  <UFooter>
    <template #top>
      <div class="w-full mx-auto grid md:grid-cols-2 gap-6">
        <!-- Блок с продуктами -->
        <div class="mb-4 md:mb-6 offers h-fit">
          <h3 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 text-left">
            МЫ ПРЕДЛАГАЕМ:
          </h3>
          <ul class="list-none space-y-2 text-sm md:text-base text-gray-600 text-left">
            <li v-for="(item, index) in products" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Форма обратной связи -->
        <div class="offers h-fit">
          <h3 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 text-left">
            ОСТАВИТЬ ЗАЯВКУ:
          </h3>
          <form @submit.prevent="submitForm" class="space-y-4 text-left">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
              <input type="text" v-model="formData.name" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
                placeholder="Иван Иванов" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
              <input type="tel" v-model="formData.phone" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
                placeholder="+7 (___) ___-__-__" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" v-model="formData.email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
                placeholder="example@mail.ru" />
            </div>

            <button type="submit"
              class="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-300 mt-6">
              Отправить заявку
            </button>
          </form>
        </div>

        <div style="
            height: 440px;
            overflow: hidden;
            position: relative;
          ">
          <iframe style="
              width: 100%;
              height: 100%;
              border: 1px solid #e6e6e6;
              border-radius: 8px;
              box-sizing: border-box;
            " src="https://yandex.ru/maps-reviews-widget/158897590586?comments"></iframe><a
            href="https://yandex.ru/maps/org/zhelezobeton62/158897590586/" target="_blank" style="
              box-sizing: border-box;
              text-decoration: none;
              color: #b3b3b3;
              font-size: 10px;
              font-family: YS Text, sans-serif;
              padding: 0 20px;
              position: absolute;
              bottom: 8px;
              width: 100%;
              text-align: center;
              left: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              display: block;
              max-height: 14px;
              white-space: nowrap;
              padding: 0 16px;
              box-sizing: border-box;
            ">Железобетон62 на карте Рязани — Яндекс Карты</a>
        </div>

        <div style="position: relative; overflow: hidden">
          <a href="https://yandex.ru/maps/org/zhelezobeton62/158897590586/?utm_medium=mapframe&utm_source=maps"
            style="color: #eee; font-size: 12px; position: absolute; top: 0px">Железобетон62</a><a
            href="https://yandex.ru/maps/11/ryazan/category/precast_concrete/184107681/?utm_medium=mapframe&utm_source=maps"
            style="color: #eee; font-size: 12px; position: absolute; top: 14px">ЖБИ в Рязани</a><a
            href="https://yandex.ru/maps/11/ryazan/category/building_materials_wholesale/184107755/?utm_medium=mapframe&utm_source=maps"
            style="color: #eee; font-size: 12px; position: absolute; top: 28px">Стройматериалы оптом в Рязани</a>
            <iframe src="https://yandex.ru/map-widget/v1/?ll=39.645268%2C54.652782&mode=search&oid=158897590586&ol=biz&source=serp_navig&z=17.06"
            width="100%" height="440" frameborder="1" allowfullscreen="true" style="position: relative"></iframe>
        </div>
      </div>
    </template>
    <template #left>
      <!-- {{ footer.credits }} -->
    </template>

    <template #right>
      <UColorModeButton v-if="footer?.colorMode" />

      <!-- <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        />
      </template> -->
    </template>
  </UFooter>
</template>

<style scoped>
.offers {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
}

@media (min-width: 768px) {
  .offers {
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
}

.product-item {
  background-color: #edf2f7;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  position: relative;
  overflow: hidden;
}

.product-item::before {
  content: "•";
  position: absolute;
  left: 8px;
  color: #2d3748;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-item:hover::before {
  opacity: 1;
}
</style>
