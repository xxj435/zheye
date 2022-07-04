<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <!-- <ColumnList :list="list" /> -->
    <form action="">
      <div class="mb-3">
        <label
          for="exampleInputEmail1"
          class="form-label"
        >邮箱地址</label>
        <ValidateInput
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱"
        />
        {{emailVal}}
      </div>
      <div class="mb-3">
        <label
          for="exampleInputPassword1"
          class="form-label"
        >密码</label>
        <ValidateInput placeholder="请输入密码" />
      </div>
    </form>

  </div>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
// import ColumnList, { ColumnProps } from "@/components/ColumnList.vue";
import GlobalHeader, { UserProps } from "@/components/GlobalHeader.vue";
import { defineComponent, reactive, ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
// const testData: ColumnProps[] = [
//   {
//     id: 1,
//     title: "test1的专栏",
//     description: "这是的test1专栏，有一段非常有意思的简介，可以更新一下欧",
//     avatar:
//       "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
//   },
//   {
//     id: 2,
//     title: "test2的专栏",
//     description: "这是的test2专栏，有一段非常有意思的简介，可以更新一下欧",
//     avatar: "",
//   },
//   {
//     id: 3,
//     title: "test3的专栏",
//     description: "这是的test3专栏，有一段非常有意思的简介，可以更新一下欧",
//     avatar:
//       "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
//   },
//   {
//     id: 4,
//     title: "test4的专栏",
//     description: "这是的test4专栏，有一段非常有意思的简介，可以更新一下欧",
//     avatar: "",
//   },
// ];
const currentUser: UserProps = {
  isLogin: true,
  name: "viking",
};
// 邮箱验证
const emailReg =
  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/;
export default defineComponent({
  name: "App",
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput,
  },
  setup() {
    const emailVal = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];

    const emailRef = reactive({
      val: "",
      error: false,
      message: "",
    });
    const validateEmail = () => {
      if (emailRef.val.trim() === "") {
        emailRef.error = true;
        emailRef.message = "can not be empty";
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true;
        emailRef.message = "should be valid email";
      }
    };
    return {
      // list: testData,
      currentUser,
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
    };
  },
});
</script>

<style>
</style>
