import HttpApi from '../src/services/HttpApi';

const start = 0;
const limit = 10;
const id = 1;
const mocks = {
  post: {
    body: '',
    userId: 1,
    title: ''
  },
  comment: {
    body: '',
    name: '',
    email: ''
  }
}

describe('HttpApi class', () => {
  test('fetch users', async () => {
    let users = await HttpApi.fetchUsers();
    expect(users.length).toBeGreaterThan(0);
  });
  test('fetch single user', async () => {
    let user = await HttpApi.fetchUser(id);
    expect(user.id).toEqual(1);
  });
  test('fetch posts', async () => {
    let { data } = await HttpApi.fetchPosts(start, limit);
    expect(data.length).toEqual(10);
  });
  test('fetch single post', async () => {
    let post = await HttpApi.fetchPost(id);
    expect(post.id).toEqual(1);
  });
  test('save post', async () => {
    let post = await HttpApi.savePost(mocks.post);
    expect(post.id).toEqual(1);
  });
  test('update post', async () => {
    let post = await HttpApi.updatePost({...mocks.post, id: 1});
    expect(post.body).toEqual('');
  });
  test('fetch comments by post', async () => {
    let comments = await HttpApi.fetchCommentsByPost(id);
    expect(comments.length).toBeGreaterThan(0);
  });
  test('save comment', async () => {
    let comment = await HttpApi.saveComment(mocks.comment);
    expect(comment.id).toEqual(1);
  });
  test('update comment', async () => {
    let comment = await HttpApi.updateComment({...mocks.comment, id: 1});
    expect(comment.body).toEqual('');
  });
  test('fetch albums', async () => {
    let { data } = await HttpApi.fetchAlbums(start, limit);
    expect(data.length).toEqual(10);
  });
  test('fetch single album', async () => {
    let album = await HttpApi.fetchAlbum(id);
    expect(album.id).toEqual(1);
  });
  test('fetch photos by album', async () => {
    let photos = await HttpApi.fetchPhotosByAlbum(id);
    expect(photos.length).toBeGreaterThan(0);
  });
});
