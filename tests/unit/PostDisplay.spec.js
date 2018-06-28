import { shallowMount } from "@vue/test-utils"
import PostDisplay from "../../src/PostDisplay.vue"

describe("PostDisplay", () => {
  const post = {
    title: "タイトル",
    likesCount: 10,
    user: "webpack_master",
    body: "これは投稿です。テスト駆動開発。楽しいです。"
  }

  it("renders", () => {
    const wrapper = shallowMount(PostDisplay, {
      propsData: {
        title: post.title,
        likesCount: post.likesCount,
        user: post.user,
        pageViewsCount: post.pageViewsCount,
        body: post.body
      }
    })

    expect(wrapper.find("[data-test-title]").text()).toBe("タイトル：" + post.title)
    expect(wrapper.find("[data-test-likesCount]").text()).toBe("いいね：" + post.likesCount)
    expect(wrapper.find("[data-test-user]").text()).toBe("ユーザー：" + post.user)
    expect(wrapper.find(".post-body").text()).toBe("これは投稿です。テスト駆動開発。")
  })
})
