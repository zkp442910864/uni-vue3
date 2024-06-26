<template>
    <view class="box">
        <image class="top-bg" :src="image.br01" />
        <view class="flex-box align-center box-1 common-block">
            <view class="flex-box align-center justify-center flex-1" v-for="(item, index) in quickEntry1" :key="index"
                @tap="link(item.url)">
                <image :src="item.imgUrl" alt class="b-img" mode="aspectFit" />
                <view>
                    <view class="b-text-1">{{ item.text }}</view>
                    <view class="b-text-2">{{ item.text2 }}</view>
                </view>
            </view>
        </view>
        <up-grid :col="3" class="common-block" :border="false">
            <up-grid-item v-for="(item, index) in quickEntry2" :key="index" @tap="link(item.url)" class="q-e-item">
                <image class="q-e-img" :src="item.imgUrl" mode="aspectFit" />
                <view class="q-e-text">{{ item.text }}</view>
            </up-grid-item>
        </up-grid>
    </view>
    <view style="height: 50rpx;"></view>
</template>

<script setup lang="ts">
import {image} from "@/assets/image";
import {link} from "@/utils";

const quickEntry1 = [
    {
        text: '当日挂号',
        text2: '当日挂号新体验',
        url: '/pages/registration/index?type=0',
        imgUrl: image.icon_68,
    },
    {
        text: '预约挂号',
        text2: '预约挂号新体验',
        url: '/pages/registration/index?type=2',
        imgUrl: image.icon_68,
    },
];

const quickEntry2 = [
    {
        text: '智能导诊',
        url: '/pages/outpatient/intelligentGuidance/index',
        imgUrl: image.icon_89,
    },
    {
        text: '门诊缴费',
        url: '/pages/outpatient/index?toUrl=/pages/registration/paymentPrescriptionRecord',
        imgUrl: image.icon_106,
    },
    {
        text: '报告查询',
        url: '/pages/outpatient/index?toUrl=/pages/registration/reportData/index?lsInOut=1',
        imgUrl: image.icon_87,
    },
    {
        text: '排队候诊',
        url: '/pages/outpatient/index?toUrl=/pages/registration/waitingList',
        imgUrl: image.icon_92,
    },
    {
        text: '信息查询',
        url: '/pages/info/index',
        imgUrl: image.icon_81,
    },
    {
        text: '出诊安排',
        url: '/pages/info/doctorTimeing',
        imgUrl: image.icon_91,
    },
];

</script>

<style scoped>
.top-bg {
    display: block;
    height: 400rpx;
    width: 100%;
    margin-bottom: 32rpx;
}

.q-e-3 {
    margin-top: 32rpx;
}

.q-e-img {
    width: 64rpx;
    height: 64rpx;
}

.q-e-text {
    color: #666;
    font-size: 24rpx;
    margin-top: 16rpx;
}

.box-1 {
    background: #fff -webkit-linear-gradient(left, #ebedf0, #ebedf0) no-repeat center/2rpx 50%;
}

.box-1>view {
    height: 150rpx;
}

.b-img {
    width: 96rpx;
    height: 96rpx;
    margin-right: 25.6rpx;
}

.b-text-1 {
    font-size: 30.4rpx;
}

.b-text-2 {
    color: #999;
    margin-top: 14rpx;
    font-size: 24rpx;
}

.q-e-item {
    padding: 30rpx 0;
}

.common-block {
    width: auto;
    padding: 0;
    border-radius: 20rpx;
    overflow: hidden;
}
</style>
