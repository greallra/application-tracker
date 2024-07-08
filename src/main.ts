import './assets/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from "primevue/toastservice";
import ConfirmationService from 'primevue/confirmationservice';
import App from './App.vue'
import router from './router'

import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})


const app = createApp(App)

app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
 });
app.use(ConfirmationService);
app.use(ToastService);
app.use(router)
app.mount('#app')
