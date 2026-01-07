import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

// Theme and CSS
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css' // Highly recommended for layout
import Dialog from 'primevue/dialog';
import DatePicker from 'primevue/datepicker';


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.component('Dialog', Dialog);
app.component('DatePicker', DatePicker);

app.mount('#app')
