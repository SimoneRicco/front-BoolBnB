<script>
import axios from "axios";
import { store } from "../../store.js";
import ApartmentCardVue from "./partials/ApartmentCard.vue";

export default {
  data() {
    return {
      arrApartments: [],
      currentPage: 1,
      nPages: 0,
      store,
    };
  },

  components: {
    ApartmentCardVue,
  },

  methods: {
    changePage(page) {
      this.currentPage = page;
      this.getApartments();
    },

    getApartments() {
      axios
        .get(this.store.baseUrl + "api/apartments", {
          params: {
            page: this.currentPage,
          },
        })
        .then((response) => {
          this.arrApartments = response.data.results.data;
          this.nPages = response.data.results.last_page;
        });
    },

    // getImages() {
    // 	axios.get(this.store.baseUrl + 'api/images').then(response => {
    // 		this.arrImages = response.data.results;
    // 	});
    // },
  },

  created() {
    this.getApartments();
    // this.getImages();
  },

  watch: {
    currentPage() {
      this.getApartments();
    },
  },
  beforeRouteEnter(to, from, next) {
    next();
  },

  beforeRouteLeave(to, from, next) {
    next();
  },
  mounted() {
    setTimeout(() => {
      initFlowbite();
    }, 1500);
  },
};
</script>

<template>
  

  <section id="carousel" class="mt-24">
    <div id="indicators-carousel" class="relative w-full" data-carousel="slide">
      <div class="opacity h-full w-full absolute z-30"></div>
      <div class="centered">
        <h1 class="text-md md:text-4xl text-white mb-3" style="font-style: oblique;">Don't skip the trip...Choose Haventrip!</h1>
        <button class="mt-24 search animate-bounce text-sm md:text-xl mt-3 text-white bg-blue-500 hover:bg-blue-700">
          <router-link :to="{ name: 'search' }">
            Cerca la tua destinazione...
          </router-link>
        </button>
      </div>

      <!-- Carousel wrapper -->
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <!-- Item 1 -->
        <div
          class="hidden duration-700 ease-in-out"
          data-carousel-item="active"
        >
          <img
            src="https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <!-- Item 3 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="https://fastly.picsum.photos/id/15/2500/1667.jpg?hmac=Lv03D1Y3AsZ9L2tMMC1KQZekBVaQSDc1waqJ54IHvo4"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <!-- Item 4 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <!-- Item 5 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
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
        <button
          type="button"
          class="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 5"
          data-carousel-slide-to="4"
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

  

  <section class="p-5">
    <div class="flex">
      <h1 class="text-4xl">In Evidenza</h1>
      <div class="ml-3 flex items-baseline">
        <svg
          class="w-6 h-full text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="orange"
          viewBox="0 0 17 20"
        >
          <path
            d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z"
          />
        </svg>
        <svg
          class="w-6 h-full ml-3 text-gray-800 dark:text-white"
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
    <div class="mt-12 flex gap-5 w-full flex-wrap">
      <ApartmentCardVue
        v-for="apartment in arrApartments"
        :key="apartment.id"
        :objApartment="apartment"
      />


      <div class="w-full flex justify-center">
        <nav style="z-index: 1;" aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px text-sm">
            <li>
              <a
                style="cursor: pointer;"
                :class="{ invisible: currentPage == 1 }"
                @click="currentPage--"
                class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >Previous</a
              >
            </li>

            <li
              v-for="page in nPages"
              :key="page"
              class="page-item"
              :class="{ active: page == currentPage }"
            >
              <a
                style="cursor: pointer;"
                :class="{ disabled: currentPage == 1 }"
                @click="currentPage = page"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {{ page }}
              </a>
            </li>

            <li>
              <a
                style="cursor: pointer;"
                :class="{ invisible: currentPage == nPages }"
                @click="currentPage++"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
  <section class="p-5 w-full lg:flex">
    <div class="w-full lg:w-1/3">
      <img style="border-radius: 20px;" src="https://worldinparis.com/wp-content/uploads/2018/06/paris-travel-planning.jpg" alt="">
    </div>
    <div class="w-full lg:w-2/3 p-5">
      <h2 class="title">
        <span class="title-word title-word-1 text-4xl">Inizia a </span>
        <span class="title-word title-word-2 text-4xl"> viaggiare</span>
        <span class="title-word title-word-3 text-4xl"> con</span>
        <span class="title-word title-word-4 text-4xl"> Haventrip!</span>
      </h2>
      <p class="text-xl mt-5">Con HavenTrip hai tutto ciò che ti serve per iniziare a pianificare la tua vacanza da sogno!</p>
      <div class="md:flex gap-3 mt-5">
      <div href="#" class="mt-3 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-blue-900 dark:text-white">Cerca e richiedi informazioni.</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">HavenTrip verifica personalmente ogni struttura presente nel sistema.</p>
        </div>
      </div>
      
      <div href="#" class="mt-3 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> 
          <div>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-blue-900 dark:text-white">Affidati a un team di esperti.</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">La nostra mission ci impone di finalizzare con tutte le risorse possibili l'idea di vacanza richiesta dai nostri clienti.</p>
          </div>
      </div>
      </div>
    </div>
  </section>
  
    
  <section class="mt-10 bg-center bg-no-repeat bg-[url('https://en.bailypearl.com/wp-content/uploads/2021/05/villa-la-croix-valmer-facade-2-2-2560x1633.jpg')] bg-gray-400 bg-blend-multiply">
      <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Viaggiare per credere!</h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">La casa dei tuoi sogni...aspetta solo te.</p>
      </div>
  </section>

</template>

<style scoped>
.search {
  width: 15em;
  height: 3em;
  border-radius: 20px;
}



.centered {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 30%;
  z-index: 30;
}

@media screen and (max-width: 750px) {
  #filters {
    display: none;
  }

  #carousel {
    margin-top: 5.5em;
  }

  #slogan {
    font-size: 2em;
  }
  .search {
    font-size: 0.8em;
  }
}
.opacity {
  background-color: rgba(0, 0, 0, 0.3);
}

.title-word {
  animation: color-animation 4s linear infinite;
}

.title-word-1 {
  --color-1: #DF8453;
  --color-2: #3D8DAE;
  --color-3: #E4A9A8;
}

.title-word-2 {
  --color-1: #DBAD4A;
  --color-2: #ACCFCB;
  --color-3: #17494D;
}

.title-word-3 {
  --color-1: #ACCFCB;
  --color-2: #E4A9A8;
  --color-3: #ACCFCB;
}

.title-word-4 {
  --color-1: #3D8DAE;
  --color-2: #DF8453;
  --color-3: #E4A9A8;
}

@keyframes color-animation {
  0%    {color: var(--color-1)}
  32%   {color: var(--color-1)}
  33%   {color: var(--color-2)}
  65%   {color: var(--color-2)}
  66%   {color: var(--color-3)}
  99%   {color: var(--color-3)}
  100%  {color: var(--color-1)}
}

/* Here are just some visual styles. 🖌 */

.container {
  display: grid;
  place-items: center;  
  text-align: center;
  height: 100vh
}

.title {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 2.5vw;
}
</style>
