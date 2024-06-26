<template>
    <view>
        <image class="top-bg" :src="image.br01" alt />
        <u-grid :col="2" class="common-block" :border="false">
            <u-grid-item v-for="(item, index) in quickEntry2" :key="index" @tap="link(item.url)" class="q-e-item">
                <image class="q-e-img" :src="item.imgUrl" mode="aspectFit" />
                <view class="q-e-text">{{ item.text }}</view>
            </u-grid-item>
        </u-grid>
    </view>
    <view style="height: 50rpx;"></view>
</template>

<script lang="ts" setup>
import {image} from "@/assets/image";
import {link} from "@/utils";

const quickEntry2 = [
    {
        text: '住院信息',
        url: '/pages/outpatient/index?toUrl=/pages/registration/hospitalInfo',
        imgUrl: image.icon_84,
    },
    {
        text: '住院检验/检测报告',
        url: '/pages/outpatient/index?toUrl=/pages/registration/reportData/index?lsInOut=2',
        imgUrl: image.icon_104,
    },
    // {
    //     text: '押金缴纳',
    //     url: '',
    //     imgUrl: require('@/assets/image/icon/icon_106.png'),
    // },
    {
        text: '押金缴纳记录',
        url: '/pages/outpatient/index?toUrl=/pages/registration/depositHospitalList',
        imgUrl: image.icon_111,
    },
    {
        text: '住院一日清单',
        url: '/pages/outpatient/index?toUrl=/pages/registration/hospitalizationDayList',
        imgUrl: image.icon_117,
    },
    {
        text: '总费用清单',
        url: '/pages/outpatient/index?toUrl=/pages/registration/totalCostStatement',
        imgUrl: image.icon_109,
    },
];


</script>

<style lang="scss" scoped>
.top-bg {
    display: block;
    height: 400rpx;
    width: 100%;
}

// .q-e-3{margin-top: 32rpx;}
.q-e-img {
    width: 64rpx;
    height: 64rpx;
}

.q-e-text {
    color: #666;
    font-size: 24rpx;
    margin-top: 16rpx;
}

.common-block {
    width: auto;
    padding: 0;
    // border: 20rpx solid #f6f6f6;
    border-radius: 20rpx;
    overflow: hidden;
    margin-top: 32rpx;
}

.q-e-item {
    padding: 30rpx 0;
}
</style>
