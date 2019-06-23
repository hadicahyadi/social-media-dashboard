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
      value: {}
    }
  }

  handleChange = key => event => {
    clearTimeout(this.timer);
    this.setState({value: {[key]: event.target.value}})
    const { onModelChange } = this.props;
    this.timer = setTimeout(() => {
      onModelChange(Object.keys(this.state.value)[0], this.state.value[key]);
    });
  }

  handleClose(caller) {
    const { onClose } = this.props;
    onClose(caller);
  }

  async componentDidMount() {
    this.timer = null;
  }

  render() {
    const { classes, action, open, onClose, users, selectedPost } = this.props;
    // const { users } = this.state;

    return (
      <Dialog
        aria-labelledby="dialog-title"
        open={open}>
        <DialogTitle id="dialog-title">
          {selectedPost.id ? 'Edit Post' : 'Add Post'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              className={classes.inputField}
              label="Title"
              value={selectedPost.title}
              onChange={this.handleChange('title')}
              margin="normal"
            />
            <TextField
              className={classes.inputField}
              label="Body"
              multiline
              rows="2"
              value={selectedPost.body}
              onChange={this.handleChange('body')}
              margin="normal"
            />
            <FormControl
              className={classes.formControl}>
              <InputLabel htmlFor="user">User</InputLabel>
              <Select
                value={selectedPost.userId}
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
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  selectedPost: PropTypes.object
};

export default withStyles(styles)(PostModal);
