<template>
    <view class="z-box">
        <u-search placeholder="请输入科室名称" shape="round" :clearabled="false" :show-action="false" @change="input"
            class="search-box"></u-search>

        <u-alert class="w-tips" type="warning" :description="state.tips" :show-icon="true"
            v-if="state.tips"></u-alert>

        <view id="zLine"></view>

        <view class="row-box" v-if="state.searchList.length">
            <view v-for="(child, cindex) in state.searchList" :key="cindex"
                class="common-block flex-box align-center justify-s-b" @tap="link(child)">
                <view>{{ child.name }}</view>
                <u-icon name="arrow-right" class="item-icon"></u-icon>
            </view>
        </view>

        <template v-else>
            <template v-for="(item, index) in state.list" :key="item.title + index">
                <view class="line-text-box" :style="{position: state.topVal ? 'sticky' : 'static', top: state.topVal}">
                    <view class="line-text">
                        <text>{{ item.title }}</text>
                    </view>
                </view>
                <view class="row-box">
                    <view v-for="(child, cindex) in item.list" :key="cindex"
                        class="common-block flex-box align-center justify-s-b" @tap="link(child)">
                        <view>{{ child.name }}</view>
                        <u-icon name="arrow-right" class="item-icon"></u-icon>
                    </view>
                </view>
            </template>
        </template>

        <view class="fake-view"></view>
        <view class="bottom-btn" @tap="linkSearchDoctor">查找医生</view>
    </view>
</template>

<script lang="ts" setup>
import {queryDepartmentList} from '@/apis';
import {serialize, zEmpty, link as utilsLink, throttle} from "@/utils";
import {onLoad} from "@dcloudio/uni-app";
import {nextTick, onMounted, reactive} from "vue";

const state = reactive({
    activeName: '',
    tips: '',
    topVal: '',
    options: {} as IOBJ,
    list: [] as IOBJ[],
    searchList: [] as IOBJ[],
    oldList: [] as IOBJ[],
});

const input = throttle((val: string) => {
    if (zEmpty(val)) {
        state.searchList = [];
        return;
    }
    state.searchList = state.oldList.filter((item) => ~item.name.indexOf(val));
}, 500);

const getInfo = async () => {
    const res = await queryDepartmentList();

    // 科室类别（1、住院科室  2、门诊科室）
    const type1: IOBJ[] = [];
    const type2: IOBJ[] = [];
    res.data.forEach((item: IOBJ) => {
        item.type === '1' && type1.push(item);
        item.type === '2' && type2.push(item);
    });

    state.oldList = res.data;
    state.list = [
        {
            title: '门诊科室',
            list: type2
        },
        {
            title: '住院科室',
            list: type1
        },
    ];
}

const link = (item: IOBJ) => {
    const strData = serialize({
        departmentorganId: item.organId,
        type: state.options.type,
    });
    utilsLink(`/pages/registration/departmentDoctorList/index?${strData}`);
}

const linkSearchDoctor = () => {
    const type = state.options.type;
    utilsLink(`/pages/registration/searchDoctor?type=${type}`);
}

const setTopVal = () => {
    // line
    uni.createSelectorQuery().select('#zLine').boundingClientRect((res) => {
        const data = res as UniApp.NodeInfo;
        data && data.top && (state.topVal = `${data.top}px`);
    }).exec();
}

onLoad((options) => {
    state.options = options || {};
    uni.setNavigationBarTitle({
        title: `科室选择(${state.options.type === '0' ? '今日' : '七日内'})`
    });
});

onMounted(() => {
    nextTick(() => {
        setTopVal();
    });
});


getInfo();
</script>

<style lang="scss" scoped>
.z-box {
    padding: 0;
    overflow: initial;
    padding-bottom: 20rpx;
}

.search-box {
    padding: 0rpx 20rpx;
    box-shadow: 0 0 8rpx rgba(100, 101, 102, 0.08);
    height: 90rpx;
    position: sticky;
    top: 0;
    background: #fff;
    left: 0;
    z-index: 3;
}

.w-tips {
    border: none;
    border-radius: initial;
    position: sticky;
    top: 100rpx;
    left: 0;
    z-index: 2;
}

.line-text-box {
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    // position: sticky;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 2;
    box-shadow: 0 0 8rpx rgba(100, 101, 102, 0.08);
}

.row-box {
    padding-top: 20rpx;
}

.common-block {
    // padding: 0;
    // padding-left: 20rpx;
    // padding-right: 20rpx;
    line-height: 1.6;
    letter-spacing: 2rpx;
}

.fake-view {
    height: 100rpx;
}

.bottom-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    line-height: 90rpx;
    font-size: 34rpx;
    letter-spacing: 2rpx;
    background: $main-cur-color;
    color: #fff;
    text-align: center;
    z-index: 2;
}
</style>
