<template>
  <div class="wrapper">
    Qiita投稿IDを入力してください。<br>例：229a4f15b99a19f94b76<br><br>
    そしてエンターキーを押します。
    <br>
    <br>
    <input v-model="postId" @keyup.enter="handleSubmit" placeholder="229a4f15b99a19f94b76" />
    <br>
    <br>
  </div>
</template>

<script>
export default {
  data() {
    return { postId: '' }
  },

  methods: {
    handleSubmit() {
      this.$emit("submit", this.postId)
    }
  }
}
</script>

<style scoped>
.wrapper > input {
  font-size: 1.5rem;
  padding: 10px;
  text-align: center;
  width: 350px;
}
</style>
