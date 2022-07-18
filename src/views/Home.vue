<!--
 * @Author: xxj435 861479614@qq.com
 * @Date: 2022-07-08 23:26:50
 * @LastEditors: xxj435 861479614@qq.com
 * @LastEditTime: 2022-07-17 17:58:37
 * @FilePath: \zheye\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home-page">
    <h1>{{store.getters.biggerColumnsLen}}</h1>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img
            src="@/assets/callout.svg"
            alt="callout"
            class="w-50"
          />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a
              href="#"
              class="btn btn-primary my-2"
            >开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list"></ColumnList>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import ColumnList from "../components/ColumnList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";
export default defineComponent({
  name: "Home",
  components: {
    ColumnList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const list = computed(() => store.state.columns);
    onMounted(() => {
      store.dispatch("fetchColumns");
    });
    return {
      store,
      list,
    };
  },
});
</script>
