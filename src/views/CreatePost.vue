<!--
 * @Author: xxj435 861479614@qq.com
 * @Date: 2022-07-17 09:32:21
 * @LastEditors: xxj435 861479614@qq.com
 * @LastEditTime: 2022-07-17 10:23:44
 * @FilePath: \zheye\src\views\CreatePost.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          type="text"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">创建</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";
import { PostProps } from "../testData";
import { useRouter } from "vue-router";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
export default defineComponent({
  name: "createPost",
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const titleVal = ref("");
    const router = useRouter();
    const store = useStore();
    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空" },
    ];
    const contentVal = ref("");
    const contentRules: RulesProp = [
      { type: "required", message: "文章详情不能为空" },
    ];
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user;
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            columnId,
            createdAt: new Date().toLocaleString(),
            content: contentVal.value,
          };
          store.commit("createPost", newPost);
          router.push({ name: "column", params: { id: columnId } });
        }
      }
    };
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit,
    };
  },
});
</script>
