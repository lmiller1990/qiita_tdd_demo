<template>
  <div class="wrapper">
    <input v-model="postId" @keyup.enter="handleSubmit" />
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
