<template>
  <div>
    <highcharts :options="dataStore.options" />
    <br />
    <p>收入总计: {{ dataStore.income }}</p>
    <p>支出总计: {{ dataStore.spending }}</p>
    <br />
    <h3>分类统计</h3>
    <ul>
      <li v-for="(item, index) in dataStore.stt" :key="index">
        {{ item.name + ": " + item.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Statistic",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setsort"]),
  },
  components: {
    highcharts: Chart,
  },
  computed: {
    ...mapState(["testStore", "dataStore"]),
  },
  watch: {},
  mounted: function () {
    setTimeout(this.setsort, 1000);
  },
};
</script>
