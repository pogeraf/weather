import Vue from 'vue';
import App from './App.vue';
import store from '@/store/index';
import router from '@/router/index';
import api from "@/utils/api";

Vue.config.productionTip = false;

api.interceptors.response.use(response => response, error => {
    if(!(error || error.response)) {
        return Promise.reject(error);
    }

    return error.response;
})

new Vue({
    el: '#app',
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");
