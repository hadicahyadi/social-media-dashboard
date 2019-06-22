import axios from 'axios';

const HttpApi = {
  fetchUsers: () => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/users`).then(
        resp => resolve(resp.data),
        err => reject()
      )
    });
  },
  fetchPosts: (start, limit) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/posts?_start=${start}&_limit=${limit}`).then(
        resp => resolve(resp),
        err => reject()
      )
    });
  },
  fetchCommentsByPost: (postId) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/posts/${postId}/comments`).then(
        resp => resolve(resp),
        err => reject()
      )
    });
  },
  fetchAlbums: (start, limit) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/albums?_start=${start}&_limit=${limit}`).then(
        resp => resolve(resp),
        err => reject()
      )
    });
  }
}
export default HttpApi;
