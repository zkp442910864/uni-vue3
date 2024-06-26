import {defineConfig} from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import 'uview-plus/theme.scss';
                    @import "uview-plus/index.scss";
                `,
            }
        }
    },
    // resolve: {
    //     alias: {
    //         '@': 'src'
    //     },
    // }
});
