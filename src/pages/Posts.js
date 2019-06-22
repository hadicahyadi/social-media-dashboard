import React, { Component, Fragment } from 'react';

import Divider from '@material-ui/core/Divider';
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

import HttpApi from '@/services/HttpApi';

class Posts extends Component {

  state = {
    posts: [],
    pagination: {
      perPage: 10,
      page: 0,
      total: 0
    }
  }

  getPosts() {
    let { perPage, page } = this.state.pagination;
    const promises = [
      HttpApi.fetchPosts(perPage * page, perPage),
      HttpApi.fetchUsers()
    ];
    Promise.all(promises).then(
      resp => {
        const { headers } = resp[0];

        this.setState({
          pagination: {...this.state.pagination, total: parseInt(headers['x-total-count'])}
        });

        let tmp = resp[0].data.map(post => ({
          ...post,
          user: resp[1].find(user => user.id === post.userId)
        }));
        this.setState({posts: tmp});
      }
    )
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
        <Typography variant="h5" gutterBottom>
          Posts
        </Typography>
        <Paper>
          <div>
            <List>
              {this.state.posts.map(post => (
                <Fragment key={post.id}>
                  <ListItem button>
                    <ListItemText
                      primary={
                        <Fragment>
                          <Typography variant="h6" component="span">
                            {post.title}
                          </Typography>
                        </Fragment>
                      }
                      secondary={
                        <Fragment>
                          <Typography component="span">
                            @{post.user.username}
                          </Typography>
                        </Fragment>
                      }
                    />
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
        </Paper>
      </Fragment>
    )
  }
}

export default Posts;
