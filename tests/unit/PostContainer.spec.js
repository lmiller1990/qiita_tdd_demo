import { shallowMount, mount } from "@vue/test-utils"
import PostContainer from "../../src/PostContainer.vue"

jest.mock("axios", () => {
  return {
    get: () => ({ 
      data: {
        title: "ゼロからVueをSSRするウェブパックの設定" 
      }
    })
  }
})


describe("PostContainer", () => {
  it("PostFormをレンダーする", () => {
    const wrapper = shallowMount(PostContainer, {
      stubs: {
        PostDisplay: true,
      }
    })

    expect(wrapper.find({ name: "PostForm" }).exists()).toBe(true)
  })

  it("PostDisplayをレンダーする", () => {
    const wrapper = shallowMount(PostContainer, {
      stubs: {
        PostDisplay: true
      },
      data() {
        return {
          post: { title: "タイトル" }
        }
      }
    })

    expect(wrapper.find({ name: "PostDisplay" }).exists()).toBe(true)
  })

  it("postがない場合PostFormをおレンダーしない", () => {
    const wrapper = shallowMount(PostContainer)

    expect(wrapper.find({ name: "PostDisplay" }).exists()).toBe(false)
  })

  it("正しいIDでAPIを叩く", async () => {
    const id = "229a4f15b99a19f94b76"
    const localThis = {}
    await PostContainer.methods.submit.call(localThis, id)

    expect(localThis.post.title).toBe(
      "ゼロからVueをSSRするウェブパックの設定")
  })

  it("正しくレンダーします", () => {
    const wrapper = mount(PostContainer, {
      data() {
        return {
          post: {
            title: "タイトル",
            body: "投稿内容。投稿内容。投稿内容。",
            likes_count: 100,
            user: { id: "webpack_master" }
          }
        }
      }
    })

    expect(wrapper.html().includes("タイトル")).toBe(true)
  })
})
