import React, { Component, Fragment } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
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

import CommentModal from './CommentModal';

import HttpApi from '@/services/HttpApi';

const emptyCommentModel = {
  body: '',
  name: ''
}

class PostDetail extends Component {
  state = {
    comments: [],
    post: {},
    user: {},
    dialogOpen: false,
    selectedComment: emptyCommentModel
  }

  async getDetail() {
    let post = await HttpApi.fetchPost(this.props.match.params.id);
    let user = await HttpApi.fetchUser(post.userId);
    let comments = await HttpApi.fetchCommentsByPost(this.props.match.params.id);
    this.setState({comments: comments, post: post, user: user});
  }

  handleDialogOpen = (selectedComment) => {
    if (selectedComment) {
      this.setState({selectedComment: selectedComment});
    }
    this.setState({dialogOpen: true});
  }

  handleDialogClose = action => {
    let { selectedComment, comments } = this.state;
    if (action === 'save') {
      if (selectedComment.id) {
        HttpApi.updateComment(selectedComment).then(
          resp => {
            let idx = comments.findIndex(post => post.id === resp.id);
            comments[idx] = resp;
            this.setState({
              comments: comments,
              dialogOpen: false,
              selectedComment: emptyCommentModel
            });
          }
        )
      } else {
        let { comments } = this.state;
        HttpApi.saveComment(selectedComment).then(
          resp => {
            comments.unshift(resp);
            this.setState({
              comments: comments,
              dialogOpen: false,
              selectedComment: emptyCommentModel
            });
          }
        )
      }
    } else {
      this.setState({dialogOpen: false});
      setTimeout(() => {
        this.setState({selectedComment: emptyCommentModel});
      })
    }
  }

  handleEditComment = (key, value) => {
    this.setState({
      selectedComment: {
        ...this.state.selectedComment,
        [key]: value
      }
    });
  }

  handleDeleteComment = (commentId) => {
    let { comments } = this.state;
    let idx = comments.findIndex(comment => comment.id === commentId);
    comments.splice(idx, 1);
    this.setState({
      comments: comments
    });
  }

  componentDidMount() {
    this.getDetail();
  }

  render() {
    return(
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <Typography variant="h5">
            Post Detail
          </Typography>
          <Button size="small" variant="contained" color="secondary" onClick={() => this.handleDialogOpen()}>
            <Icon fontSize="small">add</Icon>
            Add Comment
          </Button>
        </div>
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
            <Box mt={3}>
              <Typography variant="subtitle2" component="div" color="textSecondary">Comments</Typography>
              <List>
                {this.state.comments.map(comment => (
                  <div key={comment.id} style={{backgroundColor: '#F5F5F5'}}>
                    <ListItem>
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
                      <div>
                        <IconButton
                          color="secondary"
                          onClick={() => this.handleDeleteComment(comment.id)}>
                          <Icon>delete</Icon>
                        </IconButton>
                      </div>
                    </ListItem>
                    <Box pl={1} pb={1}>
                      <Button
                        size="small"
                        variant="text"
                        color="primary"
                        onClick={() => this.handleDialogOpen(comment)}>
                        Edit
                      </Button>
                    </Box>
                    <Divider component="li" />
                  </div>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>
        <CommentModal
          open={this.state.dialogOpen}
          onModelChange={this.handleEditComment}
          onClose={this.handleDialogClose}
          selectedComment={this.state.selectedComment} />
      </div>
    )
  }
}

export default PostDetail;
