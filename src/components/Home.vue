<script>
export default {};
</script>

<template>
  <div class="jumbo">
    <img src="../images/island.jpg" alt="island" />
    <span class="jumbo-text">Welcome to BoolBnB</span>
  </div>
  <div class="container mx-auto px-4">
    <!-- Dati -->
  </div>
</template>

<style>
.jumbo {
  background-color: yellow;
  height: calc(100vh - 60px);
  position: relative;
}
.jumbo img {
  height: 100%;
  width: 100%;
}
.jumbo-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  padding-inline: 1rem;
  border-radius: 10px;
}
</style>
