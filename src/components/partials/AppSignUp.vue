<script>
export default {};
</script>

<template>
  <main>
    <div class="flex w-full justify-center items-center h-screen">
    <section class="max-w-xl flex-1 pb-10">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      > 
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          style="background-color: #f8b4b4">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div class="flex justify-center ">
            <a
          href="#"
          class="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
      </div>
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Accedi al tuo account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-black-300 dark:text-white"
                  >Inserisci Email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="nome@email.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium black-300 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-black-300 dark:text-gray-300"
                      >Ricordami</label
                    >
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Password dimenticata?</a
                >
              </div>
              <button
                type="submit"
                class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-white ring-gray-600 border border-gray-300"
              >
                Accedi
              </button>
              <p class="text-sm font-light text-black-300 dark:text-gray-400">
                Non hai ancora un account?
                <a
                  href="#"
                  class="font-semibold text-black-900 hover:underline dark:text-primary-500"
                  >crealo qui</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
</div>
  </main>
</template>

<style scoped>
  main{
    background-image: url(https://c.wallhere.com/photos/c3/cd/pink_sea_water_sunset_horizon_clouds_purple-1448803.jpg!d);
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
