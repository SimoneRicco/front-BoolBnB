<script>
import axios from "axios";
import { store } from "../../../store";

export default {
  data() {
    return {
      store,
      arrImages: [],
    };
  },

  methods: {
    // funzione per lettera maiuscola iniziale
    capitalized(name) {
      const capitalizedFirst = name[0].toUpperCase();
      const rest = name.slice(1);

      return capitalizedFirst + rest;
    },

    getImages() {
      axios.get(this.store.baseUrl + "api/images").then((response) => {
        this.arrImages = response.data.results;
      });
    },
    /* TODO bisogna prendere solo quelle col booleano 1 */
    cardGenerator(a) {
      for (let i = 0; i < this.arrImages.length; i++) {
        if (
          a == this.arrImages[i].apartment_id &&
          this.arrImages[i].cover_image == 1
        ) {
          return this.arrImages[i].url;
        }
      }
    },

    bella() {
      return "ciao";
    },
  },

  created() {
    this.getImages();
    this.cardGenerator();
  },

  props: {
    objApartment: Object,
    required: true,
  },
};
</script>

<template>
  <div
    class="max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto"
  >
    <img
      style="height: 20rem"
      class="rounded-t-lg"
      :src="store.baseUrl + 'storage/uploads/' + cardGenerator(objApartment.id)"
      :alt="objApartment.title"
    />
    <div class="p-5">
      <div class="w-full flex justify-between">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ capitalized(objApartment.title) }}
        </h5>

        <div v-if="objApartment.sponsors.length === 0">
        
      </div>
      <div v-else>
        <svg
          class="w-5 h-5 ml-3 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill="blue"
            d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
          />
          <path
            fill="#fff"
            d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
          />
        </svg>
      </div>
      </div>
      <p class="mt-1 mb-2 font-normal text-gray-700 dark:text-gray-400">
        {{ objApartment.address.address }}
      </p>
      <p class="mb-3" 
      style="
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;">
        {{ objApartment.description }}
      </p>
      <router-link
        :to="{ name: 'apartments.show', params: { slug: objApartment.slug } }"
      >
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            class="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </router-link>
    </div>
  </div>
</template>

<style>
img {
  width: 100%;
}
</style>
