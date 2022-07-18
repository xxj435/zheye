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
    <Loader
      text="拼命加载中"
      background="rgba(0,0,0, 0.8)"
    ></Loader>
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
import GlobalHeader, { UserProps } from "@/components/GlobalHeader.vue";
import Loader from "./components/Loader.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import "bootstrap/dist/css/bootstrap.min.css";
export default defineComponent({
  name: "App",
  components: {
    // ColumnList,
    GlobalHeader,
    Loader,
  },
  setup() {
    const store = useStore();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    return {
      currentUser,
      isLoading,
    };
  },
});
</script>

<style>
</style>
