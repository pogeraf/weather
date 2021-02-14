<template>
  <div class="city">
    <div class="city__header">
      <div class="city__buttons">
        <span class="city__button" @click="removeWeatherByCityName(cityName)">✖</span>
        <span class="city__button" @click="updateWeatherByCityName(cityName)">↻</span>
        <span class="city__button" @click="showMoreCityWeather">□</span>
      </div>
      <p class="city__name">{{ cityName }}</p>
    </div>
    <div class="city__info">
      <p class="city__temp">{{ getDetails.main.temp }}&deg;C</p>
      <p>
        <span class="city__weather" v-for="weather in getDetails.weather" :key="weather.id">{{ weather.main }} </span>
      </p>
      <p class="city__wind">Wind: {{ getDetails.wind.speed }} m/s</p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: "CityShortWeatherInfo",
  props: {
    cityName: {
      type: String,
      require: true,
    },
  },
  computed: {
    ...mapGetters(['getCityByName']),
    getDetails() {
      return this.getCityByName(this.cityName);
    }
  },
  methods: {
    ...mapActions(['updateWeatherByCityName', 'removeWeatherByCityName']),

    showMoreCityWeather() {
      this.$router.push({name: 'city', params: {cityName: this.cityName}});
    },
  },
}
</script>

<style lang="scss">
.city {
  width: 90vw;
  max-width: 300px;
  height: 180px;
  border: 2px solid #c1802b;

  margin: 5px;

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
    width: 20%;

    display: flex;
    justify-content: space-between;

    font-size: 20px;
  }
  &__name {
    font-family: Courier;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: bolder;
  }

  &__info {
    height: 90%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: #111109;
    color: #fa9643;
  }

  &__temp {
    padding: 5px;

    font-family: Courier, monospace;
    font-size: 30px;
  }

  &__weather {
    padding: 5px;

    color: #fff285;
    font-family: Courier, monospace;
    font-size: 13px;
  }
  &__wind {
    padding: 5px;

    color: #fff285;
    font-family: Courier, monospace;
    font-size: 13px;
  }
}
</style>