import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import HttpApi from '@/services/HttpApi';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  inputField: {
    margin: theme.spacing(1),
    width: 300
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});

class PostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        body: '',
        title: '',
        userId: ''
      }
    }
  }

  handleChange = key => event => {
    this.setState({ post: {
      ...this.state.post,
      [key]: event.target.value
    }});
  }

  async handleClose(caller) {
    const { onClose, users } = this.props;
    if (caller === 'save') {
      let savedPost = await HttpApi.savePost(this.state.post);
      savedPost.username = users.find(user => user.id === savedPost.userId).username;
      onClose(savedPost);
    } else {
      onClose();
    }
  }

  render() {
    const { classes, action, open, onClose, users } = this.props;
    // const { users } = this.state;

    return (
      <Dialog
        aria-labelledby="dialog-title"
        open={open}>
        <DialogTitle id="dialog-title">
          {action ? action : 'Add'} Post
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              className={classes.inputField}
              label="Title"
              value={this.state.post.title}
              onChange={this.handleChange('title')}
              margin="normal"
            />
            <TextField
              className={classes.inputField}
              label="Body"
              multiline
              rows="2"
              value={this.state.post.body}
              onChange={this.handleChange('body')}
              margin="normal"
            />
            <FormControl
              className={classes.formControl}>
              <InputLabel htmlFor="user">User</InputLabel>
              <Select
                value={this.state.post.userId}
                onChange={this.handleChange('userId')}
                inputProps={{
                  name: 'User',
                  id: 'user',
                }}
              >
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
              ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="text" size="small" color="primary" onClick={() => this.handleClose('cancel')}>Cancel</Button>
          <Button variant="text" size="small" color="primary" onClick={() => this.handleClose('save')}>Save</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

PostModal.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  users: PropTypes.array,
  selectedPost: PropTypes.object
};

export default withStyles(styles)(PostModal);
