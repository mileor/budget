<template>
  <ToggleButton
    class="theme-toggle"
    :color="{checked: '#42526E', unchecked: '#4C9AFF'}"
    :width="80"
    :height="32"
    :labels="{checked: '🌜', unchecked: '🌞'}"
    :font-size="28"
    :value="toggleValue"
    @change="onChangeToggle"
  />
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button';

export default {
  components: {
    ToggleButton,
  },
  props: {
    onChangeToggle: {
      type: Function,
      default: () => {},
    },
    toggleValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
  .theme-toggle {
    margin-bottom: 24px;
  }

  .v-switch-label {
    line-height: 38px!important;
  }
</style>
