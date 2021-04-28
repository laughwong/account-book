import { getCategory, getList } from '../api/data'

const mData = {
    state: () => ({
        data: [],
        date: '2021/04',
        _data: [],
        f: 0,
        cats: [],
        tree: {},
        income: 0,
        spending: 0,
        pecent: 0.5,
        options: {
            title: {
                text: "账单统计",
            },
            series: [
                {
                    type: "pie",
                    data: [
                        { y: 0.5, name: "收入" },
                        { y: 0.5, name: "支出" },
                    ],
                },
            ],
        },
        stt: [
            {
                key: "0fnhbcle6hg",
                value: 0,
                name: "房屋租赁",
            },
            {
                key: "1bcddudhmh",
                value: 0,
                name: "车贷",
            },
            {
                key: "1vjj47vpd28",
                value: 0,
                name: "股票投资",
            },
            {
                key: "3tqndrjqgrg",
                value: 0,
                name: "日常饮食",
            },
            {
                key: "5il79e11628",
                value: 0,
                name: "基金投资",
            },
            {
                key: "8s0p77c323",
                value: 0,
                name: "房贷",
            },
            {
                key: "bsn20th0k2o",
                value: 0,
                name: "交通",
            },
            {
                key: "hc5g66kviq",
                value: 0,
                name: "车辆保养",
            },
            {
                key: "j1h1nohhmmo",
                value: 0,
                name: "旅游",
            },
            {
                key: "odrjk823mj8",
                value: 0,
                name: "家庭用品",
            },
            {
                key: "s73ijpispio",
                value: 0,
                name: "工资",
            },
        ],
    }),
    mutations: {
        SETDATE: (state, date) => {
            if (date.length === 0) {
                state.f = 0
                state._data = state.data
            } else {
                state.date = date
            }
        },
        FLAG: (state) => {
            state.f = 1
        },
        SETDATA: (state, data) => {
            state.data = data
            state._data = data
        },
        SETCATS: (state, data) => {
            state.cats = data
        },
        SET_DATA: (state, data) => {
            state._data = data
        },
        SETTREE: (state, v) => {
            let key = v[0]
            let value = v[1]
            state.tree[key] = value
        },
        SETNODE: (state, v) => {
            state.data.push(v)
            state._data.push(v)
        },
        SETINCOME: (state, v) => {
            state.income = state.income + parseInt(v[0])
            state.stt.map((ele) => {
                if (ele.key === v[1]) {
                    ele.value = ele.value + parseInt(v[0])
                }
            })
        },
        SETSPENDING: (state, v) => {
            state.spending = state.spending + parseInt(v[0])
            state.stt.map((ele) => {
                if (ele.key === v[1]) {
                    ele.value = ele.value + parseInt(v[0])
                }
            })
        },
        SETPECENT: (state) => {
            state.pecent = (state.income / (state.income + state.spending)).toFixed(2)
            let a = state.pecent * 100
            if (isNaN(a)) {
                a = 0
            }
            let b = 100 - a
            state.options.series[0].data[0].y = a
            state.options.series[0].data[1].y = b
        },
        CLEAR: (state) => {
            state.income = 0
            state.spending = 0
        },
        SORT: (state) => {
            state.stt.sort(function (a, b) {
                var x = "value"; //要排序字段
                if (a[x] < b[x]) {
                    return 1;
                }
                if (a[x] > b[x]) {
                    return -1;
                }
                return 0;
            })
        },
        RESET: (state) => {
            state.stt = [
                {
                    key: "0fnhbcle6hg",
                    value: 0,
                    name: "房屋租赁",
                },
                {
                    key: "1bcddudhmh",
                    value: 0,
                    name: "车贷",
                },
                {
                    key: "1vjj47vpd28",
                    value: 0,
                    name: "股票投资",
                },
                {
                    key: "3tqndrjqgrg",
                    value: 0,
                    name: "日常饮食",
                },
                {
                    key: "5il79e11628",
                    value: 0,
                    name: "基金投资",
                },
                {
                    key: "8s0p77c323",
                    value: 0,
                    name: "房贷",
                },
                {
                    key: "bsn20th0k2o",
                    value: 0,
                    name: "交通",
                },
                {
                    key: "hc5g66kviq",
                    value: 0,
                    name: "车辆保养",
                },
                {
                    key: "j1h1nohhmmo",
                    value: 0,
                    name: "旅游",
                },
                {
                    key: "odrjk823mj8",
                    value: 0,
                    name: "家庭用品",
                },
                {
                    key: "s73ijpispio",
                    value: 0,
                    name: "工资",
                },
            ]
        }
    },
    actions: {
        changeDate({ commit }, date) {
            commit('SETDATE', date)
            commit('FLAG')
            // commit('RESET')
        },
        getDatas({ commit }) {
            const res = getList()
            res.then((response) => {
                const { data } = response
                commit('SETDATA', data)
                commit('CLEAR')
                data.forEach((ele) => {
                    if (ele.type == 1) {
                        commit('SETINCOME', [ele.amount, ele.category])
                    } else {
                        commit('SETSPENDING', [ele.amount, ele.category])
                    }
                })
                commit('SETPECENT')
            })
        },
        getCats({ commit }) {
            const res = getCategory()
            res.then((response) => {
                const { data } = response
                commit('SETCATS', data)
                data.forEach((ele) => {
                    commit('SETTREE', [ele.id, ele.name])
                })

            })
        },
        updateData({ commit }, data) {
            commit('SET_DATA', data)
            commit('CLEAR')
            if (data.length !== 0) {
                data.forEach((ele) => {
                    if (ele.type == 1) {
                        commit('SETINCOME', [ele.amount, ele.category])
                    } else {
                        commit('SETSPENDING', [ele.amount, ele.category])
                    }
                })
            }
            commit('SETPECENT')
        },
        addNode({ commit }, val) {
            commit('SETNODE', val)
        },
        setsort({ commit }) {
            commit('SORT')
        },
        reset({ commit }) {
            commit('RESET')
        }
    }
}

export default mData