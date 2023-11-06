
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export const store = new Vuex.Store({

    strict: true,
    state: { 
        assistant: {
            assistantCalls: [],
            assistantBussy: false,
            assistantLunch: false,
            assistantBreak: false,
        },
    },
    getters,
    actions,
    mutations,
});