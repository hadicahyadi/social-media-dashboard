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
  fetchUser: (userId) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/users/${userId}`).then(
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
  fetchPost: (postId) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/posts/${postId}`).then(
        resp => resolve(resp.data),
        err => reject()
      )
    });
  },
  fetchCommentsByPost: (postId) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/comments?postId=${postId}`).then(
        resp => resolve(resp.data),
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
  },
  fetchAlbum: (albumId) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/albums/${albumId}`).then(
        resp => resolve(resp.data),
        err => reject()
      )
    });
  },
  fetchPhotosByAlbum: (albumId) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/photos?albumId=${albumId}`).then(
        resp => resolve(resp.data),
        err => reject()
      )
    });
  }
}
export default HttpApi;