import { defineStore } from 'pinia'

const initState: BlogModule.State = {
  blogList: [],
  token: ''
}
const useBlogStore = defineStore('blog', {
  state: () => initState,
  actions: {
    updateBlogList(blogList: BlogModule.Datum | []) {
      this.blogList = blogList
    },
    updateToken(token: string) {
      this.token = token
    }
  },
  getters: {}
})

export default useBlogStore
