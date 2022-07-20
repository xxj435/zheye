<!--
 * @Author: xxj435 861479614@qq.com
 * @Date: 2022-07-05 21:56:25
 * @LastEditors: xxj435 861479614@qq.com
 * @LastEditTime: 2022-07-17 10:03:43
 * @FilePath: \zheye\src\components\ValidateInput.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="validate-input-container pd-3">
    <input
      v-if="tag != 'textarea'"
      type="text"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      v-model="inputRef.val"
      @blur="validateInput"
      @input="updateInput"
      v-bind="$attrs"
    >
    <textarea
      v-else
      type="text"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      v-model="inputRef.val"
      @blur="validateInput"
      @input="updateInput"
      v-bind="$attrs"
    >
    </textarea>
    <span
      v-if="inputRef.error"
      class="invalid-feedback"
    >
      {{inputRef.message}}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from "vue";
import { emitter } from "@/components/ValidateForm.vue";
// 邮箱验证
const emailReg =
  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/;
interface RuleProp {
  type: "required" | "email" | "custom";
  message: string;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[];
export type Tagtype = "input" | "textarea";
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<Tagtype>,
      default: "input",
    },
  },
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              break;
              passed = emailReg.test(inputRef.val);
            case "custom":
              passed = rule.validator ? rule.validator() : true;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };

    const updateInput = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    onMounted(() => {
      // 发送
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      updateInput,
    };
  },
});
</script>
