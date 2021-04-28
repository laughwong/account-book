<template>
  <div>
    <a-button type="primary" @click="showModal"> 新增 </a-button>
    <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="Amount">
          <a-input
            v-decorator="[
              'Amount',
              {
                rules: [{ required: true, message: 'Please input your note!' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="Type">
          <a-select
            v-decorator="[
              'Type',
              {
                rules: [
                  { required: true, message: 'Please select your type!' },
                ],
              },
            ]"
            placeholder="Select a option"
          >
            <a-select-option value="0"> 支出 </a-select-option>
            <a-select-option value="1"> 收入 </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Category">
          <a-select
            v-decorator="[
              'Category',
              {
                rules: [
                  { required: true, message: 'Please select your type!' },
                ],
              },
            ]"
            placeholder="Select a option"
          >
            <a-select-option
              v-for="(item, i) in cats"
              :key="i"
              :value="item[0]"
            >
              {{ item[1] }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
export default {
  name: "Add",
  data() {
    return {
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      cats: [
        ["0fnhbcle6hg", "房屋租赁"],
        ["1bcddudhmh", "车贷"],
        ["1vjj47vpd28", "股票投资"],
        ["3tqndrjqgrg", "日常饮食"],
        ["5il79e11628", "基金投资"],
        ["8s0p77c323", "房贷"],
        ["bsn20th0k2o", "交通"],
        ["hc5g66kviq", "车辆保养"],
        ["j1h1nohhmmo", "旅游"],
        ["odrjk823mj8", "家庭用品"],
        ["s73ijpispio", "工资"],
      ],
    };
  },
  methods: {
    ...mapActions(["addCount", "addNode", "updateData"]),
    showModal() {
      this.visible = true;
      // this.list();
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
      let amount = this.form.getFieldValue("Amount");
      let type = this.form.getFieldValue("Type");
      let category = this.form.getFieldValue("Category");
      let temp = {
        amount: amount,
        type: type,
        category: category,
      };
      temp["time"] = moment().startOf("month").format("YYYY-MM");
      this.addNode(temp);
      // this.updateData([]);
      let dtemp = this.dataStore._data;
      let _temp = [];
      dtemp.forEach((element) => {
        _temp.push(element);
      });
      this.updateData(_temp);
    },
  },
  computed: {
    ...mapState(["dataStore"]),
  },
};
</script>
