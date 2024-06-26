import {createPinia} from 'pinia';
import {useUserStore} from "./modules/user";
import {useTimeStore} from "./modules/time";
import {useRedirectStore} from "./modules/redirect";
import {getStorage, setStorage, throttle} from "@/utils";

export const pinia = createPinia();


pinia.use((() => {
    const cache = getStorage('cache') || {};
    const cacheStore = [
        'user',
    ];

    const storageFn = throttle((key: string, payload: any) => {
        cache[key] = payload;
        setStorage('cache', cache);
    }, 400);

    return (context) => {
        // context.app
        const store = context.store;

        if (!cacheStore.includes(store.$id)) return;
        // console.log('store', context.store);
        // console.log('cache', cache);

        cache[store.$id] && store.setData(cache[store.$id]);

        store.$onAction((mutation) => {
            // console.log(mutation);
            if (mutation.name === 'setData' || mutation.name === 'clearData') {
                storageFn(store.$id, mutation.args[0]);
            }
        });
    };
})())

export {
    useUserStore,
    useTimeStore,
    useRedirectStore,
};
