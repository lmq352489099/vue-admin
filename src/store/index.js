import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import mutations from './mutations'
import actions from './actions'

//模块
import sysSetting from './modules/sysSetting'

export default new Vuex.Store({
    modules: {
        sysSetting
    },
    // 把actions导出去
    actions
})
