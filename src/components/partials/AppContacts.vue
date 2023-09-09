<script>
import MapsVue from "./Maps.vue";

export default {
  components: {
    MapsVue,
  },
  data() {
    return {
      staticCoordinates: [12.4963655, 41.9027835],
    };
  },
};
</script>

<template>
  <div class="py-5" >
    <div
      class="h-screen bg-cover contact bg-[url('https://images.unsplash.com/photo-1533681852052-dba7a3e4ef81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80')]"
    >
      <div class="h-screen flex flex-col justify-center items-center">
        <div
          class="flex flex-col w-5/12 sm:w-5/12 md:w-7/12 text-center bg-red-300 rounded-3xl p-3 opacity-90"
        >
          <h1 class="text-3xl md:text-5xl text-white">
            Entra in contatto con noi
          </h1>
          <h3 class="text-white mt-5">
            Contattaci per collaborare e rimanere sempre aggiornato sulle nostre
            promozioni e offerte speciali
          </h3>
        </div>
      </div>
    </div>

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
        <div class="right gap-x-6 md:flex">
          <div class="location w-full md:w-1/2">
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
          <div class="description w-full md:w-1/2">
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
  <div class="p-12" >
    <h1 class="p-6 text-center text-4xl">Puoi trovarci qui!</h1>
    <MapsVue :coordinates="staticCoordinates" />
  </div>
</template>

<style scoped>
.loader {
  position: relative;
  width: 150px;
  height: 150px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 25px 25px 75px rgba(0, 0, 0, 0.55);
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loader::before {
  content: "";
  position: absolute;
  inset: 20px;
  background: transparent;
  border: 1px dashed#444;
  border-radius: 50%;
  box-shadow: inset -5px -5px 25px rgba(0, 0, 0, 0.25),
    inset 5px 5px 35px rgba(0, 0, 0, 0.25);
}

.loader::after {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px dashed#444;
  box-shadow: inset -5px -5px 25px rgba(0, 0, 0, 0.25),
    inset 5px 5px 35px rgba(0, 0, 0, 0.25);
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
  content: "";
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
