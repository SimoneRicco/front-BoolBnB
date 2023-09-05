<script>
import axios from "axios";
import { store } from "../../../store";

export default {
  data() {
    return {
      store,
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
  methods: {
        sendLead() {
      this.isLoading = true;
      this.isSending = true;
      console.log("Selected Apartment ID:", this.apartment_id);

      // Verifica se l'utente ha selezionato un appartamento
      if (this.apartment_id) {
        axios
          .post(this.store.baseUrl + "api/messages", {
            name: this.name,
            last_name: this.last_name,
            email: this.email,
            message: this.message,
            apartment_id: this.apartment_id,
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
    getApartments() {
      axios
        .get(this.store.baseUrl + "api/apartments/")
        .then((response) => {
          this.apartments = response.data.results.data;
          console.log(this.apartments);
        })
        .catch(() => (this.is404 = true));
    },
  },
  created() {
    this.getApartments();
  },
};
</script>

<template>
  <div class="py-5" style="background-color: #f7daf2">
    <div
      class="h-screen bg-cover contact bg-[url('https://images.unsplash.com/photo-1533681852052-dba7a3e4ef81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80')]"
    >
      <div class="h-screen flex flex-col justify-center items-center">
        <div
          class="flex flex-col w-fit text-center bg-red-300 rounded-3xl p-3 opacity-90"
        >
          <h1 class="text-5xl text-white">Entra in contatto con noi</h1>
          <h3 class="text-white mt-5">
            Contattaci per collaborare e rimanere sempre aggiornato sulle nostre
            promozioni e offerte speciali
          </h3>
        </div>
      </div>
    </div>
    <h1 class="text-3xl my-3.5 text-center">
      Iscriviti alla nostra newsletter
    </h1>

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

  <div class="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
  <section class="m-5 p-4 dark:text-gray-50 row-span-3">
    <div class="p-5">
      <div v-if="isSending" class="loader">
        <span></span>
      </div>
      <form
        @submit.prevent="sendLead"
        novalidate
        class="container flex flex-col mx-auto space-y-12"
        v-else
      >
        <fieldset
          class="bg-blue-800 grid grid-cols-4 gap-4 p-6 rounded-md shadow-sm dark:bg-gray-900"
        >
          <h1 class="text-3xl font-bold text-white mx-5">Contact Us</h1>
        </fieldset>

        <fieldset
          class="bg-blue-800 py-10 grid grid-cols-4 gap-4 px-6 rounded-md shadow-sm dark:bg-gray-900"
        >
          <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-6">
            <div class="col-span-full sm:col-span-6">
              <label for="name" class="block text-sm text-white font-medium"
                >Name</label
              >
              <input
                type="text"
                class="form-input mt-1 block w-full rounded-md border-gray-300"
                id="name"
                v-model="name"
              />
            </div>
          </div>

          <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-6">
            <div class="col-span-full sm:col-span-6">
              <label for="last_name" class="block text-sm text-white font-medium"
                >Last Name</label
              >
              <input
                type="text"
                class="form-input mt-1 block w-full rounded-md border-gray-300"
                id="last_name"
                v-model="last_name"
              />
            </div>
          </div>

          <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-6">
            <div class="col-span-full sm:col-span-6">
              <label for="email" class="block text-sm text-white font-medium"
                >Email address</label
              >
              <input
                type="email"
                class="form-input mt-1 block w-full rounded-md border-gray-300"
                id="email"
                v-model="email"
              />
            </div>
          </div>

          <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-6">
            <div class="col-span-full sm:col-span-6">
              <label
                for="message"
                class="block text-sm text-white font-medium"
                >Message</label
              >
              <textarea
                id="message"
                class="form-textarea mt-1 block w-full rounded-md border-gray-300"
                rows="5"
                v-model="message"
              ></textarea>
            </div>
          </div>

          <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-6">
            <div class="col-span-full sm:col-span-6">
              <label for="apartment_id" class="block text-sm text-white font-medium">Apartment</label>
              <select v-model="apartment_id" class="form-select mt-1 block w-full rounded-md border-gray-300" id="apartment_id" name="apartment_id">
                <option value="">Select an apartment</option>
                <option v-for="apartment in apartments" :value="apartment.id" :key="apartment.id">{{ apartment.title }}</option>
              </select>
            </div>
          </div>
          
        </fieldset>

        <div
          class="bg-blue-800 py-4 flex justify-center rounded-md shadow-sm dark:bg-gray-900"
        >
          <button
            type="submit"
            class="text-white px-4 py-2 border rounded-md dark:border-gray-100"
            :class="{ 'opacity-50 pointer-events-none': isSending }"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
  <div class="bg-contacts flex items-center justify-center">
    <i
      class="fa-solid fa-envelopes-bulk text-7xl md:text-9xl lg:text-[20rem] text-blue-800"
    ></i>
  </div>
</div>


    <section>
      <div
        class="border-solid border-2 border-dark-600 my-6 m-auto block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
      >
        <div
          class="bg-cover contact bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80')]"
        >
          <form>
            <div class="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInput7"
                placeholder="Nome"
              />
              <label
                for="exampleInput7"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Nome
              </label>
            </div>

            <div class="relative mb-6" data-te-input-wrapper-init>
              <input
                type="email"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInput8"
                placeholder="Email"
              />
              <label
                for="exampleInput8"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Email
              </label>
            </div>

            <div class="relative mb-6" data-te-input-wrapper-init>
              <textarea
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlTextarea13"
                rows="3"
                placeholder="Messaggio"
              ></textarea>
              <label
                for="exampleFormControlTextarea13"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Messaggio
              </label>
            </div>

            <div
              class="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]"
            >
              <input
                class="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                value=""
                id="exampleCheck10"
              />
              <label
                class="inline-block pl-[0.15rem] hover:cursor-pointer"
                for="exampleCheck10"
              >
                Ricevi una copia del messaggio
              </label>
            </div>

            <button
              type="submit"
              class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Invia
            </button>
          </form>
        </div>
      </div>
    </section>
    <div class="w-screen flex flex-col w-fit content-center flex-wrap">
      <div class="w-1/2 flex justify-center items-center">
        <div class="left bg-red-300 p-4 my-6 rounded-3xl">
          <h1 class="mb-12 text-4xl">Seguici sui nostri social!</h1>
          <div class="social flex justify-center gap-x-10">
            <a href="">
              <svg
                class="w-12 h-12 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a href="">
              <svg
                class="w-12 h-12 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fill-rule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a href="">
              <svg
                class="w-12 h-12 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.7 3.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.84c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.84A4.225 4.225 0 0 0 .3 3.038a30.148 30.148 0 0 0-.2 3.206v1.5c.01 1.071.076 2.142.2 3.206.094.712.363 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.15 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965c.124-1.064.19-2.135.2-3.206V6.243a30.672 30.672 0 0 0-.202-3.206ZM8.008 9.59V3.97l5.4 2.819-5.4 2.8Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="w-1/2 flex justify-center items-center">
        <div class="right gap-x-6 flex">
          <div class="location w-1/2">
            <h1 class="mb-4 text-2xl">Scegli la meta che più ti affascina!</h1>
            <span
              >Potrai trovare strutture situate in tutta Europa, affidati a noi
              e non te ne pentirai!</span
            >
            <img
              class="my-3 rounded-1xl"
              src="https://plus.unsplash.com/premium_photo-1663054911397-c7fe60ec3849?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
              alt=""
            />
          </div>
          <div class="description w-1/2">
            <span
              >Esplora l'Europa grazie alla nostra piattaforma di prenotazione
              di viaggi. Scegli tra una vasta gamma di strutture in tutta
              Europa, dalla maestosità delle Alpi alle incantevoli coste del
              Mediterraneo. La tua avventura europea è a portata di clic, con
              recensioni autentiche e dettagli esaustivi per aiutarti a prendere
              la decisione migliore.</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.loader {
  position: relative;
  width: 150px;
  height: 150px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 25px 25px 75px rgba(0,0,0,0.55);
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loader::before {
  content: '';
  position: absolute;
  inset: 20px;
  background: transparent;
  border: 1px dashed#444;
  border-radius: 50%;
  box-shadow: inset -5px -5px 25px rgba(0,0,0,0.25),
  inset 5px 5px 35px rgba(0,0,0,0.25);
}

.loader::after {
  content: '';
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px dashed#444;
  box-shadow: inset -5px -5px 25px rgba(0,0,0,0.25),
  inset 5px 5px 35px rgba(0,0,0,0.25);
}

.loader span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 100%;
  background: transparent;
  transform-origin: top left;
  animation: radar81 2s linear infinite;
  border-top: 1px dashed #fff;
}

.loader span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: seagreen;
  transform-origin: top left;
  transform: rotate(-55deg);
  filter: blur(30px) drop-shadow(20px 20px 20px seagreen);
}

@keyframes radar81 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
