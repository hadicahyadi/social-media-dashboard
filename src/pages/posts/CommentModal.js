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

class CommentModal extends Component {
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
    const { classes, action, open, onClose, selectedComment } = this.props;
    return (
      <Dialog
        aria-labelledby="dialog-title"
        open={open}>
        <DialogTitle id="dialog-title">
          {selectedComment.id ? 'Edit Comment' : 'Add Comment'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              className={classes.inputField}
              label="Name"
              value={selectedComment.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            {!selectedComment.id &&
              <TextField
                className={classes.inputField}
                label="Email"
                value={selectedComment.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
            }
            <TextField
              className={classes.inputField}
              label="Body"
              multiline
              rows="2"
              value={selectedComment.body}
              onChange={this.handleChange('body')}
              margin="normal"
            />
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

CommentModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onModelChange: PropTypes.func,
  open: PropTypes.bool.isRequired,
  selectedComment: PropTypes.object
};

export default withStyles(styles)(CommentModal);
