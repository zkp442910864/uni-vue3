import {jsCopyObj, zEmpty} from "@/utils";
import {defineStore} from "pinia";
import {computed, ref} from "vue";


export const useUserStore = defineStore('user', () => {
    const initData = {userName: '', synKey: ''};
    const state = ref(jsCopyObj(initData));

    const setData = (data?: typeof state.value) => {
        state.value = data || jsCopyObj(state.value);
    };

    const clearData = () => {
        state.value = jsCopyObj(initData);
    };

    const isLogin = computed(() => {
        const len = Object.values(state.value).filter(ii => !zEmpty(ii)).length;
        return !!len;
    });

    const userInfo = computed(() => jsCopyObj(state.value));

    return {
        setData,
        clearData,
        isLogin,
        userInfo,
    }
});
