import { shallowMount } from "@vue/test-utils"
import PostForm from "../../src/PostForm.vue"

describe("PostForm", () => {
  it("renders", () => {
    const wrapper = shallowMount(PostForm)

    console.log(wrapper.html())
  })

  it("ユーザーから入力を受け取る", () => {
    const wrapper = shallowMount(PostForm, {
      data() {
        return { postId: '' }
      }
    })

    wrapper.find("input").setValue("123")

    expect(wrapper.vm.postId).toBe("123")
  })

  it("エンターキーを押すとsubmitイベントを$emit", () => {
    const wrapper = shallowMount(PostForm)

    wrapper.find("input").setValue("123")
    wrapper.find("input").trigger("keyup.enter")

    expect(wrapper.emitted("submit")[0][0]).toBe("123")
  })
})
