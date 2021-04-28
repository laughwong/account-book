<template>
  <div id="app">
    <AccountList />
  </div>
</template>

<script>
import AccountList from "./view/AccountList.vue";
export default {
  name: "Home",
  components: {
    AccountList,
  },
};
</script>
<style>
#app {
  width: 1400px;
  margin: 0 auto;
}
</style>
