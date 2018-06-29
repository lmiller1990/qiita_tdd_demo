<template>
  <div>
    <PostForm @submit="submit"/>
    <PostDisplay 
      v-if="post.title"
      :title="post.title"
      :body="post.body"
      :likesCount="post.likes_count"
      :user="post.user.id"
    />
  </div>
</template>

<script>
import axios from "axios"
import PostForm from "./PostForm.vue"
import PostDisplay from "./PostDisplay.vue"

export default {
  components: {
    PostForm,
    PostDisplay
  },

  data() {
    return {
      post: {
        user: {}
      }
    }
  },

  methods: {
    async submit(id) {
      const response = await axios.get(
        `https://qiita.com/api/v2/items/${id}`)
      this.post = {...this.post, ...response.data}
    }
  }
}
</script>
