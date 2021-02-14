<template>
  <div class="city-more-info">
    <div class="city-more-info__header">
      <div class="city-more-info__buttons">
        <span @click="showAllCities">✖</span>
        <span @click="updateWeatherByCityName($route.params.cityName)">↻</span>
        <span @click="removeCityByName">🗑</span>
      </div>
      <p class="city-more-info__name">{{ $route.params.cityName }}</p>
    </div>
    <div class="city-more-info__info">
      <p class="city-more-info__temp">{{ getDetails.main.temp }}&deg;C</p>
      <p class="city-more-info__options">Feels like: {{ getDetails.main.temp }}&deg;C</p>
      <p>
        <span class="city-more-info__options" v-for="weather in getDetails.weather" :key="weather.id">{{ weather.main }} </span>
      </p>
      <p class="city-more-info__options">Wind: {{ getDetails.wind.speed }}m/s  {{getDetails.wind.deg}}deg</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CityDetailWeatherInfo",
  computed: {
    ...mapGetters(['getCityByName']),
    getDetails() {
      return this.getCityByName(this.$route.params.cityName);
    }
  },
  methods: {
    ...mapActions(['updateWeatherByCityName', 'removeWeatherByCityName']),
    removeCityByName() {
      this.removeWeatherByCityName(this.$route.params.cityName);
      this.$router.push({name: 'citiesList'});
    },

    showAllCities() {
      this.$router.push({name: 'citiesList'});
    },
  },
}
</script>

<style lang="scss">
.city-more-info {
  width: 90vw;
  max-width: 700px;
  height: 350px;
  border: 2px solid black;

  margin: 10px auto;

  display: flex;
  flex-direction: column;

  &__header {
    height: 10%;
    padding: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: #000000;
    color: #fa9643;
    border-bottom: 2px solid #c1802b;
  }

  &__buttons {
    width: 15%;

    display: flex;
    justify-content: space-between;

    font-size: 25px;
  }
  &__name {
    font-family: Courier;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: bolder;
  }

  &__info {
    height: 90%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background: #111109;
    color: #fa9643;
  }

  &__temp {
    padding: 5px;

    text-align: center;
    font-family: Courier, monospace;
    font-size: 45px;
  }

  &__options {
    padding: 5px;
    font-family: Courier, monospace;
    font-size: 15px;
  }
}
</style>