import { defineStore } from 'pinia'

const initState: BlogModule.State = {
  blogList: []
}
const useBlogStore = defineStore('blog', {
  state: () => initState,
  actions: {
    updateBlogList(blogList: BlogModule.Datum | []) {
      this.blogList = blogList
    }
  },
  getters: {}
})

export default useBlogStore
