<template>
  <span class="select-box-wrap">
    <select
      v-model="selectedItem"
      class="select-box"
      @change="$emit('update:selected', $event.target.value)"
    >
      <option>месяца (30 дней)</option>
      <option>недели</option>
    </select>
    <span class="select-box__icon">
      <i class="fas fa-chevron-circle-down" />
    </span>
  </span>
</template>

<script>
export default {
  props: {
    selected: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      selectedItem: this.selected,
    };
  },
};
</script>

<style lang="scss">
.select-box-wrap {
  margin: 0 4px;
  position: relative;

  .select-box__icon {
    position: absolute;
    font-size: 16px;
    right: 8px;
    top: 2px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    z-index: -100;
    @extend %base-transition;
  }
}

.select-box {
  @extend %text-regular;
  color: var(--text-color);
  outline: none;
  height: 36px;
  box-sizing: border-box;
  appearance: none;
  padding-left: 16px;
  font-size: 20px;
  line-height: 36px;
  width: 208px;
  border: 1px solid var(--border-color-dark);
  background: transparent;
  cursor: pointer;
  @extend %base-transition;
  outline: none;
  border-radius: 4px;

  &:active, &:hover {
    border-color: $blue;
  }

  &:hover ~ .select-box__icon {
    color: $blue;
  }

}

</style>
