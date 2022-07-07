<template>
  <div class="validate-input-container pd-3">
    <input
      type="text"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      v-model="inputRef.val"
      @blur="validateInput"
      @input="updateInput"
      v-bind="$attrs"
    >
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
  type: "required" | "email";
  message: string;
}
export type RulesProp = RuleProp[];
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
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
              passed = emailReg.test(inputRef.val);
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
      console.log(validateInput());
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
