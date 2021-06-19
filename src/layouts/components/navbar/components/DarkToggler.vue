<template>
  <div @click="isDark">
    <feather-icon
      size="21"
      :icon="`${$store.state.mode ? 'Sun' : 'Moon'}Icon`"
    />
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  methods: {
    isDark(){
      this.$store.commit('TOGGLE_MODE', this.skin) 
    }
  }
}
</script>
