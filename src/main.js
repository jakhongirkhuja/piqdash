import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createI18n } from 'vue-i18n'
import ruLocale from '@/locales/ru.json'
import uzLocale from '@/locales/uz.json'

const i18n = createI18n({
    locale: 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        ru: ruLocale,
        uz: uzLocale
      }
})

createApp(App)
.use(router)
.use(i18n)
.mount('#app') 
