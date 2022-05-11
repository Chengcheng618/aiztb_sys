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
      type: 2,
    };
  },
  components: {
    DataList,
  },
};
</script>

<style>
</style>