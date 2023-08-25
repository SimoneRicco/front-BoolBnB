<script>
export default {};
</script>

<template>
  <main
    class="bg-center bg-no-repeat bg-[url('https://101-zone.com/wp-content/uploads/2022/04/portorosa.jpg')]"
  >
    <section class="">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div
          class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          style="background-color: #f8b4b4"
        >
        
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div class="flex justify-center w-full">
            <a
              href="#"
              class="flex items-center  text-2xl font-semibold text-black"
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
              class="text-xl font-bold leading-tight tracking-tight text-black-900 md:text-2xl dark:text-white"
            >
              Crea un nuovo account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-blackblack dark:text-white"
                  >Indirizzo Email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-black-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-300"
                  placeholder="indirizzo@email.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-black-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  required=""
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Conferma password</label
                >
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  required=""
                />
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="terms"
                    class="font-light text-black-300 dark:text-black-300"
                    >Accetto i
                    <a
                      class="font-semibold text-black-500 hover:underline dark:text-primary-500"
                      href="#"
                      >Termini e Condizioni</a
                    ></label
                  >
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-white ring-gray-600 border border-gray-300"
              >
                Crea l'account
              </button>
              <p class="text-sm font-light text-black-300 dark:text-black-400">
                Già posssiedi un account?<a
                  href="#"
                  class="font-bold text-primary-600 hover:underline dark:text-primary-500 ml-3"
                  >Accedi qui</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
