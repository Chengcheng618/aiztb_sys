<template>
  <div>
    <DataList :type="type" />
  </div>
</template>

<script>
import DataList from "@/component/dataList.vue";
export default {
  data() {
    return {
      type: 1,
    };
  },
  components: {
    DataList,
  },
};
</script>

<style>
</style>