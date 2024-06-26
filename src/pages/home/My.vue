<template>
    <view>
        <view class="flex-box f-v align-center justify-center user-info u-skeleton"
            :style="{backgroundImage: `url(${image.membHead})`}">
            <image class="u-i-headimg u-skeleton-circle" :src="image.dMale" mode="aspectFit" />
            <view class="text-1 u-skeleton-fillet">{{ userStore.userInfo.userName }}</view>
            <view class="text-2 u-skeleton-fillet">{{ userStore.userInfo.userName }}</view>
        </view>
        <u-cell-group class="common-block">
            <u-cell v-for="(item, index) in quickEntry2" :key="index" :title="item.text" :arrow="true"
                @tap="itemTap(item)">
                <template #icon>
                    <image class="list-img" :src="item.imgUrl" mode="aspectFit" />
                </template>
            </u-cell>
        </u-cell-group>
        <view class="out-box" v-if="userStore.isLogin">
            <u-button type="info" :plain="false" @tap="logOut">退出登录</u-button>
        </view>

        <u-button type="info" :plain="false"
            @tap="userStore.setData({userName: 'qweqwe' + Math.random()})">测试</u-button>

        <!-- <u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton> -->

        <UpDataPwa ref="upDataPwaRef" />
    </view>
</template>

<script lang="ts" setup>
import {image} from "@/assets/image";
import {useUserStore} from "@/store";
import {link, zEmpty} from "@/utils";
import UpDataPwa from "./modules/upDataPwa.vue";
import {nextTick, ref} from "vue";
import {onShow} from "@dcloudio/uni-app";

const upDataPwaRef = ref<{openFun: () => void} | null>(null);
const userStore = useUserStore();

const quickEntry2 = [
    {
        text: '修改密码',
        action: 'upDataPwa',
        imgUrl: image.icon_39,
    },
    {
        text: '就诊人管理',
        url: '/pages/outpatient/index',
        imgUrl: image.icon_39,
    },
    {
        text: '预约挂号记录',
        url: '/pages/outpatient/index?toUrl=/pages/registration/reportOrderList/index',
        imgUrl: image.icon_41,
    },
    {
        text: '缴费处方记录',
        url: '/pages/outpatient/index?toUrl=/pages/registration/paymentPrescriptionRecord',
        imgUrl: image.icon_43,
    },
    {
        text: '满意度调查',
        url: '/pages/other/questionnaire',
        imgUrl: image.icon_43,
    },
];

const itemTap = (item: typeof quickEntry2[number]) => {
    if (!userStore.isLogin) return;

    const {url, action} = item;

    if (!zEmpty(url)) {
        link(url!);
        return;
    }

    switch (action) {
        case 'upDataPwa':
            upDataPwaRef.value?.openFun();
            break;
    }
}

const logOut = () => {
    userStore.clearData();
    link('/pages/home/Outpatient', 2);
}


</script>

<style lang="scss" scoped>
.list-img {
    width: 32rpx;
    height: 32rpx;
    margin-right: 16rpx;
    display: inline-block;
    vertical-align: middle;
}

.list-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 28.8rpx;
}

.user-info {
    background: no-repeat center/cover;
    height: 384rpx;
    margin-bottom: 32rpx;
    color: #fff;
}

.u-i-headimg {
    width: 112rpx;
    height: 112rpx;
    object-fit: cover;
    border: 6rpx solid #fff;
    border-radius: 50%;
}

.text-1 {
    font-size: 30rpx;
    margin-top: 16rpx;
}

.text-2 {
    font-size: 28rpx;
    margin-top: 8rpx;
}

.out-box {
    padding: 20rpx 50rpx;
}

.common-block {
    width: auto;
    padding: 0;
    // border: 20rpx solid #f6f6f6;
    border-radius: 20rpx;
    overflow: hidden;
}
</style>
