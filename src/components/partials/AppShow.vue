<script>
import { store } from "../../../store";
import App404 from "../App404.vue";
import axios from "axios";
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
      name: "",
      last_name: "",
      email: "",
      message: "",
      apartment_id: "",
      apartments: [],
      showSuccess: false,
      isSending: false,
      hasError: false,
      isLoading: false,
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
          this.apartment_id = response.data.results.id; // Ottieni l'ID dall'API
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

    sendLead() {
      this.isLoading = true;
      this.isSending = true;
      const apartment_id = parseInt(this.$route.params.slug); // Ottieni l'ID dell'appartamento dalla URL
      console.log("Selected Apartment ID:", this.apartment_id);

      // Verifica se l'utente ha selezionato un appartamento
      if (this.apartment_id) {
        axios
          .post(this.store.baseUrl + "api/messages", {
            name: this.name,
            last_name: this.last_name,
            email: this.email,
            message: this.message,
            apartment_id: this.apartment_id, // Utilizza l'ID dell'appartamento dalla URL
          })
          .then((response) => {
            this.isSending = false;

            if (response.data.success) {
              this.showSuccess = true;
              this.resetForm(); // Ripulisci il form in caso di successo
            } else {
              this.hasError = true;
              this.resetForm(); // Ripulisci il form anche in caso di errore
            }
          })
          .catch((error) => {
            console.error("Errore durante la richiesta Axios:", error.response.data);
            this.isSending = false;
            this.hasError = true;
            this.resetForm(); // Ripulisci il form in caso di errore
          });
      } else {
        console.error("Nessun appartamento selezionato");
        this.isSending = false;
        this.hasError = true;
        this.resetForm(); // Ripulisci il form in caso di errore
      }
    },
    resetForm() {
      this.name = "";
      this.last_name = "";
      this.email = "";
      this.message = "";
      this.apartment_id = "";
    },
  },

  created() {
    this.getApartment();
    this.startAutorun();
  },
  mounted() {
    setTimeout(() => {
      initFlowbite();
    }, 1500);
  },
};
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
        <svg
          class="w-8 h-8 ml-3 text-gray-800 dark:text-white"
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
              <i
                class="arrow-up"
                style="cursor: pointer"
                @click="showPrevSlide"
              >
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
              <i
                class="arrow-down"
                style="cursor: pointer"
                @click="showNextSlide"
              >
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
        <!-- <div class="text-3xl flex items-baseline">
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
        </div> -->
      </section>
      <section class="w-7/12 mt-5">
        <h1 class="text-4xl mb-12">Servizi della struttura:</h1>
        <div class="p-5 flex flex-wrap gap-5">
          <span v-for="(utility, index) in apartment.utilities" :key="index">
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'bathroom'"
            >
              <i class="fa-solid fa-toilet mr-2"></i>
              <span class="ml-2">Bagno</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'parking'"
            >
              <i class="fa-solid fa-square-parking"></i>
              <span class="ml-2">Parcheggio</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'kitchen'"
            >
              <i class="fa-solid fa-sink"></i>
              <span class="ml-2">Cucina</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'washing machine'"
            >
              <i class="fa-solid fa-soap"></i>
              <span class="ml-2">Lavatrice</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'balcony'"
            >
              <i class="fa-solid fa-person-through-window"></i>
              <span class="ml-2">Balcone</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'garden'"
            >
              <i class="fa-brands fa-pagelines"></i>
              <span class="ml-2">Giardino</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'bar'"
            >
              <i class="fa-solid fa-martini-glass-citrus"></i>
              <span class="ml-2">Bar</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'room service'"
            >
              <i class="fa-solid fa-bell-concierge"></i>
              <span class="ml-2">Servizio in camera</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'pool'"
            >
              <i class="fa-solid fa-water-ladder"></i>
              <span class="ml-2">Piscina</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'spa'"
            >
              <i class="fa-solid fa-spray-can-sparkles"></i>
              <span class="ml-2">Spa</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'gym'"
            >
              <i class="fa-solid fa-dumbbell"></i>
              <span class="ml-2">Palestra</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'car-rent'"
            >
              <i class="fa-solid fa-car-side"></i>
              <span class="ml-2">Noleggio auto</span>
            </div>
            <div
              class="bg-blue-100 text-blue-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300"
              v-if="utility.name === 'WiFi'"
            >
              <i class="fa-solid fa-wifi"></i>
              <span class="ml-2">Wi-fi</span>
            </div>
          </span>
        </div>
      </section>
    </div>
  </div>


 <!-- ******************* contattaci *************************** -->

 <div>
    <h1 class="text-3xl my-3.5 text-center">Contact us</h1>
    <div v-if="hasError" class="m-4">
      Error in form submission!
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="hasError = false"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div
      v-if="showSuccess"
      class="bg-green-100 text-green-600 border border-green-600 py-2 px-4 rounded mb-4"
    >
      Message sent successfully!
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="showSuccess = false"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <section>
      <!-- ***************** loader ************************** -->

        <div class="scene loader" v-if="isSending">
          <div class="forest">
            <div class="tree tree1">
              <div class="branch branch-top"></div>
              <div class="branch branch-middle"></div>
            </div>

            <div class="tree tree2">
              <div class="branch branch-top"></div>
              <div class="branch branch-middle"></div>
              <div class="branch branch-bottom"></div>
            </div>

            <div class="tree tree3">
              <div class="branch branch-top"></div>
              <div class="branch branch-middle"></div>
              <div class="branch branch-bottom"></div>
            </div>

            <div class="tree tree4">
              <div class="branch branch-top"></div>
              <div class="branch branch-middle"></div>
              <div class="branch branch-bottom"></div>
            </div>

            <div class="tree tree5">
              <div class="branch branch-top"></div>
              <div class="branch branch-middle"></div>
              <div class="branch branch-bottom"></div>
            </div>

            <div class="tree tree6">
              <div class="branch branch-top"></div>
              <div class="branch branch-middle"></div>
              <div class="branch branch-bottom"></div>
            </div>

            <div class="tree tree7">
              <div class="branch branch-top"></div>
              <div class="branch branch-middle"></div>
              <div class="branch branch-bottom"></div>
            </div>
          </div>
          
          <div class="tent">
              <div class="roof"></div>
              <div class="roof-border-left">
                <div class="roof-border roof-border1"></div>
                <div class="roof-border roof-border2"></div>
                <div class="roof-border roof-border3"></div>
              </div>
              <div class="entrance">
                <div class="door left-door">
                  <div class="left-door-inner"></div>
                </div>
                <div class="door right-door">
                  <div class="right-door-inner"></div>
                </div>
              </div>
            </div>

          <div class="floor">
              <div class="ground ground1"></div>
              <div class="ground ground2"></div>
            </div>
          
          <div class="fireplace">
            <div class="support"></div>
            <div class="support"></div>
            <div class="bar"></div>
            <div class="hanger"></div>
            <div class="smoke"></div>
            <div class="pan"></div>
            <div class="fire">
              <div class="line line1">
                <div class="particle particle1"></div>
                <div class="particle particle2"></div>
                <div class="particle particle3"></div>
                <div class="particle particle4"></div>
              </div>
              <div class="line line2">
                <div class="particle particle1"></div>
                <div class="particle particle2"></div>
                <div class="particle particle3"></div>
                <div class="particle particle4"></div>
              </div>
              <div class="line line3">
                <div class="particle particle1"></div>
                <div class="particle particle2"></div>
                <div class="particle particle3"></div>
                <div class="particle particle4"></div>
              </div>
            </div>
          </div>
          
          <div class="time-wrapper">
            <div class="time">
              <div class="day"></div>
              <div class="night">
                <div class="moon"></div>
                <div class="star star1 star-big"></div>
                <div class="star star2 star-big"></div>
                <div class="star star3 star-big"></div>
                <div class="star star4"></div>
                <div class="star star5"></div>
                <div class="star star6"></div>
                <div class="star star7"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- ***************** loader ************************** -->
      <div
        class="border-solid border-2 border-dark-600 my-6 m-auto block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
        v-if="!isSending"
      >
        <div
          class="background-color: rgba(0, 0, 0, 0.6) bg-cover contact bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80')]"
          v-if="!isSending"
        >
        
          <form @submit.prevent="sendLead" v-if="!isSending">
            <div class="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear placeholder-opacity-100 dark:placeholder-opacity-100 placeholder-blue-800 dark:placeholder-blue-800 focus:placeholder-opacity-0 dark:focus:placeholder-opacity-0 focus:placeholder-blue-800 dark:focus:placeholder-blue-800"
                id="name"
                placeholder="Name"
                v-model="name"
              />
              <!-- <label
                for="name"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-blue-800 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >Name</label> -->
            </div>

            <div class="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear placeholder-opacity-100 dark:placeholder-opacity-100 placeholder-blue-800 dark:placeholder-blue-800 focus:placeholder-opacity-0 dark:focus:placeholder-opacity-0 focus:placeholder-blue-800 dark:focus:placeholder-blue-800"
                id="last_name"
                placeholder="Lastname"
                v-model="last_name"
              />
              <!-- <label
                for="last_name"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-blue-800 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >Lastname</label> -->
            </div>

            <div class="relative mb-6" data-te-input-wrapper-init>
              <input
                type="email"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear placeholder-opacity-100 dark:placeholder-opacity-100 placeholder-blue-800 dark:placeholder-blue-800 focus:placeholder-opacity-0 dark:focus:placeholder-opacity-0 focus:placeholder-blue-800 dark:focus:placeholder-blue-800"
                id="email"
                placeholder="Email"
                v-model="email"
              />
              <!-- <label
                for="email"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-blue-800 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >Email</label> -->
            </div>

            <div class="relative mb-6" data-te-input-wrapper-init>
              <textarea
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear placeholder-opacity-100 dark:placeholder-opacity-100 placeholder-blue-800 dark:placeholder-blue-800 focus:placeholder-opacity-0 dark:focus:placeholder-opacity-0 focus:placeholder-blue-800 dark:focus:placeholder-blue-800"
                id="message"
                rows="3"
                placeholder="Message"
                v-model="message"
              ></textarea>
              <!-- <label
                for="message"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-blue-800 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >Message</label> -->
            </div>

            <!-- Aggiunto campo nascosto per apartment_id -->
            <input type="hidden" v-model="apartment_id" />

            <button
              type="submit"
              class="text-blue-800 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Invia
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>


 <!-- ******************* contattaci *************************** -->


  
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

.arrow-up {
  z-index: 9;
  position: absolute;
  top: 30px;
  left: 45%;
}

.arrow-down {
  z-index: 9;
  position: absolute;
  bottom: 30px;
  left: 45%;
}

@media screen and (max-width: 900px) {
  .arrow-up {
    display: none;
  }
  .arrow-down {
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

/* loader */
@keyframes stageBackground {
  0%, 10%, 90%, 100% {
    background-color: #00B6BB;
  }

  25%, 75% {
    background-color: #0094bd;
  }
}

@keyframes earthRotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes sunrise {
  0%, 10%, 90%, 100% {
    box-shadow: 0 0 0 25px #5ad6bd, 0 0 0 40px #4acead, 0 0 0 60px rgba(74, 206, 173, 0.6), 0 0 0 90px rgba(74, 206, 173, 0.3);
  }

  25%, 75% {
    box-shadow: 0 0 0 0 #5ad6bd, 0 0 0 0 #4acead, 0 0 0 0 rgba(74, 206, 173, 0.6), 0 0 0 0 rgba(74, 206, 173, 0.3);
  }
}

@keyframes moonOrbit {
  25% {
    transform: rotate(-60deg);
  }

  50% {
    transform: rotate(-60deg);
  }

  75% {
    transform: rotate(-120deg);
  }

  0%, 100% {
    transform: rotate(-180deg);
  }
}

@keyframes nightTime {
  0%, 90% {
    opacity: 0;
  }

  50%, 75% {
    opacity: 1;
  }
}

@keyframes hotPan {
  0%, 90% {
    background-color: #74667e;
  }

  50%, 75% {
    background-color: #b2241c;
  }
}

@keyframes heat {
  0%, 90% {
    box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0.3);
  }

  50%, 75% {
    box-shadow: inset 0 -2px 0 0 white;
  }
}

@keyframes smoke {
  0%, 50%, 90%, 100% {
    opacity: 0;
  }

  50%, 75% {
    opacity: 0.7;
  }
}

@keyframes fire {
  0%, 90%, 100% {
    opacity: 0;
  }

  50%, 75% {
    opacity: 1;
  }
}

@keyframes treeShake {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-2deg);
  }

  40% {
    transform: rotate(4deg);
  }

  50% {
    transform: rotate(-4deg);
  }

  60% {
    transform: rotate(6deg);
  }

  75% {
    transform: rotate(-6deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

@keyframes fireParticles {
  0% {
    height: 30%;
    opacity: 1;
    top: 75%;
  }

  25% {
    height: 25%;
    opacity: 0.8;
    top: 40%;
  }

  50% {
    height: 15%;
    opacity: 0.6;
    top: 20%;
  }

  75% {
    height: 10%;
    opacity: 0.3;
    top: 0;
  }

  100% {
    opacity: 0;
  }
}

@keyframes fireLines {
  0%, 25%, 75%, 100% {
    bottom: 0;
  }

  50% {
    bottom: 5%;
  }
}

.scene {
  display: flex;
  margin: 0 auto 80px auto;
  justify-content: center;
  align-items: flex-end;
  width: 400px;
  height: 300px;
  position: relative;
}

.forest {
  display: flex;
  width: 75%;
  height: 90%;
  position: relative;
}

.tree {
  display: block;
  width: 50%;
  position: absolute;
  bottom: 0;
  opacity: 0.4;
}

.tree .branch {
  width: 80%;
  height: 0;
  margin: 0 auto;
  padding-left: 40%;
  padding-bottom: 50%;
  overflow: hidden;
}

.tree .branch:before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  margin-left: -600px;
  border-left: 600px solid transparent;
  border-right: 600px solid transparent;
  border-bottom: 950px solid #000;
}

.tree .branch.branch-top {
  transform-origin: 50% 100%;
  animation: treeShake 0.5s linear infinite;
}

.tree .branch.branch-middle {
  width: 90%;
  padding-left: 45%;
  padding-bottom: 65%;
  margin: 0 auto;
  margin-top: -25%;
}

.tree .branch.branch-bottom {
  width: 100%;
  padding-left: 50%;
  padding-bottom: 80%;
  margin: 0 auto;
  margin-top: -40%;
}

.tree1 {
  width: 31%;
}

.tree1 .branch-top {
  transition-delay: 0.3s;
}

.tree2 {
  width: 39%;
  left: 9%;
}

.tree2 .branch-top {
  transition-delay: 0.4s;
}

.tree3 {
  width: 32%;
  left: 24%;
}

.tree3 .branch-top {
  transition-delay: 0.5s;
}

.tree4 {
  width: 37%;
  left: 34%;
}

.tree4 .branch-top {
  transition-delay: 0.6s;
}

.tree5 {
  width: 44%;
  left: 44%;
}

.tree5 .branch-top {
  transition-delay: 0.7s;
}

.tree6 {
  width: 34%;
  left: 61%;
}

.tree6 .branch-top {
  transition-delay: 0.2s;
}

.tree7 {
  width: 24%;
  left: 76%;
}

.tree7 .branch-top {
  transition-delay: 0.1s;
}

.tent {
  width: 60%;
  height: 25%;
  position: absolute;
  bottom: -0.5%;
  right: 15%;
  z-index: 1;
  text-align: right;
}

.roof {
  display: inline-block;
  width: 45%;
  height: 100%;
  margin-right: 10%;
  position: relative;
  /*bottom: 0;
  right: 9%;*/
  z-index: 1;
  border-top: 4px solid #4D4454;
  border-right: 4px solid #4D4454;
  border-left: 4px solid #4D4454;
  border-top-right-radius: 6px;
  transform: skew(30deg);
  box-shadow: inset -3px 3px 0px 0px #F7B563;
  /*background: linear-gradient(
    to bottom, 
    rgba(246,212,132,1) 0%,
    rgba(246,212,132,1) 24%,
    rgba(#F0B656,1) 25%,
    rgba(#F0B656,1) 74%,
    rgba(235,151,53,1) 75%,
    rgba(235,151,53,1) 100%
  );*/
  background: #f6d484;
}

.roof:before {
  content: "";
  width: 70%;
  height: 70%;
  position: absolute;
  top: 15%;
  left: 15%;
  z-index: 0;
  border-radius: 10%;
  background-color: #E78C20;
}

.roof:after {
  content: "";
  height: 75%;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: linear-gradient(to bottom, rgba(231, 140, 32, 0.4) 0%, rgba(231, 140, 32, 0.4) 64%, rgba(231, 140, 32, 0.8) 65%, rgba(231, 140, 32, 0.8) 100%);
}

.roof-border-left {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 1%;
  height: 125%;
  position: absolute;
  top: 0;
  left: 35.7%;
  z-index: 1;
  transform-origin: 50% 0%;
  transform: rotate(35deg);
}

.roof-border-left .roof-border {
  display: block;
  width: 100%;
  border-radius: 2px;
  border: 2px solid #4D4454;
}

.roof-border-left .roof-border1 {
  height: 40%;
}

.roof-border-left .roof-border2 {
  height: 10%;
}

.roof-border-left .roof-border3 {
  height: 40%;
}

.door {
  width: 55px;
  height: 92px;
  position: absolute;
  bottom: 2%;
  overflow: hidden;
  z-index: 0;
  transform-origin: 0 105%;
}

.left-door {
  transform: rotate(35deg);
  position: absolute;
  left: 13.5%;
  bottom: -3%;
  z-index: 0;
}

.left-door .left-door-inner {
  width: 100%;
  height: 100%;
  transform-origin: 0 105%;
  transform: rotate(-35deg);
  position: absolute;
  top: 0;
  overflow: hidden;
  background-color: #EDDDC2;
}

.left-door .left-door-inner:before {
  content: "";
  width: 15%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background: repeating-linear-gradient(#D4BC8B, #D4BC8B 4%, #E0D2A8 5%, #E0D2A8 10%);
}

.left-door .left-door-inner:after {
  content: "";
  width: 50%;
  height: 100%;
  position: absolute;
  top: 15%;
  left: 10%;
  transform: rotate(25deg);
  background-color: #fff;
}

.right-door {
  height: 89px;
  right: 21%;
  transform-origin: 0 105%;
  transform: rotate(-30deg) scaleX(-1);
  position: absolute;
  bottom: -3%;
  z-index: 0;
}

.right-door .right-door-inner {
  width: 100%;
  height: 100%;
  transform-origin: 0 120%;
  transform: rotate(-30deg);
  position: absolute;
  bottom: 0px;
  overflow: hidden;
  background-color: #EFE7CF;
}

.right-door .right-door-inner:before {
  content: "";
  width: 50%;
  height: 100%;
  position: absolute;
  top: 15%;
  right: -28%;
  z-index: 1;
  transform: rotate(15deg);
  background-color: #524A5A;
}

.right-door .right-door-inner:after {
  content: "";
  width: 50%;
  height: 100%;
  position: absolute;
  top: 15%;
  right: -20%;
  transform: rotate(20deg);
  background-color: #fff;
}

.floor {
  width: 80%;
  position: absolute;
  right: 10%;
  bottom: 0;
  z-index: 1;
}

.floor .ground {
  position: absolute;
  border-radius: 2px;
  border: 2px solid #4D4454;
}

.floor .ground.ground1 {
  width: 65%;
  left: 0;
}

.floor .ground.ground2 {
  width: 30%;
  right: 0;
}

.fireplace {
  display: block;
  width: 24%;
  height: 20%;
  position: absolute;
  left: 5%;
}

.fireplace:before {
  content: "";
  display: block;
  width: 8%;
  position: absolute;
  bottom: -4px;
  left: 2%;
  border-radius: 2px;
  border: 2px solid #4D4454;
  background: #4D4454;
}

.fireplace .support {
  display: block;
  height: 105%;
  width: 2px;
  position: absolute;
  bottom: -5%;
  left: 10%;
  border: 2px solid #4D4454;
}

.fireplace .support:before {
  content: "";
  width: 100%;
  height: 15%;
  position: absolute;
  top: -18%;
  left: -4px;
  border-radius: 2px;
  border: 2px solid #4D4454;
  transform-origin: 100% 100%;
  transform: rotate(45deg);
}

.fireplace .support:after {
  content: "";
  width: 100%;
  height: 15%;
  position: absolute;
  top: -18%;
  left: 0px;
  border-radius: 2px;
  border: 2px solid #4D4454;
  transform-origin: 0 100%;
  transform: rotate(-45deg);
}

.fireplace .support:nth-child(1) {
  left: 85%;
}

.fireplace .bar {
  width: 100%;
  height: 2px;
  border-radius: 2px;
  border: 2px solid #4D4454;
}

.fireplace .hanger {
  display: block;
  width: 2px;
  height: 25%;
  margin-left: -4px;
  position: absolute;
  left: 50%;
  border: 2px solid #4D4454;
}

.fireplace .pan {
  display: block;
  width: 25%;
  height: 50%;
  border-radius: 50%;
  border: 4px solid #4D4454;
  position: absolute;
  top: 25%;
  left: 35%;
  overflow: hidden;
  animation: heat 5s linear infinite;
}

.fireplace .pan:before {
  content: "";
  display: block;
  height: 53%;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: -1;
  border-top: 4px solid #4D4454;
  background-color: #74667e;
  animation: hotPan 5s linear infinite;
}

.fireplace .smoke {
  display: block;
  width: 20%;
  height: 25%;
  position: absolute;
  top: 25%;
  left: 37%;
  background-color: white;
  filter: blur(5px);
  animation: smoke 5s linear infinite;
}

.fireplace .fire {
  display: block;
  width: 25%;
  height: 120%;
  position: absolute;
  bottom: 0;
  left: 33%;
  z-index: 1;
  animation: fire 5s linear infinite;
}

.fireplace .fire:before {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: -4px;
  z-index: 1;
  border-radius: 2px;
  border: 1px solid #efb54a;
  background-color: #efb54a;
}

.fireplace .fire .line {
  display: block;
  width: 2px;
  height: 100%;
  position: absolute;
  bottom: 0;
  animation: fireLines 1s linear infinite;
}

.fireplace .fire .line2 {
  left: 50%;
  margin-left: -1px;
  animation-delay: 0.3s;
}

.fireplace .fire .line3 {
  right: 0;
  animation-delay: 0.5s;
}

.fireplace .fire .line .particle {
  height: 10%;
  position: absolute;
  top: 100%;
  z-index: 1;
  border-radius: 2px;
  border: 2px solid #efb54a;
  animation: fireParticles 0.5s linear infinite;
}

.fireplace .fire .line .particle1 {
  animation-delay: 0.1s;
}

.fireplace .fire .line .particle2 {
  animation-delay: 0.3s;
}

.fireplace .fire .line .particle3 {
  animation-delay: 0.6s;
}

.fireplace .fire .line .particle4 {
  animation-delay: 0.9s;
}

.time-wrapper {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.time {
  display: block;
  width: 100%;
  height: 200%;
  position: absolute;
  transform-origin: 50% 50%;
  transform: rotate(270deg);
  animation: earthRotation 5s linear infinite;
}

.time .day {
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20%;
  left: 40%;
  border-radius: 50%;
  box-shadow: 0 0 0 25px #5ad6bd, 0 0 0 40px #4acead, 0 0 0 60px rgba(74, 206, 173, 0.6), 0 0 0 90px rgba(74, 206, 173, 0.3);
  animation: sunrise 5s ease-in-out infinite;
  background-color: #ef9431;
}

.time .night {
  animation: nightTime 5s ease-in-out infinite;
}

.time .night .star {
  display: block;
  width: 4px;
  height: 4px;
  position: absolute;
  bottom: 10%;
  border-radius: 50%;
  background-color: #fff;
}

.time .night .star-big {
  width: 6px;
  height: 6px;
}

.time .night .star1 {
  right: 23%;
  bottom: 25%;
}

.time .night .star2 {
  right: 35%;
  bottom: 18%;
}

.time .night .star3 {
  right: 47%;
  bottom: 25%;
}

.time .night .star4 {
  right: 22%;
  bottom: 20%;
}

.time .night .star5 {
  right: 18%;
  bottom: 30%;
}

.time .night .star6 {
  right: 60%;
  bottom: 20%;
}

.time .night .star7 {
  right: 70%;
  bottom: 23%;
}

.time .night .moon {
  display: block;
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 22%;
  right: 33%;
  border-radius: 50%;
  transform: rotate(-60deg);
  box-shadow: 9px 9px 3px 0 white;
  filter: blur(1px);
  animation: moonOrbit 5s ease-in-out infinite;
}

.time .night .moon:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: -9px;
  left: 9px;
  border-radius: 50%;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.05), 0 0 0 15px rgba(255, 255, 255, 0.05), 0 0 0 25px rgba(255, 255, 255, 0.05), 0 0 0 35px rgba(255, 255, 255, 0.05);
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
