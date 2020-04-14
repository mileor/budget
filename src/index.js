import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import './assets/scss/app.scss';
import store from './store/store';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

new Vue({
  store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  render: (h) => h(App),
}).$mount('#app');
