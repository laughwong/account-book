import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import mTest from './moduleTest'
import mData from './moduleData'

export default new Vuex.Store({
    modules: {
        testStore: mTest,
        dataStore: mData,
    }
})

