<template>
  <div class="cash-flow-item">
    <input
      :ref="refName"
      class="cash-flow-item__title"
      type="text"
      :placeholder="inputPlaceholder"
      :value="cashFlowName"
      @input="changeCashFlowName"
    >
    <div class="cash-flow-item__wrap">
      <input
        class="cash-flow-item__value"
        type="number"
        placeholder="0"
        pattern="[0-9.]+"
        :value="cashFlowAmount"
        @input="changeCashFlowAmount"
      >
    </div>
    <button
      class="cash-flow-item__delete-btn"
      title="Удалить пункт из списка"
      @click="onClickDeleteBtn"
    >
      <i class="fas fa-times-circle" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    inputPlaceholder: {
      type: String,
      default: 'Введите название',
    },
    cashFlowName: {
      type: String,
      default: null,
    },
    cashFlowAmount: {
      type: Number,
      default: null,
    },
    onClickDeleteBtn: {
      type: Function,
      default: () => {},
    },
    changeCashFlowName: {
      type: Function,
      default: () => {},
    },
    refName: {
      type: String,
      default: null,
    },
    changeCashFlowAmount: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    this.$store.state.income.forEach((item, index) => {
      if (item.isFocus) {
        if (this.$refs[`income_ref_${index}`]) {
          this.$refs[`income_ref_${index}`].focus();
        }
      }
    });

    this.$store.state.expenses.forEach((item, index) => {
      if (item.isFocus) {
        if (this.$refs[`expenses_ref_${index}`]) {
          this.$refs[`expenses_ref_${index}`].focus();
        }
      }
    });
  },
};
</script>

<style lang="scss">
.cash-flow-item__title {
  float: left;
  margin-right: 40px;
}

.cash-flow-item__value {
  width: 100%;
  padding-right: 40px;
}

.cash-flow-item__wrap {
  width: 28%;
  float: left;
  position: relative;
  margin-right: 40px;

  &:after {
    position: absolute;
    content: "руб.";
    right: 0;
    bottom: 4px;
    font-size: 16px;
  }
}

.cash-flow-item__delete-btn {
  border: none;
  color: $red;
  font-size: 20px;
  width: 36px;
  line-height: 36px;
  float: left;
  @extend %base-transition;
  opacity: 1;
  background: transparent;

  &:hover {
    opacity: .7;
  }
}

.cash-flow-item {
  margin: 32px 0;

  &:after {
    content: "";
    clear: both;
    display: table;
  }
}

</style>
