import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
    token: getToken(),
    userInfo: {},
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
        setToken(token)
    },
    SET_USER_INFO: (state, value) => {
        state.userInfo = Object.assign({}, state.userInfo, value)
    },
    REMOVE_TOKEN: (state, token) => {
        removeToken()
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
