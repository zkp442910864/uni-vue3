import {jsCopyObj, serialize, zEmpty} from "@/utils";
import {defineStore} from "pinia";
import {computed, ref} from "vue";

// 处理路径前斜杆
const handleUrl = (url: string) => {
    const s0 = url[0];
    return s0 === '/' ? url : `/${url}`;
};

export const useRedirectStore = defineStore('redirect', () => {
    const initData = {
        // 重定向前路径
        beforeUrl: null as null | string,
        // 路径类型，switchTab | 其它
        isSwitchTab: false,
        // 参数
        options: null as null | Record<string, any>,
    };
    const state = ref(jsCopyObj(initData));

    const setData = (data: typeof state.value) => {
        state.value = data;
    };

    const clearData = () => {
        state.value = jsCopyObj(initData);
    };

    const getRedirectUrl = computed(() => {
        const {beforeUrl, isSwitchTab, options} = state.value;

        if (zEmpty(beforeUrl)) return null;

        const strData = serialize(options || {});

        let obj = {
            index: 1 as undefined | number,
            url: `${handleUrl(beforeUrl ?? '')}?${strData}` as string | number,
        };

        isSwitchTab && (obj = {url: 1, index: undefined});

        return obj;
    });

    const getBeforeUrl = computed(() => {
        return state.value.beforeUrl;
    });


    return {
        state,
        setData,
        clearData,
        getRedirectUrl,
        getBeforeUrl,
    }
});
