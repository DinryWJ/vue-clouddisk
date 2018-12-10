<template>
  <div class="wrap">
    <div>
      data:{{data}}
      name:{{name}}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: "",
      name: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.data = this.$route.params.id;
      this.name = this.$route.params.name;
      if (this.data == null) {
        this.$router.push("/disk/home");
      }
    }
  }
};
</script>
<style scoped>
.wrap {
  padding: 0 10%;
}
</style>

