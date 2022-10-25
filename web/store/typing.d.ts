declare namespace BlogModule {
  interface State {
    blogList: Datum[] | []
  }
  interface Datum {
    id: number
    title: string
    content: string
    author: string
    create_time: number
    state: number
  }
}
