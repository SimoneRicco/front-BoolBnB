<script>
import { store } from "../../../store";
import App404 from "../App404.vue";
import axios from "axios";
export default {
  data() {
    return {
      store,
      apartment: null,
      is404: false,
    };
  },
  components: {
    App404,
  },
  methods: {
    getApartment() {
      axios
        .get(this.store.baseUrl + "api/apartments/" + this.$route.params.slug)
        .then((response) => {
          this.apartment = response.data.results;
        })
        .catch(() => (this.is404 = true));
    },
  },
  created() {
    this.getApartment();
  },
};
</script>

<template>
  <App404 v-if="is404" />
  <template v-else-if="apartment">
    
    <h1 class="text-center text-5xl py-20">{{ apartment.title }}</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Stanze
            </th>
            <th scope="col" class="px-6 py-3">Letti</th>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Bagni
            </th>
            <th scope="col" class="px-6 py-3">Metri quadrati</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
            >
              {{ apartment.rooms }}
            </th>
            <td class="px-6 py-4">{{ apartment.beds }}</td>
            <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
              {{ apartment.bathrooms }}
            </td>
            <td class="px-6 py-4">{{ apartment.square_meters }}</td>
          </tr>
        </tbody>
      </table>
      
    </div>
    
  </template>

<section>
      <div
        id="indicators-carousel"
        class="relative w-full"
        data-carousel="slide"
      >
        <div class="opacity h-full w-full absolute z-30"></div>
        <button class="search text-white bg-red-300 hover:bg-red-400"></button>
        <!-- Carousel wrapper -->
        <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
          <!-- Item 1 -->
          <template v-for="(item, index) in apartment.image" :key="index">
            <div
              v-if="index === 0"
              class="hidden duration-700 ease-in-out"
              data-carousel-item="active"
            >
              <img
                :src="store.baseUrl + 'storage/uploads/' + item.url"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            <div
              v-else
              class="hidden duration-700 ease-in-out"
              data-carousel-item
            >
              <img
                :src="store.baseUrl + 'storage/uploads/' + item.url"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </template>
        </div>
        <!-- Slider indicators -->
        <div
          class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2"
        >
          <button
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></button>
          <button
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 2"
            data-carousel-slide-to="1"
          ></button>
          <button
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 3"
            data-carousel-slide-to="2"
          ></button>
          <button
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 4"
            data-carousel-slide-to="3"
          ></button>
        </div>
        <!-- Slider controls -->
        <button
          type="button"
          class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
          >
            <svg
              class="w-4 h-4 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
          >
            <svg
              class="w-4 h-4 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>
    </section>

    
</template>

<style></style>
