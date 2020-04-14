import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    income: [
      {
        name: 'Зарплата',
        amount: 5000,
        isFocus: false,
      },
    ],
    expenses: [
      {
        name: 'Проезд',
        amount: 3500,
        isFocus: false,
      },
    ],
    darkMode: false,
  },

  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))));
      }
    },

    removeItem(state, { cashFlowName, index }) {
      state[cashFlowName].splice(index, 1);
    },

    clearExpenses(state) {
      state.expenses.splice(0);
      state.expenses.push({ name: null, amount: null });
    },

    clearIncomes(state) {
      state.income.splice(0);
      state.income.push({ name: null, amount: null });
    },

    addIncome(state) {
      const newIncomeData = state.income.map((item) => ({ ...item, isFocus: false }));
      state.income = newIncomeData;
      state.income.push({ name: null, amount: null, isFocus: true });
    },

    addExpenses(state) {
      const newExpensesData = state.expenses.map((item) => ({ ...item, isFocus: false }));
      state.expenses = newExpensesData;
      state.expenses.push({ name: null, amount: null, isFocus: true });
    },

    changeCashFlowItem(state, {
      newValue, inputName, cashFlowName, index,
    }) {
      const newData = { ...state[cashFlowName][index], [inputName]: newValue };
      state[cashFlowName].splice(index, 1, newData);
    },

    changeTheme(state, payload) {
      state.darkMode = payload;
      if (payload) {
        document.body.setAttribute('theme', 'dark');
      } else {
        document.body.setAttribute('theme', 'light');
      }
    },
  },

  actions: {
    removeItem(context, payload) {
      context.commit('removeItem', payload);
    },

    clearExpenses(context) {
      context.commit('clearExpenses');
    },

    clearIncomes(context) {
      context.commit('clearIncomes');
    },

    addIncome(context) {
      context.commit('addIncome');
    },

    addExpenses(context) {
      context.commit('addExpenses');
    },

    changeCashFlowItem(context, payload) {
      context.commit('changeCashFlowItem', payload);
    },

    changeTheme(context, payload) {
      context.commit('changeTheme', payload);
    },
  },
});
