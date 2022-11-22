declare namespace BlogModule {
  interface State {
    blogList: Datum[] | []
    token: string
  }
  interface Datum {
    id: number
    title: string
    content: string
    author: string
    create_time: number
    state: number
    describe_text:string
  }
}
