import React, { Component, Fragment } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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

class PostDetail extends Component {
  state = {
    comments: [],
    post: {},
    user: {}
  }

  async getDetail() {
    let post = await HttpApi.fetchPost(this.props.match.params.id);
    let user = await HttpApi.fetchUser(post.userId);
    let comments = await HttpApi.fetchCommentsByPost(this.props.match.params.id);
    this.setState({comments: comments, post: post, user: user});
  }

  componentDidMount() {
    console.log(this.props)
    this.getDetail();
  }

  render() {
    return(
      <Fragment>
        <Typography variant="h5" gutterBottom>
          Post Detail
        </Typography>
        <Paper>
          <Card>
            <CardContent>
              <Typography variant="h5" color="secondary" component="h2">
                {this.state.post.title}
              </Typography>
              <Typography color="textSecondary" style={{marginBottom: '10px'}}>
                @{this.state.user.username}
              </Typography>
              <Divider style={{marginBottom: '10px'}} />
              <Typography variant="body2">
                {this.state.post.body}
              </Typography>
              <div style={{marginTop: '20px'}}>
                <Typography variant="subtitle2" component="div" color="primary">Comments</Typography>
                <List>
                  {this.state.comments.map(comment => (
                    <Fragment key={comment.id}>
                      <ListItem style={{backgroundColor: '#F5F5F5'}}>
                        <ListItemText
                          primary={
                            <Fragment>
                              <Typography variant="subtitle2">
                                {comment.name}
                              </Typography>
                              <Typography variant="caption">
                                {comment.email}
                              </Typography>
                            </Fragment>
                          }
                          secondary={comment.body}
                        />
                        <Box>
                          <Button size="small" variant="text" color="secondary">Edit</Button>
                        </Box>
                      </ListItem>
                      <Divider component="li" />
                    </Fragment>
                  ))}
                </List>
              </div>
            </CardContent>
          </Card>
        </Paper>
      </Fragment>
    )
  }
}

export default PostDetail;
