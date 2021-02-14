import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import api from '@/utils/api';

Vue.use(Vuex);

const API_KEY = '284723959d505980711510a23768a8a0';

const getCitiesFromCookies = () => {
    return Cookies.get('citiesList') && JSON.parse(Cookies.get('citiesList')).reduce((acc, cityName) => {
        acc[cityName] = JSON.parse(Cookies.get(cityName));
        return acc;
    }, {}) || {};
}

export default new Vuex.Store({
    state: {
        cities: getCitiesFromCookies(),
    },
    mutations: {
        updateCityByName(state, { cityName, data }) {
            Vue.set(state.cities, cityName, data);
        },
        removeCityByName(state, cityName) {
            Vue.delete(state.cities, cityName);
        }
    },
    getters: {
        getCityByName: state => cityName => {
            return state.cities[cityName];
        },
        getCitiesList: state => Object.keys(state.cities),
    },
    actions: {
        addCityByName({ commit }, { cityName, data }) {
            Cookies.set(cityName, data);
            const citiesList = Cookies.get('citiesList') ? JSON.parse(Cookies.get('citiesList')) : [];
            citiesList.push(cityName);
            Cookies.set('citiesList', citiesList);
            commit('updateCityByName', { cityName, data });
        },
        async getWeatherByCityName({ dispatch, state }, cityName) {
            const {data} = await api.get(`/weather`, {
                    params: {
                        q: cityName,
                        appid: API_KEY,
                        units: 'metric',
                    }
                }
            );

            if (data.cod !== 200) {
                return data.message;
            }

            if (state.cities[data.name]) {
                return 'City already added';
            }

            dispatch('addCityByName', {
                cityName: data.name,
                data,
            })
        },
        async updateWeatherByCityName({ dispatch }, cityName) {
            const {data} = await api.get(`/weather`, {
                    params: {
                        q: cityName,
                        appid: API_KEY,
                        units: 'metric',
                    }
                }
            );

            if (data.cod === 200) {
                dispatch('addCityByName', {
                    cityName: data.name,
                    data,
                })
            }
        },
        async updateWeatherForAddedCities({ dispatch, getters }) {
            const requests = getters.getCitiesList.map(name => {
                return async () => dispatch('updateWeatherByCityName', name)
            });

            await Promise.all(requests);
        },
        removeWeatherByCityName({commit}, cityName) {
            Cookies.remove(cityName);
            const citiesList = JSON.parse(Cookies.get('citiesList'));
            citiesList.splice(citiesList.indexOf(cityName), 1);
            Cookies.set('citiesList', citiesList);
            commit('removeCityByName', cityName);
        }
    },
})
