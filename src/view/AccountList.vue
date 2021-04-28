<template>
  <a-row>
    <a-col :span="12">
      <Statistic />
    </a-col>
    <a-col :span="12">
      <div>
        <br />
        <a-row>
          <a-col :span="20">
            <a-month-picker
              :default-value="moment(dataStore.date, monthFormat)"
              :format="monthFormat"
              @change="onChange"
            />
          </a-col>
          <a-col :span="4">
            <Add />
          </a-col>
        </a-row>
        <br />

        <a-table
          :columns="columns"
          :data-source="
            dataStore._data.length === 0 && dataStore.f === 0
              ? dataStore.data
              : dataStore._data
          "
          :rowKey="(record, index) => index.toString()"
        >
        </a-table>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import moment from "moment";
import { mapState, mapActions } from "vuex";
import Add from "../view/Add.vue";
import Statistic from "../view/Statistic.vue";
const columns = [
  {
    title: "账单时间",
    dataIndex: "time",
    // sorter: true,
    // render: (name) => `${name.first} ${name.last}`,
    width: "25%",
  },
  {
    title: "账单类型",
    dataIndex: "category",
    // sorter: true,
    customRender: (name) => {
      let cats = {
        "0fnhbcle6hg": "房屋租赁",
        "1bcddudhmh": "车贷",
        "1vjj47vpd28": "股票投资",
        "3tqndrjqgrg": "日常饮食",
        "5il79e11628": "基金投资",
        "8s0p77c323": "房贷",
        "bsn20th0k2o": "交通",
        "hc5g66kviq": "车辆保养",
        "j1h1nohhmmo": "旅游",
        "odrjk823mj8": "家庭用品",
        "s73ijpispio": "工资",
      };
      let a = cats[name];
      return a;
    },
    width: "25%",
    filters: [
      {
        text: "房屋租赁",
        value: "0fnhbcle6hg",
      },
      {
        text: "车贷",
        value: "1bcddudhmh",
      },
      {
        text: "股票投资",
        value: "1vjj47vpd28",
      },
      {
        text: "日常饮食",
        value: "3tqndrjqgrg",
      },
      {
        text: "基金投资",
        value: "5il79e11628",
      },
      {
        text: "房贷",
        value: "8s0p77c323",
      },
      {
        text: "交通",
        value: "bsn20th0k2o",
      },
      {
        text: "车辆保养",
        value: "hc5g66kviq",
      },
      {
        text: "家庭用品",
        value: "odrjk823mj8",
      },
      {
        text: "旅游",
        value: "j1h1nohhmmo",
      },
      {
        text: "工资",
        value: "s73ijpispio",
      },
    ],
    onFilter: (value, record) => record.category.indexOf(value) === 0,
  },
  {
    title: "账单分类",
    dataIndex: "type",
    // sorter: true,
    customRender: (name) => {
      if (name == 0) {
        return "支出";
      } else {
        return "收入";
      }
    },
    width: "25%",
    filters: [
      {
        text: "支出",
        value: "0",
      },
      {
        text: "收入",
        value: "1",
      },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,
  },
  {
    title: "账单金额",
    dataIndex: "amount",
    width: "25%",
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default {
  name: "AccountList",
  data() {
    return {
      // data: [],
      columns,
      dateFormat: "YYYY/MM/DD",
      monthFormat: "YYYY/MM",
      dateFormatList: ["DD/MM/YYYY", "DD/MM/YY"],
      visible: false,
    };
  },
  methods: {
    moment,
    ...mapActions([
      "addCount",
      "changeDate",
      "getDatas",
      "updateData",
      "getCats",
      "reset",
      "setsort",
    ]),
    // 获取dateString
    onChange(date, dateString) {
      this.changeDate(dateString);
      if (dateString.length !== 0) {
        this.reset()
        this.updateData([]);
        let temp = this.dataStore.data;
        let _temp = [];
        let month = dateString.replace("/", "-");
        temp.forEach((element) => {
          if (element.time == month) {
            _temp.push(element);
          }
        });
        this.updateData(_temp);
      } else {
        this.reset()
        this.updateData([]);
        let dtemp = this.dataStore.data;
        let _temp = [];
        dtemp.forEach((element) => {
          _temp.push(element);
        });
        this.updateData(_temp);
      }
      this.setsort()
    },
  },
  computed: {
    ...mapState(["testStore", "dataStore"]),
  },
  components: {
    Add,
    Statistic,
  },
  mounted: async function () {
    // 获取data
    this.getDatas();
    this.getCats();
  },
};
</script>
