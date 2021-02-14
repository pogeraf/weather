<template>
  <div class="cities">
    <div v-for="city in getCitiesList" :key="city.name">
      <CityShortWeatherInfo
          :cityName="city"
      />
    </div>
    <AddCity/>
  </div>
</template>

<script>
import CityShortWeatherInfo from './CityShortWeatherInfo'
import AddCity from './AddCity'
import {mapGetters} from "vuex";

export default {
  name: 'Cities',
  components: {
    CityShortWeatherInfo,
    AddCity,
  },
  computed: {
    ...mapGetters(['getCitiesList']),
  },
}
</script>

<style>
  .cities {
    padding: 10px;

    display: flex;
    flex-wrap: wrap;
  }
</style>
