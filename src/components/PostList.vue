<!--
 * @Author: xxj435 861479614@qq.com
 * @Date: 2022-07-17 10:38:05
 * @LastEditors: xxj435 861479614@qq.com
 * @LastEditTime: 2022-07-17 18:54:58
 * @FilePath: \zheye\src\components\PostList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="post-list">
    <article
      v-for="post in list"
      :key="post._id"
      class="card mb-3 shadow-sm"
    >
      <div class="card-body">
        <h4>{{post.title}}</h4>
        <div class="row my-3 align-items-center">
          <div
            v-if="post.image"
            class="col-3"
          >
            <img
              :src="post.image.url"
              :alt="post.title"
              class="rounded-lg w-100"
            >
          </div>
          <p :class="{'col-9': post.image}">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PostProps } from "../store";

export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>,
    },
  },
});
</script>
