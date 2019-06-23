import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
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
    dialogAction: 'Add'
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
  handleDialogOpen = (action, selectedPost) => {
    this.setState({dialogOpen: true})
  }

  handleDialogClose = savedPost => {
    console.log(savedPost);
    if (savedPost) {
      let { posts, users, pagination } = this.state;
      posts.unshift(savedPost);
      pagination.total++;
      this.setState({
        posts: posts,
        pagination: pagination
      })
    }
    this.setState({dialogOpen: false});
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      pagination: {...this.state.pagination, page: newPage}
    }, () => this.getPosts());
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
          <Button size="small" variant="contained" color="secondary" onClick={() => this.handleDialogOpen('Add')}>
            Add
            <Icon fontSize="small">add</Icon>
          </Button>
        </div>
        <Paper>
          <div>
            <List>
              {this.state.posts.map(post => (
                <Fragment key={post.id}>
                  <ListItem button component={Link} to={`/posts/${post.id}`}>
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
                    <Box>
                      <Button
                        size="small"
                        variant="text"
                        color="secondary"
                        onClick={() => this.handleDialogOpen('Edit', post)}>
                        Edit
                      </Button>
                    </Box>
                  </ListItem>
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
          action={this.state.dialogAction}
          onClose={this.handleDialogClose}
          users={this.state.users} />
      </Fragment>
    )
  }
}

export default Posts;
