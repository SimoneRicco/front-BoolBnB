<script>
import axios from "axios";
import { store } from "../../../store";
import { initFlowbite } from "flowbite";
import ApartmentCardVue from "./ApartmentCard.vue";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as ttServices from "@tomtom-international/web-sdk-services";

export default {
  data() {
    return {
      results: [],
      Searchtext: "",
      filterRooms: null,
      filterBeds: null,
      radius: 20,
      arrApartments: [],
      arrUtilities: [],
      currentPage: 1,
      nPages: 0,
      store,
      min: 1,
      max: 20,
      filterUtilities: [],
      filterAddresses: [],
      latitude: null,
      longitude: null,
      distanceNumber: 20,
      addressesDistanceOne: [],
      filteredApartment: [],
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

    getCoords(){
        axios
          .get("https://api.tomtom.com/search/2/geocode/" + this.Searchtext + ".json?key=74CVsbN34KoIljJqOriAYN2ZMEYU1cwO")
          .then((response) => {
            this.latitude = response.data.results[0].position.lat,
            this.longitude = response.data.results[0].position.lon
             console.log ("latitudine", this.latitude)
            console.log ("longitudine", this.longitude)

          });
    },

    getApartments() {
      axios
        .get(this.store.baseUrl + "api/apartments", {
          params: {
            q: this.Searchtext,
            rooms: this.filterRooms,
            beds: this.filterBeds,
            utilities: this.filterUtilities,
            page: this.currentPage,
          },
        })
        .then((response) => {
          this.arrApartments = response.data.results.data;
          this.nPages = response.data.results.last_page;
          // this.Searchtext = "";
        });
    },

    getUtilities() {
      axios.get(this.store.baseUrl + "api/utilities").then((response) => {
        this.arrUtilities = response.data.results;
      });
    },


    autocomplete() {
      // Ottenimento dell'indirizzo dal campo input
      const search = document.querySelector("#search");

      if (search.value) {
        ttServices.services
          .geocode({
            batchMode: "async",
            key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
            query: search.value,
            countrySet: "IT",
            language: "it-IT",
          })
          .then(function (response) {
            const results = response.results;
            // console.log("results", results)
        

            // se abbiamo dei risultati ottenuti
            if (results.length) {
              for (const elem of results) {
                document.getElementById("datalistOptions").innerHTML += `
                                    <option value="${elem.address.freeformAddress}">${elem.address.freeformAddress}</option>
                                    `;
              }
            }
          })
          .catch((error) => {
            console.error(
              "Si è verificato un errore nella richiesta al servizio di geocodifica di TomTom:",
              error
            );
          });
      }
    },

    advancedSearchApartments() {
        this.addressesDistance = [],
        axios
        .get(this.store.baseUrl + "api/addresses",)
        .then((response) => {
          this.filterAddresses = response.data.results;
        //    console.log("Addresses filtrati", this.filterAddresses);

            const closestAddresses = [];
            
            this.filterAddresses.forEach((address) => {
              const R = 6371; // raggio della Terra in km
              const lat1 = this.latitude; //latitudine ricerca
              const lon1 = this.longitude; //longitudine ricerca
              const lat2 = address.latitude; //latitudine appartamento
              const lon2 = address.longitude; // longitudine appartamento

              const dLat = ((lat2 - lat1) * Math.PI) / 180;
              const dLon = ((lon2 - lon1) * Math.PI) / 180;
              const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((lat1 * Math.PI) / 180) *
                  Math.cos((lat2 * Math.PI) / 180) *
                  Math.sin(dLon / 2) *
                  Math.sin(dLon / 2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              const distance = R * c; // distanza in km
             address.distance = distance.toFixed(1);

           

            //    console.log('distanza', apartment.distance);

              if (address.distance <= this.distanceNumber) {
                closestAddresses.push(address);

                //  console.log("APPARTAMENTO DISTANZA", this.addressesDistance);

              } 
              this.addressesDistanceOne = closestAddresses;
            });  

          
        
        });
    },

     radiusFilter(){
        this.filteredApartment = []
        this.arrApartments.forEach(apartment => {

        
             this.addressesDistanceOne.forEach(address => {
                if(address.id == apartment.id) {
                    return this.filteredApartment.push(apartment) 
                 }
               }); 

        }); 
    },
    


  },

  created() {
    this.getUtilities();
    this.getCoords
  },

  watch: {
    currentPage() {
      this.getApartments();
    },
  },

  mounted() {
    setTimeout(() => {
      initFlowbite();
    }, 1500);
  },
};
</script>

<template>
  <section>
    <div
      class="relative h-[85rem] bg-center flex-col text-center flex justify-center items-center"
      style="
        background-image: url(https://www.tourissimo.travel/hs-fs/hubfs/Blog_pictures/Joy%20of%20Travel%20Planning/Travel%20Plans%20Blog.jpg?width=2240&name=Travel%20Plans%20Blog.jpg);
        height: 38rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
      "
    >
      <h1 style="z-index: 20" class="text-white text-6xl mt-12">
        Benvenuto Nella sezione di ricerca avanzata.
      </h1>
      <h2 style="z-index: 20" class="text-white text-3xl mt-12">
        Qui potrai cercare con facilità la destinazione dei tuoi sogni!
      </h2>
      <div class="black-layer"></div>
    </div>
  </section>
  <section
    class="p-12"
    style="border-top: 3px solid #f7daf2; border-bottom: 3px solid #f7daf2"
  >
    <h1 class="text-4xl">Cerca per:</h1>
    <form class="mt-5" method="GET">
      <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Città o indirizzo:
      </h3>
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <!-- search -->
        <div class="col-xl-9 col-lg-9 col-md-7 col-12">
          <input
            class="form-control"
            id="search"
            name="search"
            type="search"
            placeholder="Inserisci la città o l'indirizzo"
            aria-label="Search"
            v-model="this.Searchtext"
            list="datalistOptions"
            @keyup="autocomplete()"
            @keyup.enter=""
          />
          <datalist id="datalistOptions"> </datalist>
        </div>
      </div>

      <div class="grid gap-6 mb-6 md:grid-cols-2 mt-12">
        <div>
          <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Numero di stanze:
          </h3>
          <select
           
            v-model="this.filterRooms"
            id="filterRooms"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div>
          <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Numero di letti:
          </h3>
          <select
            
            v-model="this.filterBeds"
            id="filterBeds"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

       <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select v-model="this.distanceNumber" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a distance</option>
        <option type="number" value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        </select> 

        <div>
          <label
            for="first_name"
            class="mt-12 mb-4 text-xl font-semibold text-gray-900 dark:text-white block"
            >Seleziona servizi:</label
          >

          <button
            id="dropdownSearchButton"
            data-dropdown-toggle="dropdownSearch"
            class="text-end inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Servizi offerti
            <svg
              class="w-2.5 h-2.5 ml-2.5"
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
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          

          <!-- Dropdown menu -->
          <div
            id="dropdownSearch"
            class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700"
          >
            <div class="p-3">
              <label for="input-group-search" class="sr-only">Cerca</label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="input-group-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search user"
                />
              </div>
            </div>
            <ul
              class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownSearchButton"
            >
              <li v-for="utility in arrUtilities" :key="utility.id">
                <div
                  class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <input
                    
                    v-model="this.filterUtilities"
                    id="utility"
                    type="checkbox"
                    :value="utility.id"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="utility"
                    class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >{{ utility.name }}</label
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button
          type="button"
          @click="getCoords(), advancedSearchApartments(), getApartments(), radiusFilter()"
          class="w-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          search
        </button>
      </div>
    </form>
  </section>
  <section class="mt-5">
    <!-- <div v-if="Searchtext == ''">
            </div> -->

    <div class="flex flex-wrap gap-5 justify-center">
      <ApartmentCardVue
        v-for="apartment in filteredApartment"
        :key="apartment.id"
        :objApartment="apartment"
      />
    </div>
    <div class="mt-5 w-full flex justify-center">
      <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px text-sm">
          <li>
            <a
              :class="{ disabled: currentPage == 1 }"
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
              @click="currentPage = page"
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {{ page }}
            </a>
          </li>

          <li>
            <a
              :class="{ disabled: currentPage == nPages }"
              @click="currentPage++"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.black-layer {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"]::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: ew-resize;
    background: #fff;
    box-shadow: -405px 0 0 400px #605e5c;
    border-radius: 50%;
  }
}
</style>
