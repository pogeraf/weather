import Vue from 'vue'
import VueRouter from "vue-router";
import CityDetailWeatherInfo from "@/components/CityDetailWeatherInfo";
import Cities from "@/components/Cities";

Vue.use(VueRouter)

const routes = [
    {
        name: 'citiesList',
        path: '/',
        component: Cities,
    },
    {
        props: true,
        name: 'city',
        path: '/:cityName',
        component: CityDetailWeatherInfo,
    },
];

export default new VueRouter({
    routes,
    mode: "history",
});
