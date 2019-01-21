/* 
* @Author: Moriarty
* loading —— powerLoading
*/

const state = {
    page: {
        pageSize: 12,
    },
    hospLogo: '',
    baseImgURL: 'http://www.hellodoctor.com.cn/',
    tabsActive: {
        productTabs: 'audit',
    },
    orderPayTypeList: [
        {
            id: 1,
            name: '支付宝'
        },
        {
            id: 2,
            name: '微信'
        }
    ],
    orderTypeList: [
        {
            id: 1,
            name: '待支付'
        },
        {
            id: 2,
            name: '已取消'
        },
        {
            id: 3,
            name: '已关闭'
        },
        {
            id: 4,
            name: '可使用'
        },
        {
            id: 5,
            name: '已完成'
        },
        {
            id: 8,
            name: '退款中'
        },
        {
            id: 9,
            name: '退款成功'
        }
    ]
}

const getters = {
    getHospLogo: state => state.hospLogo,
    getPageSize: state => state.page.pageSize,
    getBaseImgURL: state => state.baseImgURL,
    getProductTabs: state => state.tabsActive.productTabs,
    getOrderPayTypeList: state => state.orderPayTypeList,
    getOrderTypeList: state => state.orderTypeList
}

const actions = {
    setProductTabs: ({ commit }, data) => {
        commit('productTabs', data)
    },
    setHospLogo: ({ commit }, data) => {
        commit('hospLogo', data)
    }
}

const mutations = {
    productTabs (state, data) {
        state.tabsActive.productTabs = data
    },
    hospLogo (state, data) {
        state.hospLogo = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}