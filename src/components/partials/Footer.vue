<script>
export default {};
</script>

<template>
  <footer class="bg-slate-100">
    <section class="w-full md:flex justify-between">
      <div class="p-5 sm:1/1">
      <h1 style="font-style: italic;" class="text-5xl">HavenTrip</h1>
      <h3 class="mt-5 text-2xl" style="font-style: oblique;">Da viaggiatori....per Viaggiatori...</h3>
      <div class="mt-1 flex mt-5">
        <ul class="socials flex">
        <li class="social">
          <a href="#">
            <i class="fab fa-youtube"></i>
          </a>
        </li>
        <li class="social">
          <a href="#">
            <i class="fab fa-facebook"></i>
          </a>
          </li>
        <li class="social">
          <a href="#">
            <i class="fab fa-twitter"></i>
          </a>
          
        </li>
        <li class="social">
          <a href="#">
            <i class="fab fa-instagram"></i>
          </a> 
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


.socials {
  transform: translate( -1%);
}

.socials .social {
  list-style: none;
  margin: 0 15px;
}

.socials .social a {
  position: relative; 
  display: block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 63px;
  background: #333;
  border-radius: 50%;
  font-size: 30px;
  color: #666;
  transition: .5s;
}

.socials .social a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #106cff;
  transition: .5s;
  transform: scale(.9);
  z-index: -1;
}

.socials .social a:hover::before {
  transform: scale(1.1);
  box-shadow: 0 0 15px #106cff;
}

.socials .social a:hover {
  color: #106cff;
  box-shadow: 0 0 5px #106cff;
  text-shadow: 0 0 5px #106cff;
}


</style>
