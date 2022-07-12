<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
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
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
const currentUser: UserProps = {
  isLogin: false,
  name: "viking",
};
export default defineComponent({
  name: "App",
  components: {
    // ColumnList,
    GlobalHeader,
  },
  setup() {
    return {
      currentUser,
    };
  },
});
</script>

<style>
</style>
