import {dateData, jsCopyObj} from "@/utils";
import {defineStore} from "pinia";
import {computed, ref} from "vue";


export const useTimeStore = defineStore('time', () => {
    const initData = {
        yearDay: [] as string[],
        yearDayTime: [] as string[],

        monthDay: [] as string[],
        monthDayTime: [] as string[],

        sevenDay: [] as string[],
        sevenDayTime: [] as string[],

        day: [] as string[],
        dayTime: [] as string[],

        systemTime: 0,
    };
    const state = ref(jsCopyObj(initData));

    const setData = (data: typeof state.value) => {
        state.value = data;
    };

    const ajaxGetTime = () => {
        const res = new Date();
        const dayObj = dateData(res);

        res.setMonth(res.getMonth() - 1);
        const prevMonth = dateData(res);
        res.setMonth(res.getMonth() + 1);

        res.setDate(res.getDate() + 1);
        const one = dateData(res);
        res.setDate(res.getDate() + 6);
        const two = dateData(res);

        res.setDate(res.getDate() - 6);
        const prevEnd = dateData(res);
        res.setFullYear(res.getFullYear() - 1);
        const prevStart = dateData(res);

        const systemTime = dayObj.time;

        const day = [dayObj.text, dayObj.text];
        const dayTime = [`${dayObj.text} 00:00:00`, `${dayObj.text} 23:59:59`];

        const sevenDay = [one.text, two.text];
        const sevenDayTime = [`${one.text} 00:00:00`, `${two.text} 23:59:59`];

        const monthDay = [prevMonth.text, dayObj.text];
        const monthDayTime = [`${prevMonth.text} 00:00:00`, `${dayObj.text} 23:59:59`];

        const yearDay = [prevStart.text, prevEnd.text];
        const yearDayTime = [`${prevStart.text} 00:00:00`, `${prevEnd.text} 23:59:59`];

        state.value = {
            systemTime,

            day,
            dayTime,

            sevenDay,
            sevenDayTime,

            monthDay,
            monthDayTime,

            yearDay,
            yearDayTime
        };
    };

    // 当天日期
    const day = computed(() => state.value.day);
    // 未来七天日期
    const sevenDay = computed(() => state.value.sevenDay);
    // 近一年时间范围
    const yearDay = computed(() => state.value.yearDay);
    // 近一月时间范围
    const monthDay = computed(() => state.value.monthDay);
    // 系统时间
    const systemTime = computed(() => state.value.systemTime);

    return {
        setData,
        ajaxGetTime,
        day,
        sevenDay,
        yearDay,
        monthDay,
        systemTime,
    }
});
