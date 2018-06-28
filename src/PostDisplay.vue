<template>
  <div>
    <div data-test-title>
      タイトル：{{ title }}
    </div>
    <div data-test-likesCount>
      いいね：{{ likesCount }}
    </div>
    <div data-test-user>
      ユーザー：{{ user }}
    </div>
    <div class="post-body">
      {{ postSummary }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    likesCount: {
      type: Number,
      required: true
    },

    user: {
      type: String,
      required: true
    },

    body: {
      type: String,
      required: true
    },
  },

  computed: {
    postSummary() {
      return this.body.split("。").slice(0, 2).join("。") + "。"
    }
  }
}
</script>
