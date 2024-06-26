
// import {VanToast} from 'vant/types/toast';

/**
 * 使用 webpack.ProvidePlugin 引入文件
 * 配置在根目录 vue.config.js
 */


interface IDateData extends IOBJ{
    // 年
    y: number | string;
    // 月
    m: number | string;
    // 日
    d: number | string;
    // 小时
    h: number | string;
    // 分
    mm: number | string;
    // 秒
    s: number | string;
    // 时间戳
    time: number;
    // 周几
    week: number | string;
    // 2002-01-01
    text: string;
    // 2002-01-01 00:00:00
    textTime: string;
}
interface IConfirmData {
    content?: string;
    title?: string | '提示'
    cancelText?: string | '取消';
    confirmText?: string | '确认';
    showCancel?: boolean | true;
}
type TLinkMethods = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack';


interface IRenderData {
    /**
     * 存放数据的数组，
     */
    list: IOBJ[];
    /**
     * 要被渲染的数据源，
     */
    data: IOBJ[];
    /**
     * 每次渲染条数
     */
    num?: number | 10;
    /**
     * 间隔时间
     */
    interval?: number | 200;
    /**
     * 处理数据的函数
     * item 单条数据
     * index 循环的下标
     * count 累计循环的次数
     */
    cb?: (item: IOBJ, index: number, count: number) => IOBJ;
}

type TClearRenderList = () => void;
type TRenderList = (data: IRenderData) => TClearRenderList;
type TJsCopyObj = <T>(data: T, cache?: any[]) => T;
type TToast = (message: string, duration?: number, forbidClick?: boolean) => Promise<void>;
type TShowToast = (message?: string, forbidClick?: boolean) => IOBJ;
type ISerialize = (data: IOBJ) => 'a=1&b=2&c=3' | string;
type TFunCallBack = (...arr: any) => any;
type TFun = (...arr: []) => TFunCallBack;
type TImmediateFun = (fn: TFunCallBack, interval: number, fakeInterval: number) => TFunCallBack;
type TThrottle = (fn: TFunCallBack, interval?: 200 | number, fakeInterval?: 300 | number, immediate?: false | boolean) => TFunCallBack;
type TDateData = (date: Date, format?: string) => IDateData;
type TToFixed = (val: string | number, toNum?: boolean | false, retain?: number | 2) => string | number;
type TLink = (url: string | number, index?: number) => Promise<any>;
type TSleep = (duration?: number | 500) => Promise<void>;
type THideLoad = (sleepMs?: number) => void;
type TPullDown = (fn: () => Promise<void>) => void;
type TSetPageTitle = (title: string) => void;
type TZEmpty = (str: any) => boolean;
type TGetStorage = (str: string) => any;
type TSetStorage = (str: string, val: any) => void;
type TRemoveStorage = (str: string) => void;
type TClearStorage = () => void;
type TConfirm = (duration: IConfirmData) => Promise<boolean>;

