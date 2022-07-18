<!--
 * @Author: xxj435 861479614@qq.com
 * @Date: 2022-07-17 19:49:33
 * @LastEditors: xxj435 861479614@qq.com
 * @LastEditTime: 2022-07-18 08:39:19
 * @FilePath: \zheye\src\components\Loader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
    :style="{backgroundColor: background || ''}"
  >
    <div class="loading-content">
      <div
        class="spinner-border text-primary"
        role="status"
      >
        <!-- <span class="sr-only">{{ text || 'loading'}}</span> -->
      </div>
      <p
        v-if="text"
        class="text-primary small"
      >{{text}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String,
    },
    background: {
      type: String,
    },
  },
});
</script>

<style>
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-container {
  text-align: center;
}
</style>
