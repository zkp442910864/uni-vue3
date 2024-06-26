<template>
    <u-modal :show="state.show" title="修改密码" confirm-text="修改" :show-cancel-button="state.closeBtn"
        :mask-close-able="false" :content-style="{padding: 0}">
        <u-form :model="state.params" class="content">
            <u-form-item label="手机号码" label-width="150">
                <u-input placeholder="请输入手机号" disabled v-model="userStore.userInfo.userName"></u-input>
            </u-form-item>
            <u-form-item label="新密码" label-width="150">
                <u-input placeholder="请输入新密码" maxlength="18" v-model="state.params.password" :clearable="false"
                    type="password"></u-input>
            </u-form-item>
            <u-form-item label="验证码" label-width="150">
                <u-input placeholder="请输入验证码" :clearable="false" maxlength="6" v-model="state.params.verificationCode"
                    type="number"></u-input>
                <template #right>
                    <u-button type="primary" @tap="getCode">{{ state.codeBtnText }}</u-button>
                </template>
            </u-form-item>
        </u-form>

        <template #confirmButton>
            <view class="flex-box btn-box">
                <u-button type="info" @tap="cancel">取消</u-button>
                <u-button type="primary" :loading="state.loading" @tap="confirm">确认</u-button>
            </view>
        </template>
    </u-modal>
</template>

<script setup lang="ts">
import md5 from 'md5';
import {modifyPassword2, sendMsg} from '@/apis';
import {reactive, ref, registerRuntimeCompiler} from "vue";
import {CheckVal, jsCopyObj, link, throttle, toast, zEmpty} from "@/utils";
import {useUserStore} from "@/store";

const userStore = useUserStore();
const state = reactive({
    show: false,
    closeBtn: true,
    loading: false,
    codeBtnText: '获取验证码',
    params: {} as IOBJ,
});

const check = (() => {
    const c = new CheckVal({
        password: '请输入新密码',
        verificationCode: '请输入验证码',
    });

    c._addRule('password', (val) => val.length >= 6 ? '' : '密码长度大于等于6');

    return c;
})();

const countDown = (() => {
    const parentS = 60;
    let s = parentS;
    let time: any = null;
    // 状态
    let isStatus = false;

    // console.log(this, key);

    const stop = () => {
        clearInterval(time);

        time = null;
        s = parentS;
        isStatus = false;

        state.codeBtnText = '重新获取';
    };

    const open = () => {
        isStatus = true;
        state.codeBtnText = `${s}秒后重新获取`;

        time = setInterval(() => {
            s--;
            state.codeBtnText = `${s}秒后重新获取`;

            if (s <= 0) {
                stop();
            }
        }, 1000);
    };

    return {
        open,
        stop,
        getStatus: () => {
            return isStatus;
        }
    };
})();

const openFun = () => {
    state.closeBtn = true;
    state.codeBtnText = '获取验证码';
    state.params = {};
    state.show = true;
}

const getCode = throttle(async () => {
    if (countDown.getStatus()) return;
    const data = state.params;
    const password = data.password;
    let errText = '';

    if (zEmpty(password)) {
        toast('请输入新密码');
        return;
    } else if ((errText = check.password(password))) {
        toast(errText);
        return;
    }

    try {
        countDown.open();
        await sendMsg({phone: userStore.userInfo.userName});
    } catch (error) {
        console.error(error);
        countDown.stop();
    }
})

const confirm = async () => {
    const userName = userStore.userInfo.userName;
    const data = jsCopyObj(state.params);
    if (check.run(data)) {
        return Promise.resolve();
    }

    state.closeBtn = false;
    state.loading = true;
    data.phone = userName;
    data.password = md5(data.password);
    await modifyPassword2(data).catch(() => {
        // this.modal.clearLoading();
        return Promise.resolve();
    });

    await toast('请重新登录', 1000);

    state.show = false;
    countDown.stop();
    userStore.clearData();
    link('/pages/home/outpatient', 2);
}

const cancel = () => {
    countDown.stop();
    state.show = false;
}

defineExpose({
    openFun
});


</script>

<style lang="scss" scoped>
.content {
    padding: 0 20rpx;
}

.content::v-deep .u-form-item__body__left {
    width: 160rpx !important;
}

.content::v-deep .u-button {
    padding: 0 12rpx;
    margin-left: 12rpx;
    width: auto;
}

.btn-box {
    font-size: 32rpx;
}
</style>
