<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a
      class="navbar-brand"
      href="#"
    >者也专栏</a>
    <ul
      v-if="!user.isLogin"
      class="list-inline mb-0"
    >
      <li class="list-inline-item">
        <router-link
          to="/login"
          class="btn btn-outline-light my-2"
        >登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link
          to="/signup"
          class="btn btn-outline-light my-2"
        >注册</router-link>
      </li>
    </ul>
    <ul
      v-else
      class="list-inline mb-0"
    >
      <!-- <li class="list-inline-item"><a
          href="#"
          class="btn btn-outline-light my-2"
        >你好 {{user.name}}</a></li> -->
      <Dropdown :title="`您好 ${user.nickName}`">
        <DropdownItem>
          <a
            href="#"
            class="dropdown-item"
          >
            新建文章
          </a>
        </DropdownItem>
        <DropdownItem>
          <a
            href="#"
            class="dropdown-item"
          >
            编辑文章
          </a>
        </DropdownItem>
        <DropdownItem>
          <a
            href="#"
            class="dropdown-item"
          >
            退出登录
          </a>
        </DropdownItem>
      </Dropdown>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dropdown from "@/components/Dropdown.vue";
import DropdownItem from "@/components/DropdownItem.vue";
import { UserProps } from "@/store";
export default defineComponent({
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  components: {
    Dropdown,
    DropdownItem,
  },
});
</script>
