<template>
  <form @submit.prevent="getWeather" class="add-form">
    <div class="add-form__inputer">
      <label class="add-comment__name">City
        <input
            class="add-form__input"
            v-model="cityName"
            type="text"
        >
      </label>
      <p class="add-form__error">{{ error }}</p>
    </div>
    <button type="submit"
            class="add-form__button"
    >Add city</button>
  </form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "AddCity",
  data() {
    return {
      cityName: '',
      error: ''
    }
  },
  methods: {
    ...mapActions(['getWeatherByCityName']),
    async getWeather() {
      this.error = await this.getWeatherByCityName(this.cityName);
    }
  },
}
</script>

<style lang="scss">
.add-form {
  width: 90vw;
  max-width: 300px;
  height: 180px;
  margin: 6px;

  background: #111109;
  color: #c9c938;
  border: 1px dashed #1f1e1e;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  text-align: center;

  &__inputer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: Courier, monospace;
  }

  &__input {
    width: 80px;

    margin-left: 10px;

    background: #111109;
    color: #d4d442;
    border: none;
    border-bottom: 1px solid #fa9643;

    text-align: center;
    font-size: 17px;

    transition: 0.2s;
  }
  &__input:focus {
    width: 90px;
  }

  &__error {
    padding: 3px;

    color: red;
    font-size: 13px;
  }

  &__button {
    width: 50%;
    height: 25px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto;

    background: #fff285;
    border: none;
    border-radius: 5px;

    color: #111109;
    font-size: 17px;
    text-transform: uppercase;
    font-family: Courier, monospace;

    transition: 0.3s;
  }
  &__button:hover {
    box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.3);
  }
}


</style>