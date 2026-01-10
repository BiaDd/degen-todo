import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

// Theme and CSS
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css' // Highly recommended for layout
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Components
import Dialog from 'primevue/dialog'
import DatePicker from 'primevue/datepicker'
import SelectButton from 'primevue/selectbutton'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

// Components
app.component('Dialog', Dialog)
app.component('DatePicker', DatePicker)
app.component('SelectButton', SelectButton)

app.mount('#app')
