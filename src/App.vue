<!--
 * @Author: xxj435 861479614@qq.com
 * @Date: 2022-06-28 23:31:42
 * @LastEditors: xxj435 861479614@qq.com
 * @LastEditTime: 2022-07-17 19:50:32
 * @FilePath: \zheye\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <!-- 加载组件 -->
    <Loader v-if="isLoading"></Loader>
    <router-view />
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>

  </div>
</template>

<script lang="ts">
// import ColumnList, { ColumnProps } from "@/components/ColumnList.vue";
import GlobalHeader from "@/components/GlobalHeader.vue";
import Loader from "./components/Loader.vue";
import { GlobalDataProps } from "@/store";
import { defineComponent, computed, onMounted, watch } from "vue";
import createMessage from "./components/createMessage";
import { useStore } from "vuex";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
export default defineComponent({
  name: "App",
  components: {
    // ColumnList,
    GlobalHeader,
    Loader,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const token = computed(() => store.state.token);
    const error = computed(() => store.state.error);
    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
        store.dispatch("fetchCurrentUser");
      }
    });
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createMessage(message, "error", 2000);
        }
      }
    );
    return {
      currentUser,
      isLoading,
      error,
    };
  },
});
</script>

<style>
</style>
