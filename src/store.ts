
/*
 * @Author: xxj435 861479614@qq.com
 * @Date: 2022-07-17 09:32:21
 * @LastEditors: xxj435 861479614@qq.com
 * @LastEditTime: 2022-07-17 19:39:15
 * @FilePath: \zheye\src\store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStore, Commit } from 'vuex';
import { testData, testPosts } from './testData';
import axios from 'axios'
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: number;
  column?: number;
  description?: number;
  email?: string
}
interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  token: string;
}

// 错误信息处理
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
// actions 封装
// get
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url);
  commit(mutationName, data)
}

// post
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload);
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false
    },
    token: localStorage.getItem('token') || '',
    loading: false, // 加载状态
    columns: [],
    posts: [],
    user: {
      isLogin: false
    }
  },
  mutations: {
    // login(state) {
    //   state.user = { ...state.user, isLogin: true, name: 'viking' }
    // },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    // 获取token
    login(state, rawData) {
      state.token = rawData.data.token
      localStorage.setItem('token', rawData.data.token)
      axios.defaults.headers.common.Authorization = `Bearer ${rawData.data.token}`
    }
  },
  actions: {
    fetchColumns({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    fetchCurrentUser({ commit }) {
      getAndCommit(`/user/current`, 'fetchCurrentUser', commit)
    },
    login({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store;
