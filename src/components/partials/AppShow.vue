<script>
import { store } from "../../../store";
import App404 from "../App404.vue";
import axios from "axios";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

export default {
  data() {
    return {
      autorun: null,
      activeIndex: 0,
      store,
      apartment: null,
      is404: false,
      carouselImages: [],
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
          this.carouselImages = this.apartment.image;
        })
        .catch(() => (this.is404 = true));
    },

    capitalized(name) {
      const capitalizedFirst = name[0].toUpperCase();
      const rest = name.slice(1);

      return capitalizedFirst + rest;
    },

    showNextSlide() {
      this.activeIndex++;

      if (this.activeIndex >= this.carouselImages.length) {
        this.activeIndex = 0;
      }
    },

    showPrevSlide() {
      this.activeIndex--;

      if (this.activeIndex < 0) {
        this.activeIndex = this.carouselImages.length - 1;
      }
    },

    setActiveIndex(index) {
      this.activeIndex = index;
    },

    startAutorun() {
      this.autorun = setInterval(() => {
        this.activeIndex++;
        if (this.activeIndex >= this.carouselImages.length) {
          this.activeIndex = 0;
        }
      }, 6000);
    },

    stopAutorun() {
      clearInterval(this.autorun);
    },
  },

  created() {
    this.getApartment();
    this.startAutorun();
  },
};
onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <App404 v-if="is404" />
  <div v-else-if="apartment">
    <div class="flex justify-center items-baseline">
      <h1
      style="font-style: italic"
      class="text-blue-800 text-center text-5xl py-20"
      >
        '{{ capitalized(apartment.title) }}'
      </h1>
      <div v-if="apartment.sponsor_id != 0">
        <svg  class="w-8 h-8 ml-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
        <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
        </svg>
      </div>
      
    </div>
    
    <div>
      <section class="w-full">
        <div class="w-full">
          <div style="border: 2px solid black" class="carousel">
            <div
              class="highlighted"
              @mouseenter="stopAutorun"
              @mouseleave="startAutorun"
            >
              <img
                v-for="(image, index) in carouselImages"
                :key="image.id"
                :src="store.baseUrl + 'storage/uploads/' + image.url"
                :class="{ active: index == activeIndex }"
                alt=""
              />
              <div class="description"></div>
            </div>

            <!-- div con le miniature -->
            <div class="thumbs">
              
                <i class="arrow-up" style="cursor: pointer;" @click="showPrevSlide">
                  <svg
                    class="w-8 h-8 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 8"
                  >
                    <path
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
                    />
                  </svg>
                </i>
                <i class="arrow-down" style="cursor: pointer" @click="showNextSlide">
                  <svg
                    class="w-8 h-8 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 8"
                  >
                    <path
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                    />
                  </svg>
                </i>
              

              <img
                v-for="(image, index) in carouselImages"
                :key="image.id"
                class="thumb"
                :class="{ active: index == activeIndex }"
                @click="setActiveIndex(index)"
                :src="store.baseUrl + 'storage/uploads/' + image.url"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>


    <div class="flex">
      <section class="w-5/12 p-5">
        <h1 class="text-4xl mb-12">Informazioni sulla struttura:</h1>
        <div class="text-3xl mb-12 flex items-baseline">
          <h2 class="text-blue-800">Numero di camere:</h2>
          <span class="ml-5">{{ apartment.rooms }}</span>
        </div>
        <div class="text-3xl mb-12 flex items-baseline">
          <h2 class="text-blue-800">Numero di bagni:</h2>
          <span class="ml-5">{{ apartment.bathrooms }}</span>
        </div>
        <div class="text-3xl mb-12 flex items-baseline">
          <h2 class="text-blue-800">Metri quadrati:</h2>
          <span class="ml-5">{{ apartment.square_meters }}</span>
        </div>
        <div class="text-3xl mb-12 flex items-baseline">
          <h2 class="text-blue-800">Disponibilità:</h2>
          <div class="ml-5" v-if="apartment.available === 1">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="green"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </div>
          <div class="ml-5" v-else>
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="red"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </div>
        </div>
        <div class="text-3xl flex items-baseline">
          <h2 class="text-blue-800">Punteggio:</h2>
          <div class="flex items-center ml-5">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="yellow"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="yellow"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="yellow"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="yellow"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="yellow"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
          </div>
        </div>
      </section>
      <section class="w-7/12 mt-5">
        <h1 class="text-4xl mb-12">Servizi della struttura:</h1>
        <div class="p-5 flex flex-wrap gap-5">
          <span v-for="(utility, index) in apartment.utilities" :key="index">
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'bathroom'">
              <i class="fa-solid fa-toilet mr-2"></i>
              <span class="ml-2">Bagno</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'parking'">
              <i class="fa-solid fa-square-parking"></i>
              <span class="ml-2">Parcheggio</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'kitchen'">
              <i class="fa-solid fa-sink"></i>
              <span class="ml-2">Cucina</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'washing machine'">
              <i class="fa-solid fa-soap"></i>
              <span class="ml-2">Lavatrice</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'balcony'">
              <i class="fa-solid fa-person-through-window"></i>
              <span class="ml-2">Balcone</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'garden'">
              <i class="fa-brands fa-pagelines"></i>
              <span class="ml-2">Giardino</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'bar'">
              <i class="fa-solid fa-martini-glass-citrus"></i>
              <span class="ml-2">Bar</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'room service'">
              <i class="fa-solid fa-bell-concierge"></i>
              <span class="ml-2">Servizio in camera</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'pool'">
              <i class="fa-solid fa-water-ladder"></i>
              <span class="ml-2">Piscina</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'spa'">
              <i class="fa-solid fa-spray-can-sparkles"></i>
              <span class="ml-2">Spa</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'gym'">
              <i class="fa-solid fa-dumbbell"></i>
              <span class="ml-2">Palestra</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'car-rent'">
              <i class="fa-solid fa-car-side"></i>
              <span class="ml-2">Noleggio auto</span>
            </div>
            <div class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300" v-if="utility.name === 'WiFi'">
              <i class="fa-solid fa-wifi"></i>
              <span class="ml-2">Wi-fi</span>
            </div>
          </span>
        </div>
      </section>
    </div>
  </div>

          
  
</template>

<style scoped>
.btn-container {
  margin-top: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 1em;
}

.normal {
  font-size: 1.2em;
  padding: 0.3em;
  border-radius: 10px;
  background-color: black;
  border: 2px solid white;
  color: white;
  cursor: pointer;
}

.normal:active {
  background-color: rgb(36, 38, 43);
}

.reverse {
  font-size: 1.2em;
  padding: 0.3em;
  border-radius: 10px;
  background-color: black;
  border: 2px solid white;
  color: white;
  cursor: pointer;
}

.reverse:active {
  background-color: rgb(36, 38, 43);
}

.deactivate {
  display: none;
}

.your-choice {
  display: none;
}

.activate {
  display: inline;
  color: white;
  font-size: 1.5em;
}

.active {
  opacity: 1;
  animation: fade 1s linear;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.carousel {
  display: flex;
  max-width: 100%;
}

.highlighted {
  height: 100%;
  width: 80%;
}

.thumbs {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 20%;
}

.highlighted img {
  display: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel .highlighted .active {
  display: block;
}

/* .carousel .controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 15px;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 2.5rem;
} */

.arrow-up{
  z-index: 9;
  position: absolute;
  top: 30px;
  left: 45%
}


.arrow-down{
  z-index: 9;
  position: absolute;
  bottom: 30px;
  left: 45%
}

@media screen and (max-width: 900px) {
  .arrow-up{
    display: none;
  }
  .arrow-down{
    display: none;
  }
}

.thumb {
  flex: 1 0 0;
  display: block;
  width: 100%;
  height: 100px;
  object-fit: fill;
  filter: brightness(0.3);
  border: 2px solid lightgrey;
}

.thumbs .active {
  filter: brightness(1);
  border: 3px solid white;
}

.description {
  width: 70%;
  position: absolute;
  text-align: right;
  bottom: 40px;
  right: 250px;
  color: white;
}

.description h2 {
  display: none;
}

.description p {
  display: none;
}

.description .active {
  display: block;
}



</style>
