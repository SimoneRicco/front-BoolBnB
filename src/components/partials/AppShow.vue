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
    <h1
      style="font-style: italic"
      class="text-blue-800 text-center text-5xl py-20"
    >
      '{{ capitalized(apartment.title) }}'
    </h1>
    <div class="flex">
      <section class="w-7/12">
        <div class="container w-full">
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
              <div class="controls">
                <i style="cursor: pointer" @click="showPrevSlide">
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
                <i style="cursor: pointer" @click="showNextSlide">
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
              </div>

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
      <section class="w-5/12 p-5">
        <div class="text-3xl mb-24 flex items-baseline">
          <h2 class="text-blue-800">Numero di camere:</h2>
          <span class="ml-5">{{ apartment.rooms }}</span>
        </div>
        <div class="text-3xl mb-24 flex items-baseline">
          <h2 class="text-blue-800">Numero di bagni:</h2>
          <span class="ml-5">{{ apartment.bathrooms }}</span>
        </div>
        <div class="text-3xl mb-24 flex items-baseline">
          <h2 class="text-blue-800">Metri quadrati:</h2>
          <span class="ml-5">{{ apartment.square_meters }}</span>
        </div>
        <div class="text-3xl mb-24 flex items-baseline">
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
    </div>
  </div>

  <div id="accordion-open" data-accordion="open">
    <h2 id="accordion-open-heading-1">
      <button
        type="button"
        class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        data-accordion-target="#accordion-open-body-1"
        aria-expanded="true"
        aria-controls="accordion-open-body-1"
      >
        <span class="flex items-center"
          ><svg
            class="w-5 h-5 mr-2 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
          What is Flowbite?</span
        >
        <svg
          data-accordion-icon
          class="w-3 h-3 rotate-180 shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h2>
    <div
      id="accordion-open-body-1"
      class="hidden"
      aria-labelledby="accordion-open-heading-1"
    >
      <div
        class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
      >
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is an open-source library of interactive components built on
          top of Tailwind CSS including buttons, dropdowns, modals, navbars, and
          more.
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          Check out this guide to learn how to
          <a
            href="/docs/getting-started/introduction/"
            class="text-blue-600 dark:text-blue-500 hover:underline"
            >get started</a
          >
          and start developing websites even faster with components on top of
          Tailwind CSS.
        </p>
      </div>
    </div>
    <h2 id="accordion-open-heading-2">
      <button
        type="button"
        class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        data-accordion-target="#accordion-open-body-2"
        aria-expanded="false"
        aria-controls="accordion-open-body-2"
      >
        <span class="flex items-center"
          ><svg
            class="w-5 h-5 mr-2 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path></svg
          >Is there a Figma file available?</span
        >
        <svg
          data-accordion-icon
          class="w-3 h-3 rotate-180 shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h2>
    <div
      id="accordion-open-body-2"
      class="hidden"
      aria-labelledby="accordion-open-heading-2"
    >
      <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is first conceptualized and designed using the Figma software
          so everything you see in the library has a design equivalent in our
          Figma file.
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          Check out the
          <a
            href="https://flowbite.com/figma/"
            class="text-blue-600 dark:text-blue-500 hover:underline"
            >Figma design system</a
          >
          based on the utility classes from Tailwind CSS and components from
          Flowbite.
        </p>
      </div>
    </div>
    <h2 id="accordion-open-heading-3">
      <button
        type="button"
        class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        data-accordion-target="#accordion-open-body-3"
        aria-expanded="false"
        aria-controls="accordion-open-body-3"
      >
        <span class="flex items-center"
          ><svg
            class="w-5 h-5 mr-2 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
          What are the differences between Flowbite and Tailwind UI?</span
        >
        <svg
          data-accordion-icon
          class="w-3 h-3 rotate-180 shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h2>
    <div
      id="accordion-open-body-3"
      class="hidden"
      aria-labelledby="accordion-open-heading-3"
    >
      <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          The main difference is that the core components from Flowbite are open
          source under the MIT license, whereas Tailwind UI is a paid product.
          Another difference is that Flowbite relies on smaller and standalone
          components, whereas Tailwind UI offers sections of pages.
        </p>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          However, we actually recommend using both Flowbite, Flowbite Pro, and
          even Tailwind UI as there is no technical reason stopping you from
          using the best of two worlds.
        </p>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          Learn more about these technologies:
        </p>
        <ul class="pl-5 text-gray-500 list-disc dark:text-gray-400">
          <li>
            <a
              href="https://flowbite.com/pro/"
              class="text-blue-600 dark:text-blue-500 hover:underline"
              >Flowbite Pro</a
            >
          </li>
          <li>
            <a
              href="https://tailwindui.com/"
              rel="nofollow"
              class="text-blue-600 dark:text-blue-500 hover:underline"
              >Tailwind UI</a
            >
          </li>
        </ul>
      </div>
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

.carousel .controls {
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
  z-index: 9;
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
