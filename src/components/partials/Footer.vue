<script>
export default {};
</script>

<template>
  <footer class="bg-slate-100">
    <section class="w-full md:flex justify-between">
      <div class="p-5 sm:1/1">
      <h1 style="font-style: italic;" class="text-5xl">HavenTrip</h1>
      <h3 class="mt-5 text-2xl" style="font-style: oblique;">Da viaggiatori....per Viaggiatori...</h3>
      <div class="mt-1 flex">
        <ul
        class="flex flex-wrap items-center mt-3 text-2xl font-medium  dark:text-blue-400 sm:mt-0"
      >
        <li>
          <a href="https://www.instagram.com/" class="mr-4 hover:underline md:mr-6">
            <i class="fa-brands fa-instagram"></i
          ></a>
        </li>
        <li>
          <a href="https://www.youtube.com/" class="mr-4 hover:underline md:mr-6"
            ><i class="fa-brands fa-youtube"></i
          ></a>
        </li>
        <li>
          <a href="https://twitter.com/?lang=en" class="mr-4 hover:underline md:mr-6"
            ><i class="fa-brands fa-x-twitter"></i
          ></a>
        </li>
        <li>
          <a href="https://www.facebook.com/" class="mr-4 hover:underline md:mr-6"
            ><i class="fa-brands fa-facebook"></i></a>
        </li>
      </ul>
      </div>
    </div>


    <div class="p-5 sm:w-1/1 md:flex">
      <ul class="mr-20">
        <li class="text-2xl"><router-link :to="{ name: 'about' }">About Us</router-link></li>
        <li>
          <router-link
              :to="{ name: 'about' }"
              >Chi siamo
            </router-link>
        </li>
        <li>Blog</li>
        <li>Press-room</li>
        <li>Careers</li>
      </ul>
      <ul class="mr-20">
        <li class="text-2xl"><a href="http://localhost:8000/">Resources</a></li>
        <li>
          <router-link
              :to="{ name: 'search' }"
              >Il nostro motore di ricerca
            </router-link>
        </li>
        <li>Places</li>
        <li>Countries</li>
        <li>Experiences</li>
      </ul>
      <ul class="mr-20">
        <li class="text-2xl"><router-link :to="{ name: 'contacts' }">Contacts</router-link></li>
        <li>
            <router-link
              :to="{ name: 'contacts' }"
              >Contatti
            </router-link
            >
        </li>
        <li>0883 010203</li>
      </ul>
    </div>
    </section>
    <div
      class="p-2"
    >
      <span class="text-md text-gray-500 sm:text-center dark:text-gray-400"
        >© 2023
        <a href="https://flowbite.com/" class="hover:underline">BoolBnB™</a>.
        All Rights Reserved.
      </span>
      
    </div>
  </footer>
</template>

<style scoped>

footer{
  position: static;
}


li{
  margin-top: 1em;
  cursor: pointer;
}
li:hover{
  color: blue;
}


</style>
