import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import PostModal from './PostModal';

import HttpApi from '@/services/HttpApi';

const emptyPostModel = {
  body: '',
  userId: 0,
  title: ''
}

class Posts extends Component {

  state = {
    posts: [],
    users: [],
    pagination: {
      perPage: 10,
      page: 0,
      total: 0
    },
    dialogOpen: false,
    dialogAction: 'Add',
    menuOpen: null,
    selectedPost: emptyPostModel
  }

  async getPosts() {
    let { perPage, page } = this.state.pagination;
    let posts = await HttpApi.fetchPosts(perPage * page, perPage);
    let users = await HttpApi.fetchUsers();

    let postsWithUser = posts.data.map(post => ({
      ...post,
      username: users.find(user => user.id === post.userId).username
    }));

    this.setState({
      posts: postsWithUser,
      users: users,
      pagination: {...this.state.pagination, total: parseInt(posts.headers['x-total-count'])}
    });
  }

  handleDialogOpen = (selectedPost) => {
    if (selectedPost) {
      this.setState({selectedPost: selectedPost});
    }
    this.setState({dialogOpen: true});
  }

  handleDialogClose = action => {
    let { selectedPost, users, posts } = this.state;
    if (action === 'save') {
      if (selectedPost.id) {
        HttpApi.updatePost(selectedPost).then(
          resp => {
            let idx = posts.findIndex(post => post.id === resp.id);
            resp.username = users.find(user => user.id === resp.userId).username;
            posts[idx] = resp;
            this.setState({
              posts: posts,
              dialogOpen: false,
              selectedPost: emptyPostModel
            });
          }
        )
      } else {
        let { posts, users, pagination } = this.state;
        HttpApi.savePost(selectedPost).then(
          resp => {
            let { username } = users.find(user => user.id === resp.userId);
            resp.username = username;
            posts.unshift(resp);
            pagination.total++;
            this.setState({
              posts: posts,
              pagination: pagination,
              dialogOpen: false,
              selectedPost: emptyPostModel
            });
          }
        )
      }
    } else {
      this.setState({dialogOpen: false});
      setTimeout(() => {
        this.setState({selectedPost: emptyPostModel});
      })
    }
  }

  handleChangePage = (event, newPage) => {
    let { pagination } = this.state;
    pagination.page = newPage;
    this.setState({
      pagination: pagination
    }, () => this.getPosts());
  }

  handleEditPost = (key, value) => {
    this.setState({
      selectedPost: {
        ...this.state.selectedPost,
        [key]: value
      }
    });
  }

  handleDeletePost = (postId) => {
    let { posts, pagination } = this.state;
    let idx = posts.findIndex(post => post.id === postId);
    posts.splice(idx, 1);
    pagination.total--;
    this.setState({
      posts: posts,
      pagination: pagination
    });
  }

  componentDidMount() {
    this.getPosts();
  }


  render() {
    return (
      <Fragment>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <Typography variant="h5">
            Posts
          </Typography>
          <Button size="small" variant="contained" color="secondary" onClick={() => this.handleDialogOpen()}>
            Add
            <Icon fontSize="small">add</Icon>
          </Button>
        </div>
        <Paper>
          <div>
            <List>
              {this.state.posts.map(post => (
                <Fragment key={post.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Fragment>
                          <Typography variant="h6" component="div">
                            {post.title}
                          </Typography>
                          <Typography variant="body2" component="div" color="textPrimary">
                            @{post.username}
                          </Typography>
                          <Typography variant="body2" component="div" noWrap style={{width: '100%'}}>
                            {post.body}
                          </Typography>
                        </Fragment>
                      }
                    />
                    <div>
                      <IconButton
                        color="secondary"
                        onClick={() => this.handleDeletePost(post.id)}>
                        <Icon>delete</Icon>
                      </IconButton>
                    </div>
                  </ListItem>

                  <Box pl={1} pb={1}>
                    <Button
                      size="small"
                      variant="text"
                      color="primary"
                      component={Link}
                      to={`/posts/${post.id}`}>
                      Details
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      color="primary"
                      onClick={() => this.handleDialogOpen(post)}>
                      Edit
                    </Button>
                  </Box>
                  <Divider component="li" />
                </Fragment>
              ))}
            </List>
          </div>
          <TablePagination
            component="div"
            count={this.state.pagination.total}
            rowsPerPage={this.state.pagination.perPage}
            rowsPerPageOptions={[10]}
            page={this.state.pagination.page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
          />
          <Divider />
        </Paper>

        <PostModal
          open={this.state.dialogOpen}
          onModelChange={this.handleEditPost}
          onClose={this.handleDialogClose}
          users={this.state.users}
          posts={this.state.posts}
          selectedPost={this.state.selectedPost} />
      </Fragment>
    )
  }
}

export default Posts;
