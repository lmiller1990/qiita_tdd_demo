## `PostContainer.vue`

最後のコンポーネントは`PostContainer.vue`.条件をレビューします：

- `PostForm.vue`から`id`を受け取る
- apiを叩く
- レスポンスを`PostDisplay.vue`に渡す(`props`がいいかも)

`PostForm`は`id`を`$emit`しているので（１）はすぐできます。その`id`をAPIを叩いて、レスポンスを`PostDisplay.vue`に渡したら、完了です。

とりあえず`PostForm`と`PostDisplay`をレンダーするテストを書きます。コンポーネントとテストを作成して：

```
touch src/PostContainer.vue && touch tests/unit/PostContainer.spec.js
```

いつも通り、テストから：

```js
import { shallowMount } from "@vue/test-utils"
import PostContainer from "../../src/PostContainer.vue"

describe("PostContainer", () => {
  it("PostDisplayとPostFormをレンダーする", () => { 
    const wrapper = shallowMount(PostContainer)

    expect(wrapper.find({ name: "PostDisplay" }).exists()).toBe(true)
    expect(wrapper.find({ name: "PostForm" }).exists()).toBe(true)
  })
})
```

`.vue`ファイルのコンポーネントを検証すると、[`vue-test-utils`で`name`で検証します](https://github.com/vuejs/vue-test-utils/pull/692)。このAPIがあまり好きではないです。[直すためのPRを作りましたが](https://github.com/vuejs/vue-test-utils/pull/692)、まだマージしていないです。

テストを実行すると：

```
● PostContainer › PostDisplayとPostFormをレンダーする

  expect(received).toBe(expected) // Object.is equality

  Expected: true
  Received: false

     7 |     })
     8 |
  >  9 |     expect(wrapper.find({ name: "PostDisplay" }).exists()).toBe(true)
```

まだ何も書いてないので失敗しています。`PostContainer.vue`を更新します：

```vue
<template>
  <div>
    <PostForm @submit="fetchPost" />
    <PostDisplay 
      :title="post.title"
      :body="post.body"
      :user="post.user"
      :pageViewsCount="post.pageViewsCount"
      :likesCount="post.likesCount"
    />
  </div>
</template>

<script>
import PostForm from "./PostForm.vue"
import PostDisplay from "./PostDisplay.vue"

export default {
  components: {
    PostForm,
    PostDisplay
  },

  data() {
    return {
      post: {}
    }
  }
}
</script>
```

`data`なども追加しました。

実際にAPIを叩いてレスポンスが来るのにちょっと時間かかるので、`post`がない場合もテストしたほうがいいです。とりあえず、`post`がないときに`v-if`で非表示します。

先に`PostContainer.vue`を更新します：

```vue
<template>
  <div>
    <PostForm @submit="fetchPost" />
    <PostDisplay 
      :title="post.title"
      :body="post.body"
      :user="post.user"
      :pageViewsCount="post.pageViewsCount"
      :likesCount="post.likesCount"
    />
  </div>
</template>

<script>
import PostForm from "./PostForm.vue"
import PostDisplay from "./PostDisplay.vue"

export default {
  components: {
    PostForm,
    PostDisplay
  },

  data() {
    return {
      post: {}
    }
  }
}
</script>
```

そしてテストを実行します：

```
[Vue warn]: Invalid handler for event "submit": got undefined

● PostContainer › PostDisplayとPostFormをレンダーする

  expect(received).toBe(expected) // Object.is equality

  Expected: true
  Received: false

     7 |     })
     8 |
  >  9 |     expect(wrapper.find({ name: "PostDisplay" }).exists()).toBe(true)
```

２つの問題があります。`PostForm @submit="submit"`が書いてありますが、`submit`というメソッドはまだないです。それを治します：

```js
// ...
methods: {
  submit(id) {
  }
}
// ...
```

この場合は`post`のレスポンスがまだ来なかったのです。`it`の説明とテストを更新しましょう：

```js
import { shallowMount } from "@vue/test-utils"
import PostContainer from "../../src/PostContainer.vue"

describe("PostContainer", () => {
  it("PostFormをレンダーする", () => { 
    const wrapper = shallowMount(PostContainer)

    expect(wrapper.find({ name: "PostForm" }).exists()).toBe(true)
  })
})
```

次は、`post.title`がある、ない場合のテストを書きます：

```js
it("postがある場合PostDisplayをレンダーする", () => { 
  const wrapper = shallowMount(PostContainer, {
    data() {
      return {
        post: { title: "タイトル" }
      }
    }
  })

  expect(wrapper.find({ name: "PostDisplay" }).exists()).toBe(true)
})

it("postがない場合PostDisplayをレンダーしない", () => { 
  const wrapper = shallowMount(PostContainer, {
    data() {
      return {
        post: {}
      }
    }
  })

  expect(wrapper.find({ name: "PostDisplay" }).exists()).toBe(false)
})
```

 もう`v-if`があるので、全てのテストが成功です。

### `fetch`のモック

最後にAPIを叩いてレスポンスを`data.post`にアサインしまう。とりあえず本当のAPIを叩いてみます。先にテストを書きます：

```js
it("submitを呼び出すとAPIを叩いてレスポンスをdataにアサインする", async () => {
  const wrapper = shallowMount(PostContainer)

  await wrapper.vm.$options.methods.submit("229a4f15b99a19f94b76")

  expect(wrapper.vm.post.title).toBeTruthy()
})
```

