<template>
  <div class="cash-flow">
    <span :class="['cash-flow__icon', { iconExpenses: isExpenses }]">
      <i :class="iconName" />
    </span>
    <h2 class="cash-flow__title">
      {{ title }} {{ cashFlowSum.toLocaleString() }} руб.
    </h2>
    <CashFlowItem
      v-for="(item, index) in cashFlowData"
      :key="index"
      :input-placeholder="inputFlowPlaceholder"
      :cash-flow-name.sync="item.name"
      :cash-flow-amount.sync="item.amount"
      :on-click-delete-btn="() => onClickDeleteBtn(cashFlowName, index)"
      :ref-name="cashFlowName + '_ref_' + index"
      :change-cash-flow-name="(event) => {
        changeCashFlowData(event.target.value, 'name', cashFlowName, index)
      }"
      :change-cash-flow-amount="(event) => {
        changeCashFlowData(Number(event.target.value), 'amount', cashFlowName, index)
      }"
    />
    <button
      class="cash-flow__add-btn"
      @click="onClickAddBtn"
    >
      <span class="cash-flow__add-btn--icon">
        <i class="fas fa-plus-square" />
      </span> {{ addBtnName }}
    </button>
    <button
      class="cash-flow__clear-btn"
      @click="onClickClearBtn"
    >
      Удалить все поля
    </button>
  </div>
</template>

<script>

import CashFlowItem from './CashFlowItem.vue';

export default {
  components: {
    CashFlowItem,
  },
  props: {
    iconName: {
      type: String,
      default: null,
    },
    addBtnName: {
      type: String,
      default: 'Добавить',
    },
    isExpenses: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    inputFlowPlaceholder: {
      type: String,
      default: 'Введите название',
    },
    cashFlowData: {
      type: Array,
      default: null,
    },
    cashFlowSum: {
      type: Number,
      default: 0,
    },
    onClickAddBtn: {
      type: Function,
      default: () => {},
    },
    onClickClearBtn: {
      type: Function,
      default: () => {},
    },
    cashFlowName: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClickDeleteBtn(cashFlowName, index) {
      this.$store.dispatch('removeItem', { cashFlowName, index });
    },

    changeCashFlowData(newValue, inputName, cashFlowName, index) {
      const payload = {
        newValue,
        inputName,
        cashFlowName,
        index,
      };
      this.$store.dispatch('changeCashFlowItem', payload);
    },
  },
};
</script>

<style lang="scss">
.cash-flow {
  width: 100%;
  text-align: left;
  padding: 36px 44px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-sizing: border-box;
  background-color: var(--box-bg);
  border: 1px solid var(--border-color);
}

.cash-flow__icon {
  font-size: 16px;
  line-height: 32px;
  width: 32px;
  height: 32px;
  background-color: $green;
  display: block;
  text-align: center;
  border-radius: 4px;
  color: $white;
  float: left;
  margin-right: 20px;
}

.iconExpenses {
  background-color: $red;
}

.cash-flow__title {
  @extend %text-medium;
  line-height: 32px;
  padding-right: 16px;
}

.cash-flow__add-btn {
  padding: 0 24px;
  border: 1px solid var(--border-color-dark);
  color: var(--main);
  // position: relative;
  line-height: 36px;
  margin-top: 16px;
  background: transparent;

  // &:before {
  //   position: absolute;
  //   font-family: "Font Awesome 5 Free";
  //   font-weight: 900;
  //   content: "\f0fe";
  //   left: 12px;
  // }

  &:hover {
    background-color: $blue;
    color: $white;
    border-color: $blue;
  }
}

.cash-flow__add-btn--icon {
  padding-right: 8px;
}

.cash-flow__clear-btn {
  margin-top: 16px;
  padding: 0 24px;
  color: $red;
  background: transparent;
  margin-left: 16px;
  border: 1px solid var(--border-color-dark);

  &:hover {
    background-color: $red;
    color: $white;
    border-color: $red;
  }
}

</style>
