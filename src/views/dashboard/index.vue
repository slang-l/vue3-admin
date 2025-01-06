<template>
  <el-button type="primary">hello</el-button>
  <HelloWorld msg="123"></HelloWorld>
  <svg-icon
    icon-name="ant-design:apple-filled"
    custom-class="w-2em h-2em text-red"
  ></svg-icon>
</template>

<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue"
import SvgIcon from "@/components/SvgIcon/index.vue"
</script>
