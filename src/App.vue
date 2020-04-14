<template>
  <div class="container">
    <ToggleButton
      :on-change-toggle="(event) => onChangeToggle(event.value)"
      :toggle-value="darkMode"
    />
    <div
      class="logo"
    >
      Бюджет
    </div>
    <h1>Калькулятор расходов</h1>
    <p>Рассчитайте возможные расходы на день</p>
    <CashFlow
      icon-name="fas fa-wallet"
      title="Доходы за месяц:"
      add-btn-name="Добавить доход"
      input-flow-placeholder="Наименование дохода"
      :cash-flow-sum="incomeSum"
      :cash-flow-data="income"
      :cash-flow-name="'income'"
      :on-click-add-btn="onClickAddBtnIncome"
      :on-click-clear-btn="onClickClearBtnIncomes"
    />
    <CashFlow
      icon-name="fas fa-chart-pie"
      title="Расходы за месяц:"
      :is-expenses="true"
      add-btn-name="Добавить расход"
      input-flow-placeholder="Наименование расхода"
      :cash-flow-sum="expensesSum"
      :cash-flow-data="expenses"
      :cash-flow-name="'expenses'"
      :on-click-add-btn="onClickAddBtnExpenses"
      :on-click-clear-btn="onClickClearBtnExpenses"
    />
    <h3>
      Остаток:
      <span :class="{ 'text-red' : !isBalance }">{{ balance.toLocaleString() }}</span> руб.
    </h3>
    <div
      v-if="isBalance"
      class="total-sum"
    >
      <h1 class="total-sum__title">
        На протяжении
        <SelectBox :selected.sync="selectValue" />можно тратить в день:
        <br>
        <span>{{ totalSum.toLocaleString() }} руб.</span>
      </h1>
    </div>
    <p
      v-else
      class="negative-balance"
    >
      Баланс отрицательный 🧐
    </p>
  </div>
</template>

<script>
import ToggleButton from './components/ToggleButton.vue';
import CashFlow from './components/CashFlow.vue';
import SelectBox from './components/SelectBox.vue';

export default {
  components: {
    CashFlow,
    SelectBox,
    ToggleButton,
  },
  data() {
    return {
      selectValue: 'месяца (30 дней)',
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
    income() {
      return this.$store.state.income;
    },
    expenses() {
      return this.$store.state.expenses;
    },
    incomeSum() {
      return this.$store.state.income.reduce((sum, value) => sum + value.amount, 0);
    },
    expensesSum() {
      return this.$store.state.expenses.reduce((sum, value) => sum + value.amount, 0);
    },
    balance() {
      return this.incomeSum - this.expensesSum;
    },
    isBalance() {
      return this.balance >= 0;
    },
    totalSum() {
      if (this.selectValue === 'месяца (30 дней)') {
        return Math.floor(this.balance / 30);
      }
      return Math.floor(this.balance / 7);
    },
  },
  mounted() {
    if (this.$store.state.darkMode) {
      document.body.setAttribute('theme', 'dark');
    } else {
      document.body.setAttribute('theme', 'light');
    }
  },
  methods: {
    onClickAddBtnIncome() {
      this.$store.dispatch('addIncome');
    },
    onClickAddBtnExpenses() {
      this.$store.dispatch('addExpenses');
    },
    onClickClearBtnIncomes() {
      this.$store.dispatch('clearIncomes');
    },
    onClickClearBtnExpenses() {
      this.$store.dispatch('clearExpenses');
    },
    onChangeToggle(currentValue) {
      this.$store.dispatch('changeTheme', currentValue);
    },
  },
};
</script>

<style lang="scss">
.logo {
  @extend %text-bold;
  font-size: 44px;
  display: block;
  padding-bottom: 40px;
  color: var(--main);
}

.total-sum {
  margin-top: 20px;
}

.total-sum__title {
  line-height: 48px;
}

.text-red {
  color: $red;
}

.negative-balance {
  padding-top: 20px;
}

</style>
