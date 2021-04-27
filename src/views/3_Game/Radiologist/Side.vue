<template>
  <div class="side-container">
    <ul class="infos">
      <li>Robert Deniro</li>
      <li>male</li>
      <li>01/08/1997</li>
      <li>4328 DSIO</li>
      <li>CHEST LAT</li>
      <li>3-March-2019</li>
      <li>10:02:91</li>
      <li>Image 1/2</li>
      <li>Serie: 3</li>
      <li>number 0298716892</li>
    </ul>

    <div class="range">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <ul class="infos-2">
      <li>W 82</li>
      <li>L 92</li>
      <br />
      <li>P 98 H 02 L29</li>
      <li>TSE/SE/ME(23)</li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import store from "~/store";
export default Vue.extend({
  mounted() {},
});
</script>


<style lang="scss" scoped>
.side-container {
  width: initial;
  position: absolute;
  top: 50%;
  left: 11%;
  transform: translate(0%, -50%);
  font-size: 0.8em;
  opacity: 0.6;
}

ul {
  color: white;
  list-style: none;
  font-weight: lighter;
}

.infos {
  margin-bottom: 50px;
}

.infos-2 {
  margin-top: 50px;
}

.range {
  width: 1px;
  height: 300px;
  background-color: white;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 301px;
    li {
      width: 10px;
      height: 1px;
      background-color: white;
    }
  }
}
</style>